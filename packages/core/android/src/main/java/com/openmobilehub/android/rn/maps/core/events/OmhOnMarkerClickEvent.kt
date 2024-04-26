package com.openmobilehub.android.rn.maps.core.events

class OmhOnMarkerClickEvent(
    surfaceId: Int,
    viewId: Int,
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    companion object : OmhBaseEventCompanion {
        override val NAME = "topMarkerClick"
        override val EVENT_PROP_NAME = "onMarkerClick"
    }
}
