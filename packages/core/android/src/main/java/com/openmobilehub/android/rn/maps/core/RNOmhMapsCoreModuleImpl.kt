package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils

class RNOmhMapsCoreModuleImpl(private val reactContext: ReactApplicationContext) {
    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        FragmentUtils.findFragment(reactContext, viewRef.toInt())
            ?.getCameraPositionCoordinate(promise)
    }

    companion object {
        const val NAME = "RNOmhMapsCoreModule"
    }
}
