package com.openmobilehub.android.rn.maps.plugin.openstreetmap

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RNOmhMapsPluginOpenstreetmapViewManager.NAME)
class RNOmhMapsPluginOpenstreetmapViewManager :
  RNOmhMapsPluginOpenstreetmapViewManagerSpec<RNOmhMapsPluginOpenstreetmapView>() {
  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): RNOmhMapsPluginOpenstreetmapView {
    return RNOmhMapsPluginOpenstreetmapView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: RNOmhMapsPluginOpenstreetmapView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "RNOmhMapsPluginOpenstreetmapView"
  }
}
