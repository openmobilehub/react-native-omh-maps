package com.openmobilehub.android.rn.maps.plugin.azuremaps

import android.view.View

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginAzuremapsViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginAzuremapsViewManagerInterface

abstract class RNOmhMapsPluginAzuremapsViewManagerSpec<T : View> : SimpleViewManager<T>(), RNOmhMapsPluginAzuremapsViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = RNOmhMapsPluginAzuremapsViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }
}
