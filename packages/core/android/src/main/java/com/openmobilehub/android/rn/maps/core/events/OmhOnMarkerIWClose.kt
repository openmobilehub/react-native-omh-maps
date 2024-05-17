package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OmhOnMarkerIWClose(
    surfaceId: Int,
    viewId: Int
) : Event<OmhOnMarkerIWClose>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap {
        return Arguments.createMap()
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topInfoWindowClose"
        override val REGISTRATION_NAME = "onInfoWindowClose"
    }
}
