package com.openmobilehub.android.rn.maps.plugin.googlemaps

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext

@ReactModule(name = RNOmhMapsPluginGooglemapsViewManager.NAME)
class RNOmhMapsPluginGooglemapsViewManager :
    RNOmhMapsPluginGooglemapsViewManagerSpec<RNOmhMapsPluginGooglemapsView>() {
    override fun getName(): String {
        return NAME
    }

    public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginGooglemapsView {
        return RNOmhMapsPluginGooglemapsView(context)
    }

    companion object {
        const val NAME = "RNOmhMapsPluginGooglemapsView"
    }
}
