package com.openmobilehub.android.rn.maps.plugin.mapbox

import android.view.View

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginMapboxViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginMapboxViewManagerInterface

abstract class RNOmhMapsPluginMapboxViewManagerSpec<T : View> : SimpleViewManager<T>(), RNOmhMapsPluginMapboxViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = RNOmhMapsPluginMapboxViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }
}
