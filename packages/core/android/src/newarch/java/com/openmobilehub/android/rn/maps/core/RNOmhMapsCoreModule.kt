package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsCoreModule.NAME)
class RNOmhMapsCoreModule(
  reactContext: ReactApplicationContext
) : NativeOmhMapsCoreModuleSpec(reactContext) {
  private val moduleImpl = RNOmhMapsCoreModuleImpl(reactContext)

  override fun getCameraCoordinate(viewRef: Double, promise: Promise) {
    moduleImpl.getCameraCoordinate(viewRef, promise)
  }

  override fun setCameraCoordinate(
    viewRef: Double,
    coordinate: ReadableMap,
    zoomLevel: Double,
    promise: Promise
  ) {
    moduleImpl.setCameraCoordinate(viewRef, coordinate, zoomLevel, promise)
  }

  override fun getProviderName(viewRef: Double): String {
    return moduleImpl.getProviderName(viewRef)
  }

  override fun takeSnapshot(viewRef: Double, format: String, promise: Promise) {
    moduleImpl.takeSnapshot(viewRef, format, promise)
  }

  override fun getAvailableMapProviders(): WritableArray {
    return moduleImpl.getAvailableMapProviders()
  }

  override fun getDefaultMapProvider(): WritableMap {
    return moduleImpl.getDefaultMapProvider()
  }

  override fun initialize(paths: ReadableMap) {
    moduleImpl.initialize(paths)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = RNOmhMapsCoreModuleImpl.NAME
  }
}
