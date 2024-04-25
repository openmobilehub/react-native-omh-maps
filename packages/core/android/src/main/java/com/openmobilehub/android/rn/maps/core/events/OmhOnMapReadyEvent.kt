package com.openmobilehub.android.rn.maps.core.events

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OmhOnMapReadyEvent(
    surfaceId: Int,
    viewId: Int,
) : Event<OmhOnMapReadyEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap? {
        return Arguments.createMap()
    }

    companion object {
        const val NAME = "topMapReady"
        const val EVENT_PROP_NAME = "onMapReady"
    }
}
