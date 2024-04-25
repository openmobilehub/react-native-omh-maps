package com.openmobilehub.android.rn.maps.core.events

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OmhOnMarkerClickEvent(
    surfaceId: Int,
    viewId: Int,
) : OmhBaseEvent(surfaceId, viewId) {
    override fun getEventName() = NAME

    companion object : OmhBaseEventCompanion {
        override val NAME = "topMarkerClick"
        override val EVENT_PROP_NAME = "onMarkerClick"
    }
}
