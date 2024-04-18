package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsPluginAzuremapsModule.NAME)
class RNOmhMapsPluginAzuremapsModule(
    reactContext: ReactApplicationContext
) : NativeOmhMapsCoreModuleSpec(reactContext) {
    private val moduleImpl = RNOmhMapsPluginAzuremapsModuleImpl(reactContext)

    override fun getName() = NAME

    override fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        return moduleImpl.getCameraCoordinate(viewRef, promise)
    }

    companion object {
        const val NAME = RNOmhMapsPluginAzuremapsModuleImpl.NAME
    }
}
