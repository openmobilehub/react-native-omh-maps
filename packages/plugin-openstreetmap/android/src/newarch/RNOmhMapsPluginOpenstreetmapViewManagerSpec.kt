package com.openmobilehub.android.rn.maps.plugin.openstreetmap

import android.view.View

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginOpenstreetmapViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginOpenstreetmapViewManagerInterface

abstract class RNOmhMapsPluginOpenstreetmapViewManagerSpec<T : View> : SimpleViewManager<T>(), RNOmhMapsPluginOpenstreetmapViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = RNOmhMapsPluginOpenstreetmapViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }
}
