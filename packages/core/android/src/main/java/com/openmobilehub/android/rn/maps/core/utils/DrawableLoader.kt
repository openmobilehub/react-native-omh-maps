package com.openmobilehub.android.rn.maps.core.utils

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.drawable.Drawable
import android.util.Log
import com.bumptech.glide.Glide
import com.bumptech.glide.RequestManager
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity

internal object DrawableLoader {
    @SuppressLint("StaticFieldLeak")
    private lateinit var loader: RequestManager

    private fun ensureInitialized(context: Context) {
        if (!this::loader.isInitialized) {
            loader = Glide.with(context)
        }
    }

    private val jobsMap: MutableMap<OmhMapEntity<*>, CustomTarget<Drawable?>> = mutableMapOf()

    fun loadDrawable(
        lockEntity: OmhMapEntity<*>,
        rawResourceURI: String,
        onImageLoaded: (drawable: Drawable) -> Unit,
        overrideResolution: Pair<Int, Int>?
    ) {
        val context = lockEntity.context
        ensureInitialized(context)

        synchronized(lockEntity) {
            if (jobsMap.containsKey(lockEntity)) {
                loader.clear(jobsMap[lockEntity])
                jobsMap.remove(lockEntity)
            }
        }

        val target = loader.asDrawable()
            .timeout(4000)
            .load(rawResourceURI.trim()).let {
                if (overrideResolution != null)
                    it.override(overrideResolution.first, overrideResolution.second)
                else it
            }
            .into(object : CustomTarget<Drawable?>() {
                override fun onResourceReady(
                    resource: Drawable,
                    transition: Transition<in Drawable?>?
                ) {
                    synchronized(lockEntity) {
                        Log.d(LOG_TAG, "Successfully loaded drawable from URI '$rawResourceURI'")
                        jobsMap.remove(lockEntity)
                    }
                    onImageLoaded(resource)
                }

                override fun onLoadFailed(errorDrawable: Drawable?) {
                    super.onLoadFailed(errorDrawable)

                    synchronized(lockEntity) {
                        jobsMap.remove(lockEntity)
                        Log.e(LOG_TAG, "Error loading drawable from URI '$rawResourceURI'")
                    }
                }

                override fun onLoadStarted(placeholder: Drawable?) {
                    super.onLoadStarted(placeholder)

                    Log.d(LOG_TAG, "Loading drawable from URI '$rawResourceURI'...")
                }

                override fun onLoadCleared(placeholder: Drawable?) {
                    // do nothing, since there is no view; this override is required by Glide, though
                }
            })

        synchronized(lockEntity) {
            jobsMap.put(lockEntity, target)
        }
    }

    private const val LOG_TAG = "DrawableLoader"
}
