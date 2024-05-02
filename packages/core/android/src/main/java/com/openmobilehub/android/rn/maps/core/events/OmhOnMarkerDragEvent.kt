package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap

class OmhOnMarkerDragEvent(
    surfaceId: Int,
    viewId: Int,
    val position: OmhCoordinate
) : Event<OmhOnMarkerDragEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap {
        return Arguments.makeNativeMap(
            mapOf("position" to position.toWritableMap())
        )
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topDrag"
        override val REGISTRATION_NAME = "onDrag"
    }
}
