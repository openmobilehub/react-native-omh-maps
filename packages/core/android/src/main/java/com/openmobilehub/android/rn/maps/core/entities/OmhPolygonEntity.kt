package com.openmobilehub.android.rn.maps.core.entities

import android.annotation.SuppressLint
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnPolygonClickListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPolygon
import com.openmobilehub.android.maps.core.presentation.models.OmhPolygonOptions
import com.openmobilehub.android.rn.maps.core.events.OmhOnPolygonClickEvent
import com.openmobilehub.android.rn.maps.core.utils.RNComponentUtils

@SuppressLint("ViewConstructor")
class OmhPolygonEntity(private val context: ReactContext) :
  OmhMapEntity<OmhPolygon>(context) {

  internal val initialOptions = OmhPolygonOptions()
  var consumePolygonClicks = false

  var onClickListener = OmhOnPolygonClickListener {
    RNComponentUtils.dispatchEvent(
      context,
      viewId,
      OmhOnPolygonClickEvent(UIManagerHelper.getSurfaceId(context), viewId)
    )
    consumePolygonClicks
  }

  override fun mountEntity(omhMap: OmhMap) {
    val polygon = omhMap.addPolygon(initialOptions)
      ?: error("Failed to add polygon to the map")

    setEntity(polygon)
  }

  override fun unmountEntity() {
    getEntity()?.remove()
  }
}
