package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OmhOnCameraIdleEvent(
    surfaceId: Int,
    viewId: Int,
) : Event<OmhOnCameraIdleEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap? {
        return Arguments.createMap()
    }

    companion object {
        const val NAME = "topCameraIdle"
        const val EVENT_PROP_NAME = "onCameraIdle"
    }
}
