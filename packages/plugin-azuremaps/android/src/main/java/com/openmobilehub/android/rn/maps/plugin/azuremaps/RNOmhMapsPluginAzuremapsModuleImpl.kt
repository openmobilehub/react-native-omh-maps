package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class RNOmhMapsPluginAzuremapsModuleImpl(private val reactContext: ReactApplicationContext) {
    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
    }

    companion object {
        const val NAME = "RNOmhMapsPluginAzuremapsModule"
    }
}
