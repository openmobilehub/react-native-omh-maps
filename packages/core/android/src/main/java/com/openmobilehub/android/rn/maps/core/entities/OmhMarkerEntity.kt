package com.openmobilehub.android.rn.maps.core.entities

import android.annotation.SuppressLint
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMarker
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnInfoWindowClickListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnInfoWindowLongClickListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnInfoWindowOpenStatusChangeListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnMarkerClickListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnMarkerDragListener
import com.openmobilehub.android.maps.core.presentation.models.OmhMarkerOptions
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerDragEndEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerDragEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerDragStartEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWClose
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWLongPressEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWOpen
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWPressEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerPressEvent
import com.openmobilehub.android.rn.maps.core.utils.RNComponentUtils

@SuppressLint("ViewConstructor")
class OmhMarkerEntity(private val context: ReactContext) :
    OmhMapEntity<OmhMarker>(context) {

    val initialOptions = OmhMarkerOptions()
    var consumeMarkerClicks = false

    val onClickListener = OmhOnMarkerClickListener {
        RNComponentUtils.dispatchEvent(
            context,
            viewId,
            OmhOnMarkerPressEvent(UIManagerHelper.getSurfaceId(context), viewId, it.getPosition())
        )
        consumeMarkerClicks
    }

    val onMarkerDragListener = object : OmhOnMarkerDragListener {
        override fun onMarkerDrag(marker: OmhMarker) {
            RNComponentUtils.dispatchEvent(
                context,
                viewId,
                OmhOnMarkerDragEvent(
                    UIManagerHelper.getSurfaceId(context),
                    viewId,
                    marker.getPosition()
                )
            )
        }

        override fun onMarkerDragEnd(marker: OmhMarker) {
            RNComponentUtils.dispatchEvent(
                context,
                viewId,
                OmhOnMarkerDragEndEvent(
                    UIManagerHelper.getSurfaceId(context),
                    viewId,
                    marker.getPosition()
                )
            )
        }

        override fun onMarkerDragStart(marker: OmhMarker) {
            RNComponentUtils.dispatchEvent(
                context,
                viewId,
                OmhOnMarkerDragStartEvent(
                    UIManagerHelper.getSurfaceId(context),
                    viewId,
                    marker.getPosition()
                )
            )
        }
    }

    val onInfoWindowClickListener =
        OmhOnInfoWindowClickListener { marker ->
            RNComponentUtils.dispatchEvent(
                context,
                viewId,
                OmhOnMarkerIWPressEvent(
                    UIManagerHelper.getSurfaceId(context),
                    viewId,
                    marker.getPosition()
                )
            )
        }

    val onInfoWindowLongClickListener =
        OmhOnInfoWindowLongClickListener { marker ->
            RNComponentUtils.dispatchEvent(
                context,
                viewId,
                OmhOnMarkerIWLongPressEvent(
                    UIManagerHelper.getSurfaceId(context),
                    viewId,
                    marker.getPosition()
                )
            )
        }

    val onInfoWindowOpenStatusChangeListener = object : OmhOnInfoWindowOpenStatusChangeListener {
        override fun onInfoWindowClose(marker: OmhMarker) {
            RNComponentUtils.dispatchEvent(
                context,
                viewId,
                OmhOnMarkerIWClose(
                    UIManagerHelper.getSurfaceId(context),
                    viewId
                )
            )
        }

        override fun onInfoWindowOpen(marker: OmhMarker) {
            RNComponentUtils.dispatchEvent(
                context,
                viewId,
                OmhOnMarkerIWOpen(
                    UIManagerHelper.getSurfaceId(context),
                    viewId
                )
            )
        }

    }

    override fun mountEntity(omhMap: OmhMap) {
        val marker = omhMap.addMarker(initialOptions)
            ?: error("Failed to add marker to the map")

        setEntity(marker)
    }

    override fun unmountEntity() {
        getEntity()?.remove()
    }
}
