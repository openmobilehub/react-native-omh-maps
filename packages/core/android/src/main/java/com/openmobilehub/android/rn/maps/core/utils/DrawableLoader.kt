package com.openmobilehub.android.rn.maps.core.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.drawable.Drawable
import coil.ImageLoader
import coil.request.Disposable
import coil.request.ImageRequest
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity

internal object DrawableLoader {
    private lateinit var loader: ImageLoader

    private fun ensureInitialized(context: Context) {
        if (!this::loader.isInitialized) {
            loader = ImageLoader(context)
        }
    }

    private val jobsMap: MutableMap<OmhMapEntity<*>, Disposable> = mutableMapOf()

    fun loadDrawable(
        lockEntity: OmhMapEntity<*>,
        rawResourceURI: String,
        onImageLoaded: (drawable: Drawable) -> Unit
    ) {
        val context = lockEntity.context
        ensureInitialized(context)

        synchronized(lockEntity) {
            if (jobsMap.containsKey(lockEntity)) {
                jobsMap[lockEntity]?.dispose()
                jobsMap.remove(lockEntity)
            }
        }

        val req = ImageRequest.Builder(context)
            .allowHardware(true)
            .bitmapConfig(Bitmap.Config.ARGB_8888)
            .allowConversionToBitmap(true)
            .data(rawResourceURI)
            .target { drawable ->
                synchronized(lockEntity) {
                    jobsMap.remove(lockEntity)
                    onImageLoaded(drawable)
                }
            }
            .build()

        synchronized(lockEntity) {
            jobsMap.put(lockEntity, loader.enqueue(req))
        }
    }
}
