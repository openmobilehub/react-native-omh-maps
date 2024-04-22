package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.ReadableMap

@ReactModule(name = OmhMapModule.NAME)
class RNOmhMapsCoreModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    private val moduleImpl = RNOmhMapsCoreModule(reactContext)

    override fun getName() = NAME

    @ReactMethod
    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        moduleImpl.getCameraCoordinate(viewRef, promise)
    }

    @ReactMethod
    fun setCameraCoordinate(
        viewRef: Double,
        coordinate: ReadableMap,
        zoomLevel: Double,
        promise: Promise
    ) {
        moduleImpl.setCameraCoordinate(viewRef, coordinate, zoomLevel, promise)
    }

    @ReactMethod
    fun getAvailableMapProviders(): WritableArray {
        return moduleImpl.getAvailableMapProviders()
    }

    @ReactMethod
    fun getDefaultMapProvider(): WritableMap {
        return moduleImpl.getDefaultMapProvider()
    }

    companion object {
        const val NAME = RNOmhMapsCoreModule.NAME
    }
}
