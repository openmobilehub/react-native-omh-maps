package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap

class OmhOnMarkerDragEndEvent(
    surfaceId: Int,
    viewId: Int,
    val position: OmhCoordinate
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap {
        return position.toWritableMap()
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topMarkerDragEnd"
        override val EVENT_PROP_NAME = "onMarkerDragEnd"
    }
}
