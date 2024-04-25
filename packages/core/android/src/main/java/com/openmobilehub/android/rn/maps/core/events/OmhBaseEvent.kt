package com.openmobilehub.android.rn.maps.core.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

interface OmhBaseEventCompanion {
    val NAME: String
    val EVENT_PROP_NAME: String
}

abstract class OmhBaseEvent(
    surfaceId: Int,
    viewId: Int,
) : Event<OmhOnCameraIdleEvent>(surfaceId, viewId) {
    abstract override fun getEventName(): String

    override fun getEventData(): WritableMap? {
        return Arguments.createMap()
    }
}
