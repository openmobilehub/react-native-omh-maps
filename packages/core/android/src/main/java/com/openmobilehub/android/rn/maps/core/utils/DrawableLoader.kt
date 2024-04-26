package com.openmobilehub.android.rn.maps.core.utils

import android.graphics.drawable.Drawable
import android.util.Log
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity

internal object DrawableLoader {

    private val jobsMap: MutableMap<OmhMapEntity<*>, CustomTarget<Drawable?>> = mutableMapOf()

    fun loadDrawable(
        lockEntity: OmhMapEntity<*>,
        rawResourceURI: String,
        onImageLoaded: (drawable: Drawable) -> Unit,
        overrideResolution: Pair<Int, Int>?
    ) {
        val context = lockEntity.context

        synchronized(lockEntity) {
            if (jobsMap.containsKey(lockEntity)) {
                jobsMap[lockEntity]?.request?.clear()
                jobsMap.remove(lockEntity)
            }
        }

        val target = Glide.with(context).asDrawable()
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
