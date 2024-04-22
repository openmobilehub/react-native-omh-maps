package com.openmobilehub.android.rn.maps.plugin.openstreetmap

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext

@ReactModule(name = RNOmhMapsPluginOpenstreetmapViewManager.NAME)
class RNOmhMapsPluginOpenstreetmapViewManager :
    RNOmhMapsPluginOpenstreetmapViewManagerSpec<RNOmhMapsPluginOpenstreetmapView>() {
    override fun getName(): String {
        return NAME
    }

    public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginOpenstreetmapView {
        return RNOmhMapsPluginOpenstreetmapView(context)
    }

    companion object {
        const val NAME = "RNOmhMapsPluginOpenstreetmapView"
    }
}
