package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsPluginMapboxModule.NAME)
class RNOmhMapsPluginMapboxModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    @ReactMethod
    fun setPublicToken(publicToken: String) {
        RNOmhMapsPluginMapboxModuleImpl.setPublicToken(publicToken)
    }

    @ReactMethod
    fun tweakCompass(viewRef: Double) {
      RNOmhMapsPluginMapboxModuleImpl.tweakCompass(viewRef, reactContext)
    }

    @ReactMethod
    fun relayoutMapView(viewRef: Double) {
      RNOmhMapsPluginMapboxModuleImpl.relayoutMapView(viewRef, reactContext)
    }

    override fun getName() = NAME

    companion object {
        const val NAME = RNOmhMapsPluginMapboxModuleImpl.NAME
    }
}
