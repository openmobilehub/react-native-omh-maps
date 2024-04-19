package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnOmhMapReadyEvent(
    surfaceId: Int,
    viewId: Int,
) : Event<OnOmhMapReadyEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap? {
        return Arguments.createMap()
    }

    companion object {
        const val NAME = "omhOnMapReadyEvent"
        const val EVENT_PROP_NAME = "onMapReady"
    }
}