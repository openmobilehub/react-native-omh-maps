package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OmhOnMarkerIWOpen(
    surfaceId: Int,
    viewId: Int
) : Event<OmhOnMarkerIWOpen>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap {
        return Arguments.createMap()
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topInfoWindowOpen"
        override val REGISTRATION_NAME = "onInfoWindowOpen"
    }
}
