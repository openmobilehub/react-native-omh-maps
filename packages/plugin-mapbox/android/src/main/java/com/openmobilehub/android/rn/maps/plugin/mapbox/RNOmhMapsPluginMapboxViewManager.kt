package com.openmobilehub.android.rn.maps.plugin.mapbox

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RNOmhMapsPluginMapboxViewManager.NAME)
class RNOmhMapsPluginMapboxViewManager :
  RNOmhMapsPluginMapboxViewManagerSpec<RNOmhMapsPluginMapboxView>() {
  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginMapboxView {
    return RNOmhMapsPluginMapboxView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: RNOmhMapsPluginMapboxView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "RNOmhMapsPluginMapboxView"
  }
}
