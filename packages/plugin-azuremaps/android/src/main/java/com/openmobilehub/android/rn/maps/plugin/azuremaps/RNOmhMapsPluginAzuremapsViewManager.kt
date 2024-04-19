package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext

@ReactModule(name = RNOmhMapsPluginAzuremapsViewManager.NAME)
class RNOmhMapsPluginAzuremapsViewManager :
    RNOmhMapsPluginAzuremapsViewManagerSpec<RNOmhMapsPluginAzuremapsView>() {
    override fun getName(): String {
        return NAME
    }

    public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginAzuremapsView {
        return RNOmhMapsPluginAzuremapsView(context)
    }

    companion object {
        const val NAME = "RNOmhMapsPluginAzuremapsView"
    }
}
