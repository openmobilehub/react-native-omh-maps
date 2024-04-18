package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class RNOmhMapsPluginMapboxModuleImpl(private val reactContext: ReactApplicationContext) {
    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
    }

    companion object {
        const val NAME = "RNOmhMapsPluginMapboxModule"
    }
}
