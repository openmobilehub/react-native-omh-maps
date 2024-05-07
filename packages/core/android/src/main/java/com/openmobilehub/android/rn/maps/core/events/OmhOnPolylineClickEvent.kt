package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.uimanager.events.Event

class OmhOnPolylineClickEvent(
    surfaceId: Int,
    viewId: Int,
) : Event<OmhOnPolylineClickEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    companion object : OmhBaseEventCompanion {
        override val NAME = "topPolylineClick"
        override val REGISTRATION_NAME = "onPolylineClick"
    }
}
