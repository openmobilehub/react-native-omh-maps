package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager


class ReactNativeMapsPluginAzuremapsPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return emptyList()
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(ReactNativeMapsPluginAzuremapsViewManager())
  }
}
