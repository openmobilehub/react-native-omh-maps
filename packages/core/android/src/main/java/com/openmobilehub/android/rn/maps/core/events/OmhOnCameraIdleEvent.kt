package com.openmobilehub.android.rn.maps.core.events

class OmhOnCameraIdleEvent(
    surfaceId: Int,
    viewId: Int,
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    companion object : OmhBaseEventCompanion {
        override val NAME = "topCameraIdle"
        override val REGISTRATION_NAME = "onCameraIdle"
    }
}
