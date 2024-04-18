package com.openmobilehub.android.rn.maps.core

import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager

abstract class RNOmhMapsCoreViewManagerSpec<T : View> : SimpleViewManager<T>() {
    abstract fun setColor(view: T?, value: String?)
}
