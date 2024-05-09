package com.openmobilehub.android.rn.maps.core.viewmanagers

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.openmobilehub.android.rn.maps.core.entities.OmhPolygonEntity
import com.openmobilehub.android.rn.maps.core.events.OmhBaseEventCompanion
import com.openmobilehub.android.rn.maps.core.events.OmhOnPolygonClickEvent
import com.openmobilehub.android.rn.maps.core.extensions.toListOfPoints
import com.openmobilehub.android.rn.maps.core.extensions.toPattern
import com.openmobilehub.android.rn.maps.core.extensions.toPoints
import com.openmobilehub.android.rn.maps.core.utils.ColorUtils

class RNOmhMapsPolygonViewManagerImpl {

  fun createViewInstance(reactContext: ReactContext): OmhPolygonEntity {
    return OmhPolygonEntity(reactContext)
  }

  fun setOutline(entity: OmhPolygonEntity, value: ReadableArray?) {
    val outline = value?.toPoints() ?: emptyList()
    if (entity.isMounted()) {
      entity.getEntity()?.setOutline(outline) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.outline = outline
    }
  }

  fun setClickable(entity: OmhPolygonEntity, value: Boolean) {
    if (entity.isMounted()) {
      entity.getEntity()?.setClickable(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.clickable = value
    }
  }

  fun setConsumePolygonClicks(entity: OmhPolygonEntity, value: Boolean) {
    entity.consumePolygonClicks = value
  }

  fun setStrokeColor(entity: OmhPolygonEntity, value: Double) {
    val strokeColor = ColorUtils.toColorInt(value)
    if (entity.isMounted()) {
      entity.getEntity()?.setStrokeColor(strokeColor) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.strokeColor = strokeColor
    }
  }

  fun setFillColor(entity: OmhPolygonEntity, value: Double) {
    val fillColor = ColorUtils.toColorInt(value)
    if (entity.isMounted()) {
      entity.getEntity()?.setFillColor(fillColor) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.fillColor = fillColor
    }
  }

  fun setHoles(entity: OmhPolygonEntity, value: ReadableArray?) {
    val holes = value?.toListOfPoints() ?: emptyList()
    if (entity.isMounted()) {
      entity.getEntity()?.setHoles(holes) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.holes = holes
    }
  }

  fun setStrokeWidth(entity: OmhPolygonEntity, value: Float) {
    if (entity.isMounted()) {
      entity.getEntity()?.setStrokeWidth(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.strokeWidth = value
    }
  }

  fun setIsVisible(entity: OmhPolygonEntity, value: Boolean) {
    if (entity.isMounted()) {
      entity.getEntity()?.setVisible(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.isVisible = value
    }
  }

  fun setZIndex(entity: OmhPolygonEntity, value: Float) {
    if (entity.isMounted()) {
      entity.getEntity()?.setZIndex(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.zIndex = value
    }
  }

  fun setStrokeJointType(entity: OmhPolygonEntity, value: Int) {
    if (entity.isMounted()) {
      entity.getEntity()?.setStrokeJointType(value) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.strokeJointType = value
    }
  }

  fun setStrokePattern(entity: OmhPolygonEntity, value: ReadableArray?) {
    val pattern = value?.toPattern() ?: emptyList()
    if (entity.isMounted()) {
      entity.getEntity()?.setStrokePattern(pattern) ?: error(NOT_MOUNTED_ERROR)
    } else {
      entity.initialOptions.strokePattern = pattern
    }
  }

  companion object {
    const val NAME = "RNOmhMapsPolygonView"

    val EVENTS: Map<String, Any> =
      listOf<OmhBaseEventCompanion>(
        OmhOnPolygonClickEvent,
      ).associateBy(
        { it.NAME },
        { MapBuilder.of("registrationName", it.REGISTRATION_NAME) }
      ).toMap()

    private const val NOT_MOUNTED_ERROR =
      "RN OmhPolygon entity has not yet been added to the OmhMap"
  }
}
