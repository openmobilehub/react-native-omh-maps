package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.maps.core.factories.OmhMapProvider
import com.openmobilehub.android.maps.core.model.MapProvider
import com.openmobilehub.android.maps.core.utils.MapProvidersUtils
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils
import com.openmobilehub.android.rn.maps.core.utils.BitmapUtils

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
    return FragmentUtils.requireFragment(reactContext, viewRef.toInt()).requireOmhMap().providerName
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

  fun initialize(paths: ReadableMap) {
    val gmsPath = paths.getString("gmsPath")
    val nonGmsPath = paths.getString("nonGmsPath")

    OmhMapProvider.Initiator()
      .addGmsPath(gmsPath)
      .addNonGmsPath(nonGmsPath)
      .initialize()
  }

  companion object {
    const val NAME = "RNOmhMapsCoreModule"
  }
}

