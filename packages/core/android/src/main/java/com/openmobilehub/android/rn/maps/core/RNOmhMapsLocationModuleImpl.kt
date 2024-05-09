package com.openmobilehub.android.rn.maps.core

import android.Manifest
import android.content.pm.PackageManager
import androidx.annotation.RequiresPermission
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.maps.core.factories.OmhMapProvider
import com.openmobilehub.android.maps.core.presentation.interfaces.location.OmhFailureListener
import com.openmobilehub.android.maps.core.presentation.interfaces.location.OmhSuccessListener
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap

class RNOmhMapsLocationModuleImpl(private val reactContext: ReactApplicationContext) {
  @RequiresPermission(anyOf = [Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION])
  fun getCurrentLocation(promise: Promise) {
    val onSuccessListener = OmhSuccessListener { omhCoordinate ->
      promise.resolve(omhCoordinate.toWritableMap())
    }
    val onFailureListener = OmhFailureListener {
      promise.reject(ErrorCodes.OMH_LOCATION_MODULE, it)
    }

    if (!checkPermissions()) {
      return promise.reject(ErrorCodes.PERMISSION_DENIED, Error("Before getting location, you need to grant permissions."))
    }

    OmhMapProvider.getInstance().provideOmhLocation(reactContext)
      .getCurrentLocation(onSuccessListener, onFailureListener)
  }

  @RequiresPermission(anyOf = [Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION])
  fun getLastLocation(promise: Promise) {
    val onSuccessListener = OmhSuccessListener { omhCoordinate ->
      promise.resolve(omhCoordinate.toWritableMap())
    }
    val onFailureListener = OmhFailureListener {
      promise.reject(ErrorCodes.OMH_LOCATION_MODULE, it)
    }

    if (!checkPermissions()) {
      return promise.reject(ErrorCodes.PERMISSION_DENIED, Error("Before getting location, you need to grant permissions."))
    }

    OmhMapProvider.getInstance().provideOmhLocation(reactContext)
      .getLastLocation(onSuccessListener, onFailureListener)
  }

  private fun checkPermissions(): Boolean {
    return ContextCompat.checkSelfPermission(
      reactContext,
      Manifest.permission.ACCESS_COARSE_LOCATION
    ) == PackageManager.PERMISSION_GRANTED
      || ContextCompat.checkSelfPermission(
      reactContext,
      Manifest.permission.ACCESS_FINE_LOCATION
    ) == PackageManager.PERMISSION_GRANTED
  }

  fun getConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      "PERMISSIONS_DENIED_ERROR_CODE" to ErrorCodes.PERMISSION_DENIED,
      "OMH_LOCATION_MODULE_ERROR_CODE" to ErrorCodes.OMH_LOCATION_MODULE
    )
  }

  companion object {
    const val NAME = "RNOmhMapsLocationModule"
    object ErrorCodes {
      const val PERMISSION_DENIED = "PERMISSION_DENIED_ERROR"
      const val OMH_LOCATION_MODULE = "OMH_LOCATION_MODULE_ERROR"
    }
  }
}
