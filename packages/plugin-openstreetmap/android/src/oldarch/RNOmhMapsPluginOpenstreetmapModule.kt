package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.openmobilehub.android.rn.maps.plugin.openstreetmap.RNOmhMapsPluginOpenstreetmapModuleImpl

@ReactModule(name = RNOmhMapsPluginOpenstreetmapModuleImpl.NAME)
class RNOmhMapsPluginOpenstreetmapModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val omhMapsPluginOpenstreetmapModuleImpl = RNOmhMapsPluginOpenstreetmapModuleImpl()

    @ReactMethod
    fun relayoutMapView(viewRef: Double) {
        omhMapsPluginOpenstreetmapModuleImpl.relayoutMapView(viewRef, reactContext)
    }

    override fun getName() = NAME

    companion object {
        const val NAME = RNOmhMapsPluginOpenstreetmapModuleImpl.NAME
    }
}
