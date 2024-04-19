package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext

@ReactModule(name = RNOmhMapsPluginMapboxViewManager.NAME)
class RNOmhMapsPluginMapboxViewManager :
    RNOmhMapsPluginMapboxViewManagerSpec<RNOmhMapsPluginMapboxView>() {
    override fun getName(): String {
        return NAME
    }

    public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginMapboxView {
        return RNOmhMapsPluginMapboxView(context)
    }

    companion object {
        const val NAME = "RNOmhMapsPluginMapboxView"
    }
}
