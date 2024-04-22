package com.openmobilehub.android.rn.maps.core.extensions

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate

fun ReadableArray.toPoints(): List<OmhCoordinate> {
  val points = mutableListOf<OmhCoordinate>()
  for (i in 0 until size()) {
    val item = getMap(i)
    points.add(item.toOmhCoordinate())
  }
  return points
}
