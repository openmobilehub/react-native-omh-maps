package com.openmobilehub.android.rn.maps.core.extensions

import android.content.Context
import android.graphics.Bitmap
import android.graphics.ImageDecoder
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhCap
import com.openmobilehub.android.maps.core.presentation.models.OmhButtCap
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.maps.core.presentation.models.OmhCustomCap
import com.openmobilehub.android.maps.core.presentation.models.OmhRoundCap
import com.openmobilehub.android.maps.core.presentation.models.OmhSquareCap

fun ReadableMap.toOmhCoordinate(): OmhCoordinate {
    return OmhCoordinate(
        getDouble("latitude"),
        getDouble("longitude")
    )
}

fun ReadableMap.toOmhCap(context: Context): OmhCap? {
  val type = getString("type") ?: return null

  return when (type) {
    "butt" -> OmhButtCap()
    "round" -> OmhRoundCap()
    "square" -> OmhSquareCap()
    "custom" ->  {
      // TODO dn: implementation
//      val bitmapUri = getString("bitmap") ?: return null
//
//      OmhCustomCap(
//        bitmapUri.toBitmap(),
//        getDouble("refWidth").toFloat()
//      )
      return null
    }
    else -> null
  }
}

fun ReadableMap.toAnchor(): Pair<Float, Float> {
    return getDouble("u").toFloat() to getDouble("v").toFloat()
}
