package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

class OmhOnCameraMoveStartedEvent(
    surfaceId: Int,
    viewId: Int,
    val reason: Int,
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap? {
        return Arguments.createMap().apply {
            putInt("reason", reason)
        }
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topCameraMoveStarted"
        override val EVENT_PROP_NAME = "onCameraMoveStarted"
    }
}
