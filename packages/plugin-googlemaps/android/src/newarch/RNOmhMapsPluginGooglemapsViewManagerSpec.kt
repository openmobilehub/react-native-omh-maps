package com.openmobilehub.android.rn.maps.plugin.googlemaps

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginGooglemapsViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsPluginGooglemapsViewManagerInterface

abstract class RNOmhMapsPluginGooglemapsViewManagerSpec<T : View> :
    SimpleViewManager<T>(),
    RNOmhMapsPluginGooglemapsViewManagerInterface<T> {
    private val mDelegate: ViewManagerDelegate<T>

    init {
        mDelegate = RNOmhMapsPluginGooglemapsViewManagerDelegate(this)
    }

    override fun getDelegate(): ViewManagerDelegate<T>? {
        return mDelegate
    }
}
