package com.openmobilehub.android.rn.maps.core

import android.graphics.Bitmap
import android.graphics.Bitmap.CompressFormat
import android.net.Uri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.UIBlock
import com.facebook.react.uimanager.UIManagerModule
import com.openmobilehub.android.maps.core.model.MapProvider
import com.openmobilehub.android.maps.core.utils.MapProvidersUtils
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils
import com.openmobilehub.android.rn.maps.core.utils.BitmapUtils
import java.io.ByteArrayOutputStream
import java.io.Closeable
import java.io.File
import java.io.FileOutputStream
import java.io.IOException


class RNOmhMapsCoreModuleImpl(private val reactContext: ReactApplicationContext) {
  fun getCameraCoordinate(viewRef: Double, promise: Promise) {
    FragmentUtils.findFragment(reactContext, viewRef.toInt())
      ?.getCameraPositionCoordinate(promise)
  }

  fun setCameraCoordinate(
    viewRef: Double,
    coordinate: ReadableMap,
    zoomLevel: Double,
    promise: Promise
  ) {
    FragmentUtils.findFragment(reactContext, viewRef.toInt())
      ?.setCameraPositionCoordinate(
        coordinate.toOmhCoordinate(),
        zoomLevel.toFloat(),
        promise
      )
  }

  fun getAvailableMapProviders(): WritableArray {
    return Arguments.makeNativeArray(
      MapProvidersUtils().getAvailableMapProviders(reactContext)
        .map(MapProvider::toWritableMap)
    )
  }

  fun getDefaultMapProvider(): WritableMap {
    return MapProvidersUtils().getDefaultMapProvider(reactContext).toWritableMap()
  }

  fun getProviderName(viewRef: Double): String {
    val omhMap = FragmentUtils.findFragment(reactContext, viewRef.toInt())?.omhMap
    if (omhMap != null) {
      return omhMap.providerName
    }
    // TODO: Provider error handling
    return ""
  }

  private fun closeQuietly(closeable: Closeable?) {
    if (closeable == null) return
    try {
      closeable.close()
    } catch (ignored: IOException) {
    }
  }

  fun takeSnapshot(viewRef: Double, resultFormat: String, promise: Promise) {
    val omhMap =
      FragmentUtils.findFragment(reactContext, viewRef.toInt())?.omhMap ?: return promise.reject(
        Error("No fragment")
      )

    UiThreadUtil.runOnUiThread {
      omhMap.snapshot {
        if (it == null) {
          return@snapshot promise.reject(Error("Failed to take snapshot"))
        }

        try {
          val result = BitmapUtils.convertBitmap(it, resultFormat, reactContext.cacheDir)
          promise.resolve(result)
        } catch (e: Exception) {
          promise.reject(e)
        }
      }
    }
  }


  companion object {
    const val NAME = "RNOmhMapsCoreModule"
  }
}
