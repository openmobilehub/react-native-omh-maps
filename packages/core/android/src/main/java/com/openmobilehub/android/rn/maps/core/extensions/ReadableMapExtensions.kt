package com.openmobilehub.android.rn.maps.core.extensions

import android.graphics.drawable.BitmapDrawable
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhCap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPatternItem
import com.openmobilehub.android.maps.core.presentation.models.OmhButtCap
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.maps.core.presentation.models.OmhCustomCap
import com.openmobilehub.android.maps.core.presentation.models.OmhDash
import com.openmobilehub.android.maps.core.presentation.models.OmhDot
import com.openmobilehub.android.maps.core.presentation.models.OmhGap
import com.openmobilehub.android.maps.core.presentation.models.OmhRoundCap
import com.openmobilehub.android.maps.core.presentation.models.OmhSquareCap
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity
import com.openmobilehub.android.rn.maps.core.utils.DrawableLoader

fun ReadableMap.toOmhCoordinate(): OmhCoordinate {
  return OmhCoordinate(
    getDouble("latitude"),
    getDouble("longitude")
  )
}

fun ReadableMap.toAnchor(): Pair<Float, Float> {
  return getDouble("u").toFloat() to getDouble("v").toFloat()
}

fun ReadableMap.toOmhCap(entity: OmhMapEntity<*>, onResult: (cap: OmhCap?) -> Unit) {
  val type = getString("type")

  if (type == null) {
    onResult(null)
    return
  }

  when (type) {
    "butt" -> onResult(OmhButtCap())
    "round" -> onResult(OmhRoundCap())
    "square" -> onResult(OmhSquareCap())
    "custom" -> {
      val bitmapUri = getString("icon")

      if (bitmapUri == null) {
        onResult(null)
        return
      }

      DrawableLoader.loadDrawable(entity, bitmapUri) { drawable ->
        onResult(OmhCustomCap(
          (drawable as BitmapDrawable).bitmap,
          getDouble("refWidth").toFloat()
        ))
      }
    }
    else -> {
      onResult(null)
    }
  }
}

fun ReadableMap.toPattern(): OmhPatternItem? {
  val type = getString("type") ?: return null
  return when (type) {
    "dash" -> {
      val length = getDouble("length")
      OmhDash(length.toFloat())
    }

    "gap" -> {
      val length = getDouble("length")
      OmhGap(length.toFloat())
    }

    "dot" -> OmhDot()
    else -> null
  }
}
