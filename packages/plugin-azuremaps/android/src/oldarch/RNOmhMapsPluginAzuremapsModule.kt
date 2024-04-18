package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = OmhMapModule.NAME)
class RNOmhMapsPluginAzuremapsModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    @ReactMethod
    fun setSubscriptionKey(subscriptionKey: String) {
        RNOmhMapsPluginAzuremapsModuleImpl.setSubscriptionKey(subscriptionKey)
    }

    override fun getName() = NAME

    companion object {
        const val NAME = RNOmhMapsPluginAzuremapsModule.NAME
    }
}
