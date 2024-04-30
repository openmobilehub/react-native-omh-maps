package com.openmobilehub.android.rn.maps.core.viewmanagers

import android.graphics.Bitmap
import androidx.core.graphics.drawable.toBitmap
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.rn.maps.core.entities.OmhPolylineEntity
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCap
import com.openmobilehub.android.rn.maps.core.extensions.toPattern
import com.openmobilehub.android.rn.maps.core.extensions.toPoints
import com.openmobilehub.android.rn.maps.core.extensions.toSpans
import com.openmobilehub.android.rn.maps.core.utils.ColorUtils
import com.openmobilehub.android.rn.maps.core.utils.DrawableLoader

class RNOmhMapsPolylineViewManagerImpl {

  fun createViewInstance(reactContext: ReactContext): OmhPolylineEntity {
    return OmhPolylineEntity(reactContext)
  }

  fun setPosition(entity: OmhPolylineEntity, value: ReadableArray?) {
    val points = value?.toPoints() ?: emptyList()
    if (entity.isMounted()) {
      entity.getEntity()?.setPoints(points) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.points = points
    }
  }

  fun setClickable(entity: OmhPolylineEntity, value: Boolean) {
    if (entity.isMounted()) {
      entity.getEntity()?.setClickable(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.clickable = value
    }
  }

  fun setConsumePolylineClicks(entity: OmhPolylineEntity, value: Boolean) {
    entity.consumePolylineClicks = value
  }

  fun setColor(entity: OmhPolylineEntity, value: Double) {
    val color = ColorUtils.toColorInt(value)
    if (entity.isMounted()) {
      entity.getEntity()?.setColor(color) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.color = color
    }
  }

  fun setWidth(entity: OmhPolylineEntity, value: Float) {
    if (entity.isMounted()) {
      entity.getEntity()?.setWidth(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.width = value
    }
  }

  fun setIsVisible(entity: OmhPolylineEntity, value: Boolean) {
    if (entity.isMounted()) {
      entity.getEntity()?.setVisible(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.isVisible = value
    }
  }

  fun setZIndex(entity: OmhPolylineEntity, value: Float) {
    if (entity.isMounted()) {
      entity.getEntity()?.setZIndex(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.zIndex = value
    }
  }

  fun setJointType(entity: OmhPolylineEntity, value: Int) {
    if (entity.isMounted()) {
      entity.getEntity()?.setJointType(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.jointType = value
    }
  }

  fun setPattern(entity: OmhPolylineEntity, value: ReadableArray?) {
    val pattern = value?.toPattern() ?: emptyList()
    if (entity.isMounted()) {
      entity.getEntity()?.setPattern(pattern) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.pattern = pattern
    }
  }

  fun setCap(entity: OmhPolylineEntity, value: ReadableMap?) {
    value?.toOmhCap(entity) { cap ->
      if (cap == null) {
        error(INCORRECT_CAP_VALUE_ERROR)
      }

      if (entity.isMounted()) {
        entity.getEntity()?.setCap(cap) ?: error(NOT_MOUNTED_ERROR)
      } else {
        entity.initialOptions.cap = cap
      }
    }
  }

  fun setStartCap(entity: OmhPolylineEntity, value: ReadableMap?) {
    value?.toOmhCap(entity) { cap ->
      if (cap == null) {
        error(INCORRECT_CAP_VALUE_ERROR)
      }

      if (entity.isMounted()) {
        entity.getEntity()?.setStartCap(cap) ?: error(NOT_MOUNTED_ERROR)
      } else {
        entity.initialOptions.startCap = cap
      }
    }
  }

  fun setEndCap(entity: OmhPolylineEntity, value: ReadableMap?) {
    value?.toOmhCap(entity) { cap ->
      if (cap == null) {
        error(INCORRECT_CAP_VALUE_ERROR)
      }

      if (entity.isMounted()) {
        entity.getEntity()?.setEndCap(cap) ?: error(NOT_MOUNTED_ERROR)
      } else {
        entity.initialOptions.endCap = cap
      }
    }
  }

  private fun decodeStamps(
    entity: OmhPolylineEntity,
    value: ReadableArray?,
    onResourcesReady: (result: Map<Int, Bitmap>) -> Unit
  ) {
    if (value == null) {
      return
    }

    val stampMap = mutableMapOf<Int, String>()

    for (i in 0 until value.size()) {
      val item = value.getMap(i)
      item.getString("stamp")?.let {
        stampMap[i] = it
      }
    }

    if (stampMap.isEmpty()) {
      return onResourcesReady(emptyMap())
    }

    val bitmapMap = mutableMapOf<Int, Bitmap>()

    stampMap.forEach { (index, stamp) ->
      DrawableLoader.loadDrawable(entity, stamp) { drawable ->
        bitmapMap[index] = drawable.toBitmap()
        if (bitmapMap.size == stampMap.size) {
          onResourcesReady(bitmapMap)
        }
      }
    }
  }

  private fun applyStamps(
    entity: OmhPolylineEntity,
    value: ReadableArray?,
    bitmapMap: Map<Int, Bitmap>
  ) {
    val spans = value?.toSpans(bitmapMap) ?: emptyList()

    if (entity.isMounted()) {
      entity.getEntity()?.setSpans(spans) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.spans = spans
    }
  }

  fun setSpans(entity: OmhPolylineEntity, value: ReadableArray?) {
    if (value == null) {
      return applyStamps(entity, null, emptyMap())
    }

    decodeStamps(entity, value) {
      applyStamps(entity, value, it)
    }
  }

  companion object {
    const val NAME = "RNOmhMapsPolylineView"
    private const val NOT_MOUNTED_ERROR =
      "RN OmhPolyline entity has not yet been added to the OmhMap"
    private const val INCORRECT_CAP_VALUE_ERROR = "Incorrect cap value"
  }
}
