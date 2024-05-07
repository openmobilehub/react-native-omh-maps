package com.openmobilehub.android.rn.maps.core.extensions

import android.graphics.Bitmap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPatternItem
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhStyleSpan
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate

fun ReadableArray.toPoints(): List<OmhCoordinate> {
  val points = mutableListOf<OmhCoordinate>()
  for (i in 0 until size()) {
    val item = getMap(i)
    points.add(item.toOmhCoordinate())
  }
  return points
}

fun ReadableArray.toListOfPoints(): List<List<OmhCoordinate>> {
  val listOfPoints = mutableListOf<List<OmhCoordinate>>()
  for (i in 0 until size()) {
    val item = getArray(i)
    listOfPoints.add(item.toPoints())
  }
  return listOfPoints
}

fun ReadableArray.toPattern(): List<OmhPatternItem> {
  val patterns = mutableListOf<OmhPatternItem?>()
  for (i in 0 until size()) {
    val item = getMap(i)
    patterns.add(item.toPattern())
  }
  return patterns.filterNotNull()
}

fun ReadableArray.toSpans(bitmapMap: Map<Int, Bitmap>): List<OmhStyleSpan> {
  val spans = mutableListOf<OmhStyleSpan>()
  for (i in 0 until size()) {
    val item = getMap(i).toSpanItem(bitmapMap[i])

    item?.let {
      spans.add(it)
    }
  }

  return spans
}
