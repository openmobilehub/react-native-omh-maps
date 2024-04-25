package com.openmobilehub.android.rn.maps.core.utils

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

internal object RNComponentUtils {
    fun requirePropertyNotNull(name: String, value: Any?) {
        requireNotNull(value) { "Property $name is required, but null has been passed" }
    }

    fun <T : Event<*>?> dispatchEvent(
        reactContext: ReactContext,
        viewId: Int,
        event: Event<T>
    ) {
        val runnable = Runnable {
            val dispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewId)
            dispatcher?.dispatchEvent(
                event
            )
        }

        UiThreadUtil.runOnUiThread(runnable, 0)
    }
}