package com.openmobilehub.android.rn.maps.core.events

class OmhOnMapLoadedEvent(
    surfaceId: Int,
    viewId: Int,
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    companion object : OmhBaseEventCompanion {
        override val NAME = "topMapLoaded"
        override val REGISTRATION_NAME = "onMapLoaded"
    }
}
