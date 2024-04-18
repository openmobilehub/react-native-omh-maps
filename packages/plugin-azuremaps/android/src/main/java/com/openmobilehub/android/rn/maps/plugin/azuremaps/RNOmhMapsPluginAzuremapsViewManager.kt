package com.openmobilehub.android.rn.maps.plugin.azuremaps

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RNOmhMapsPluginAzuremapsViewManager.NAME)
class RNOmhMapsPluginAzuremapsViewManager :
  RNOmhMapsPluginAzuremapsViewManagerSpec<RNOmhMapsPluginAzuremapsView>() {
  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginAzuremapsView {
    return RNOmhMapsPluginAzuremapsView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: RNOmhMapsPluginAzuremapsView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "RNOmhMapsPluginAzuremapsView"
  }
}
