package com.openmobilehub.android.rn.maps.core.utils

import android.annotation.SuppressLint
import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.net.Uri
import android.util.Log
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity

internal object DrawableLoader {

    private val jobsMap: MutableMap<OmhMapEntity<*>, CustomTarget<Drawable?>> = mutableMapOf()

    private const val LOG_TAG = "DrawableLoader"
    private const val IMAGE_FETCHING_TIMEOUT = 4500

    @SuppressLint("DiscouragedApi")
    @Suppress("SwallowedException", "TooGenericExceptionCaught")
    fun loadDrawable(
        lockEntity: OmhMapEntity<*>,
        rawResourceURI: String,
        onImageLoaded: (drawable: Drawable) -> Unit,
        overrideResolution: Pair<Int, Int>?
    ) {
        val context = lockEntity.context
        val isLocalResource = try {
            val uri = Uri.parse(rawResourceURI)
            uri.scheme == null
        } catch (e: Exception) {
            true
        }

        if (isLocalResource) {
            // local resource

            try {
                val resId = context.resources.getIdentifier(
                    rawResourceURI,
                    "raw",
                    context.applicationContext.packageName
                )

                val options = BitmapFactory.Options()
                // do not load the image scaled for dpi, since this
                // can break the actual images when displayed on map
                options.inScaled = false

                // if applicable, resize the image as requested
                if (overrideResolution != null) {
                    options.outWidth = overrideResolution.first
                    options.outHeight = overrideResolution.second
                }
    
                val bitmap = BitmapFactory.decodeResource(
                    context.resources,
                    resId,
                    options
                )
                val drawable = BitmapDrawable(context.resources, bitmap)

                Log.d(
                    LOG_TAG,
                    "Successfully loaded local drawable by ID '$resId' (raw resource URI: '$rawResourceURI')"
                )
                onImageLoaded(drawable)
            } catch (e: Exception) {
                Log.e(
                    LOG_TAG,
                    "Error loading local drawable by raw resource URI: '$rawResourceURI'"
                )
            }
        } else {
            // remote resource

            synchronized(lockEntity) {
                if (jobsMap.containsKey(lockEntity)) {
                    jobsMap[lockEntity]?.request?.clear()
                    jobsMap.remove(lockEntity)
                }
            }

            val target = Glide.with(context).asDrawable()
                .timeout(IMAGE_FETCHING_TIMEOUT)
                .load(rawResourceURI).let {
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
                            Log.d(
                                LOG_TAG,
                                "Successfully loaded drawable from URI '$rawResourceURI'"
                            )
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
    }
}
