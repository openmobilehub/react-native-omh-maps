package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = OmhMapModule.NAME)
class RNOmhMapsPluginMapboxModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    private val moduleImpl = RNOmhMapsPluginMapboxModule(reactContext)

    override fun getName() = NAME

    @ReactMethod
    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        return moduleImpl.getCameraCoordinate(viewRef, promise)
    }

    companion object {
        const val NAME = RNOmhMapsPluginMapboxModule.NAME
    }
}
