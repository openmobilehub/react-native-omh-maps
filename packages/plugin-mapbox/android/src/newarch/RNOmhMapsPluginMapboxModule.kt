package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsPluginMapboxModule.NAME)
class RNOmhMapsPluginMapboxModule(
    reactContext: ReactApplicationContext
) : NativeOmhMapsCoreModuleSpec(reactContext) {
    private val moduleImpl = RNOmhMapsPluginMapboxModuleImpl(reactContext)

    override fun getName() = NAME

    override fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        return moduleImpl.getCameraCoordinate(viewRef, promise)
    }

    companion object {
        const val NAME = RNOmhMapsPluginMapboxModuleImpl.NAME
    }
}
