package com.openmobilehub.android.rn.maps.core.entities

import android.annotation.SuppressLint
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnPolylineClickListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPolyline
import com.openmobilehub.android.maps.core.presentation.models.OmhPolylineOptions
import com.openmobilehub.android.rn.maps.core.events.OmhOnPolylineClickEvent
import com.openmobilehub.android.rn.maps.core.utils.RNComponentUtils

@SuppressLint("ViewConstructor")
class OmhPolylineEntity(private val context: ReactContext) :
  OmhMapEntity<OmhPolyline>(context) {

  internal val initialOptions = OmhPolylineOptions()
  var consumePolylineClicks = false

  var onClickListener = OmhOnPolylineClickListener {
    RNComponentUtils.dispatchEvent(
      context,
      viewId,
      OmhOnPolylineClickEvent(UIManagerHelper.getSurfaceId(context), viewId)
    )
    consumePolylineClicks
  }

  override fun mountEntity(omhMap: OmhMap) {
    val polyline = omhMap.addPolyline(initialOptions)
      ?: error("Failed to add polyline to the map")

    setEntity(polyline)
  }

  override fun unmountEntity() {
    getEntity()?.remove()
  }
}
