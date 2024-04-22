package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsPluginMapboxModule.NAME)
class RNOmhMapsPluginMapboxModule(
    reactContext: ReactApplicationContext
) : NativeOmhMapsPluginMapboxModuleSpec(reactContext) {
    override fun setPublicToken(publicToken: String) {
        RNOmhMapsPluginMapboxModuleImpl.setPublicToken(publicToken)
    }

    override fun getName() = NAME

    companion object {
        const val NAME = RNOmhMapsPluginMapboxModuleImpl.NAME
    }
}
