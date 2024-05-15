package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsCoreModule.NAME)
class RNOmhMapsCoreModule(
    val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    private val moduleImpl = RNOmhMapsCoreModuleImpl(reactContext)

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

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getProviderName(viewRef: Double): String {
        return moduleImpl.getProviderName(viewRef)
    }

    @ReactMethod
    fun takeSnapshot(viewRef: Double, format: String, promise: Promise) {
        moduleImpl.takeSnapshot(viewRef, format, promise)
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getAvailableMapProviders(): WritableArray {
        return moduleImpl.getAvailableMapProviders()
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getDefaultMapProvider(): WritableMap {
        return moduleImpl.getDefaultMapProvider()
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun initialize(paths: ReadableMap) {
        moduleImpl.initialize(paths)
    }

    override fun getName() = NAME

    companion object {
        const val NAME = RNOmhMapsCoreModuleImpl.NAME
    }
}
