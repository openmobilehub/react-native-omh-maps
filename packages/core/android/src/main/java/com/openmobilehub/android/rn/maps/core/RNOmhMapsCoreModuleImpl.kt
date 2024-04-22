package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.maps.core.model.MapProvider
import com.openmobilehub.android.maps.core.utils.MapProvidersUtils
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils

class RNOmhMapsCoreModuleImpl(private val reactContext: ReactApplicationContext) {
    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        FragmentUtils.findFragment(reactContext, viewRef.toInt())
            ?.getCameraPositionCoordinate(promise)
    }

    fun setCameraCoordinate(
        viewRef: Double,
        coordinate: ReadableMap,
        zoomLevel: Double,
        promise: Promise
    ) {
        FragmentUtils.findFragment(reactContext, viewRef.toInt())
            ?.setCameraPositionCoordinate(
                coordinate.toOmhCoordinate(),
                zoomLevel.toFloat(),
                promise
            )
    }

    fun getAvailableMapProviders(): WritableArray {
        return Arguments.makeNativeArray(
            MapProvidersUtils().getAvailableMapProviders(reactContext)
                .map(MapProvider::toWritableMap)
        )
    }

    fun getDefaultMapProvider(): WritableMap {
        return MapProvidersUtils().getDefaultMapProvider(reactContext).toWritableMap()
    }

    companion object {
        const val NAME = "RNOmhMapsCoreModule"
    }
}
