package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhMapsCoreModule.NAME)
class RNOmhMapsCoreModule(
    reactContext: ReactApplicationContext
) : NativeOmhMapsCoreModuleSpec(reactContext) {
    private val moduleImpl = RNOmhMapsCoreModuleImpl(reactContext)

    override fun getName() = NAME

    override fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        return moduleImpl.getCameraCoordinate(viewRef, promise)
    }

    companion object {
        const val NAME = RNOmhMapsCoreModuleImpl.NAME
    }
}
