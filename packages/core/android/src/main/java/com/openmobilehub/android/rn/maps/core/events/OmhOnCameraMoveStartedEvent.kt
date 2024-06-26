package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OmhOnCameraMoveStartedEvent(
    surfaceId: Int,
    viewId: Int,
    val reason: Int,
) : Event<OmhOnCameraMoveStartedEvent>(surfaceId, viewId) {
    override fun getEventName() = NAME

    override fun getEventData(): WritableMap? {
        return Arguments.createMap().apply {
            putInt("reason", reason)
        }
    }

    companion object : OmhBaseEventCompanion {
        override val NAME = "topCameraMoveStarted"
        override val REGISTRATION_NAME = "onCameraMoveStarted"
    }
}
