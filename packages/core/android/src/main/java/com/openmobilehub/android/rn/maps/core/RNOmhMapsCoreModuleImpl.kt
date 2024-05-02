package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.maps.core.factories.OmhMapProvider
import com.openmobilehub.android.maps.core.model.MapProvider
import com.openmobilehub.android.maps.core.utils.MapProvidersUtils
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils
import com.openmobilehub.android.rn.maps.core.utils.BitmapUtils

class RNOmhMapsCoreModuleImpl(private val reactContext: ReactApplicationContext) {

    fun initialize(paths: ReadableMap) {
        val gmsPath = paths.getString("gmsPath")
        val nonGmsPath = paths.getString("nonGmsPath")

        OmhMapProvider.Initiator()
            .addGmsPath(gmsPath)
            .addNonGmsPath(nonGmsPath)
            .initialize()
    }

    fun getProviderName(viewRef: Double): String {
        val fragment = FragmentUtils.requireFragment(reactContext, viewRef.toInt())
        val omhMap = fragment.requireOmhMap()

        return omhMap.providerName
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

    fun getCameraCoordinate(viewRef: Double, promise: Promise) {
        UiThreadUtil.runOnUiThread {
            val omhMap =
                FragmentUtils.requireFragment(reactContext, viewRef.toInt()).requireOmhMap()
            val coordinates = omhMap.getCameraPositionCoordinate()
            promise.resolve(coordinates.toWritableMap())
        }
    }

    fun setCameraCoordinate(
        viewRef: Double,
        coordinate: ReadableMap,
        zoomLevel: Double,
        promise: Promise
    ) {
        UiThreadUtil.runOnUiThread {
            val omhMap =
                FragmentUtils.requireFragment(reactContext, viewRef.toInt()).requireOmhMap()
            omhMap.moveCamera(coordinate.toOmhCoordinate(), zoomLevel.toFloat())
            promise.resolve(null)
        }
    }

    fun takeSnapshot(viewRef: Double, resultFormat: String, promise: Promise) {
        val omhMap = FragmentUtils.requireFragment(reactContext, viewRef.toInt()).requireOmhMap()

        UiThreadUtil.runOnUiThread {
            omhMap.snapshot {
                if (it == null) {
                    return@snapshot promise.reject(Error("Failed to make snapshot"))
                }

                try {
                    val result = BitmapUtils.convertBitmap(it, resultFormat, reactContext.cacheDir)
                    promise.resolve(result)
                } catch (e: Exception) {
                    promise.reject(e)
                }
            }
        }
    }

    companion object {
        const val NAME = "RNOmhMapsCoreModule"
    }
}
