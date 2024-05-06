package com.openmobilehub.android.rn.maps.core.events

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

    companion object : OmhBaseEventCompanion {
        override val NAME = "topMapReady"
        override val REGISTRATION_NAME = "onMapReady"
    }
}
