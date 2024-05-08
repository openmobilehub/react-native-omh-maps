package com.openmobilehub.android.rn.maps.core

import android.Manifest
import androidx.annotation.RequiresPermission
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsLocationModule.NAME)
class RNOmhMapsLocationModule(
  val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
  private val moduleImpl = RNOmhMapsLocationModuleImpl(reactContext)

  @RequiresPermission(anyOf = [Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION])
  @ReactMethod
  fun getCurrentLocation(promise: Promise) {
    moduleImpl.getCurrentLocation(promise)
  }

  @RequiresPermission(anyOf = [Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION])
  @ReactMethod
  fun getLastLocation(promise: Promise) {
    moduleImpl.getLastLocation(promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = RNOmhMapsLocationModuleImpl.NAME
  }
}
