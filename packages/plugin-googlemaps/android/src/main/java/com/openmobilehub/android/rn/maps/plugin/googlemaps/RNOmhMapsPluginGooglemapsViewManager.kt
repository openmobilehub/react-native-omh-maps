package com.openmobilehub.android.rn.maps.plugin.googlemaps

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RNOmhMapsPluginGooglemapsViewManager.NAME)
class RNOmhMapsPluginGooglemapsViewManager :
  RNOmhMapsPluginGooglemapsViewManagerSpec<RNOmhMapsPluginGooglemapsView>() {
  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginGooglemapsView {
    return RNOmhMapsPluginGooglemapsView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: RNOmhMapsPluginGooglemapsView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "RNOmhMapsPluginGooglemapsView"
  }
}
