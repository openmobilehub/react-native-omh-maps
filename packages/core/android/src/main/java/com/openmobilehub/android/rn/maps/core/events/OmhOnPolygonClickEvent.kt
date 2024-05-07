package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.uimanager.events.Event

class OmhOnPolygonClickEvent(
    surfaceId: Int,
    viewId: Int,
) : Event<OmhOnPolygonClickEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    companion object : OmhBaseEventCompanion {
        override val NAME = "topPolygonClick"
        override val REGISTRATION_NAME = "onPolygonClick"
    }
}
