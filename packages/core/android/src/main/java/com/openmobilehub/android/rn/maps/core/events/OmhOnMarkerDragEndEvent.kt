package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap

class OmhOnMarkerDragEndEvent(
    surfaceId: Int,
    viewId: Int,
    val position: OmhCoordinate
) : Event<OmhOnMarkerDragEndEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap {
        return Arguments.makeNativeMap(
            mapOf("position" to position.toWritableMap())
        )
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topDragEnd"
        override val REGISTRATION_NAME = "onDragEnd"
    }
}
