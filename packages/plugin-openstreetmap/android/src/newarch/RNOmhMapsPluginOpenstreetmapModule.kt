package com.openmobilehub.android.rn.maps.plugin.openstreetmap

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsPluginOpenstreetmapModule.NAME)
class RNOmhMapsPluginOpenstreetmapModule(
    private val reactContext: ReactApplicationContext
) : NativeOmhMapsPluginOpenstreetmapModuleSpec(reactContext) {

    private val omhMapsPluginOpenstreetmapModuleImpl = RNOmhMapsPluginOpenstreetmapModuleImpl()

    override fun relayoutMapView(viewRef: Double) {
        omhMapsPluginOpenstreetmapModuleImpl.relayoutMapView(viewRef, reactContext)
    }

    override fun getName() = NAME

    companion object {
        const val NAME = RNOmhMapsPluginOpenstreetmapModuleImpl.NAME
    }
}
