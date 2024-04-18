package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils

class RNOmhMapsCoreModuleImpl(private val reactContext: ReactApplicationContext) {
    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        FragmentUtils.findFragment(reactContext, viewRef.toInt())
            ?.getCameraPositionCoordinate(promise)
    }

    fun getAvailableMapProviders(): WritableArray {
        val provider1 = Arguments.createMap()

        provider1.putString("name", "Google")
        provider1.putString(
            "path",
            "com.openmobilehub.android.maps.plugin.googlemaps.presentation.OmhMapFactoryImpl"
        )

        val provider2 = Arguments.createMap()

        provider2.putString("name", "OpenStreetMap")
        provider2.putString(
            "path",
            "com.openmobilehub.android.maps.plugin.openstreetmap.presentation.OmhMapFactoryImpl"
        )

        val providers = Arguments.createArray()
        providers.pushMap(provider1)
        providers.pushMap(provider2)

        return providers
    }

    fun getDefaultMapProvider(): WritableMap {
        val provider = Arguments.createMap()

        provider.putString("name", "Google")
        provider.putString(
            "path",
            "com.openmobilehub.android.maps.plugin.openstreetmap.presentation.OmhMapFactoryImpl"
        )

        return provider
    }

    companion object {
        const val NAME = "RNOmhMapsCoreModule"
    }
}
