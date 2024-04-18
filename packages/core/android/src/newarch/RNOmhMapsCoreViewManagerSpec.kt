package com.openmobilehub.android.rn.maps.core

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsCoreViewManagerDelegate
import com.facebook.react.viewmanagers.RNOmhMapsCoreViewManagerInterface

abstract class RNOmhMapsCoreViewManagerSpec<T : View> :
    SimpleViewManager<T>(),
    RNOmhMapsCoreViewManagerInterface<T> {
    private val mDelegate: ViewManagerDelegate<T>

    init {
        mDelegate = RNOmhMapsCoreViewManagerDelegate(this)
    }

    override fun getDelegate(): ViewManagerDelegate<T>? {
        return mDelegate
    }
}
