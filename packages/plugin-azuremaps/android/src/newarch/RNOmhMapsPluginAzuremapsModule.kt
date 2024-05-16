package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsPluginAzuremapsModule.NAME)
class RNOmhMapsPluginAzuremapsModule(
  private val reactContext: ReactApplicationContext
) : NativeOmhMapsPluginAzureMapsModuleSpec(reactContext) {
  override fun setSubscriptionKey(subscriptionKey: String) {
    RNOmhMapsPluginAzuremapsModuleImpl.setSubscriptionKey(subscriptionKey)
  }

  override fun relayoutMapView(viewRef: Double) {
    RNOmhMapsPluginAzuremapsModuleImpl.relayoutMapView(viewRef, reactContext)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = RNOmhMapsPluginAzuremapsModuleImpl.NAME
  }
}
