package com.openmobilehub.android.rn.maps.core.events

class OmhOnPolylineClickEvent(
    surfaceId: Int,
    viewId: Int,
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    companion object : OmhBaseEventCompanion {
        override val NAME = "topPolylineClick"
        override val REGISTRATION_NAME = "onPolylineClick"
    }
}
