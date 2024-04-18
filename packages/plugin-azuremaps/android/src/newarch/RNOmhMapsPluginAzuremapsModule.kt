package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsPluginAzuremapsModule.NAME)
class RNOmhMapsPluginAzuremapsModule(
    reactContext: ReactApplicationContext
) : NativeOmhMapsPluginAzureMapsModuleSpec(reactContext) {
    override fun setSubscriptionKey(subscriptionKey: String) {
        RNOmhMapsPluginAzuremapsModuleImpl.setSubscriptionKey(subscriptionKey)
    }

    override fun getName() = NAME

    companion object {
        const val NAME = RNOmhMapsPluginAzuremapsModuleImpl.NAME
    }
}
