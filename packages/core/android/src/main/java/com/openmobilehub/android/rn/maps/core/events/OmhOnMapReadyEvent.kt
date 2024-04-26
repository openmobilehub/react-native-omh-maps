package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

class OmhOnMapReadyEvent(
    surfaceId: Int,
    viewId: Int,
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap? {
        return Arguments.createMap()
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topMapReady"
        override val EVENT_PROP_NAME = "onMapReady"
    }
}
