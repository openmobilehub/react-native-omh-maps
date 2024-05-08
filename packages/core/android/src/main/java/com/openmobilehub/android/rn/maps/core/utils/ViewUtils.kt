package com.openmobilehub.android.rn.maps.core.utils

import android.view.View
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerModule

object ViewUtils {
    inline fun <reified T> requireView(reactContext: ReactContext, tag: Int): T where T : View {
        reactContext.getNativeModule(UIManagerModule::class.java)?.resolveView(tag)
            ?.let {
                require(it is T) {
                    "View with tag $tag is not a ${T::class.simpleName} entity"
                }

                return it
            }

        throw IllegalArgumentException("View with tag $tag not found")
    }
}
