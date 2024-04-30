package com.openmobilehub.android.rn.maps.core.extensions

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import androidx.core.graphics.drawable.toBitmap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhCap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPatternItem
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhStyleSpan
import com.openmobilehub.android.maps.core.presentation.models.OmhButtCap
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.maps.core.presentation.models.OmhCustomCap
import com.openmobilehub.android.maps.core.presentation.models.OmhDash
import com.openmobilehub.android.maps.core.presentation.models.OmhDot
import com.openmobilehub.android.maps.core.presentation.models.OmhGap
import com.openmobilehub.android.maps.core.presentation.models.OmhRoundCap
import com.openmobilehub.android.maps.core.presentation.models.OmhSquareCap
import com.openmobilehub.android.maps.core.presentation.models.OmhStyleSpanGradient
import com.openmobilehub.android.maps.core.presentation.models.OmhStyleSpanMonochromatic
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity
import com.openmobilehub.android.rn.maps.core.utils.ColorUtils
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
      val bitmapUri = getMap("icon")?.getString("uri")

      if (bitmapUri == null) {
        onResult(null)
        return
      }

      DrawableLoader.loadDrawable(entity, bitmapUri, { drawable ->
        onResult(OmhCustomCap(
          drawable.toBitmap(),
          getDouble("refWidth").toFloat()
        ))
      }, null)
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

fun ReadableMap.toSpanItem(stamp: Bitmap?): OmhStyleSpan? {
  val type = getString("type") ?: return null

  val segments = getDouble("segments")
  return when (type) {
    "monochromatic" -> {
      val color = ColorUtils.toColorInt(getDouble("color"))
      OmhStyleSpanMonochromatic(color, segments, stamp)
    }
    "gradient" -> {
      val fromColor = ColorUtils.toColorInt(getDouble("fromColor"))
      val toColor = ColorUtils.toColorInt(getDouble("toColor"))

      OmhStyleSpanGradient(fromColor, toColor, segments, stamp)
    }

    else -> null
  }
}
