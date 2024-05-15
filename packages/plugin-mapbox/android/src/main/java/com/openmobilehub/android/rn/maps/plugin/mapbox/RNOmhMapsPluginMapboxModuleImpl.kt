package com.openmobilehub.android.rn.maps.plugin.mapbox

import android.view.View.MeasureSpec
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.mapbox.common.MapboxOptions
import com.mapbox.maps.MapView
import com.mapbox.maps.plugin.compass.compass
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap

object RNOmhMapsPluginMapboxModuleImpl {
  fun setPublicToken(publicToken: String) {
    MapboxOptions.accessToken = publicToken
  }

  // There is a bug in the compass rendering in RN
  // This method is a workaround to fix it
  fun tweakCompass(viewRef: Double, context: ReactContext) {
    val mapView = getMapView(viewRef, context)
    initCompass(mapView)
    relayoutMapView(mapView)
    showCompass(mapView)
  }

  private fun getMapView(viewRef: Double, context: ReactContext): MapView {
    val fragment = FragmentUtils.requireFragment(context, viewRef.toInt())
    val omhMap = fragment.javaClass.getMethod("requireOmhMap").invoke(fragment) as OmhMap
    return omhMap.mapView as MapView
  }

  private fun initCompass(mapView: MapView) {
    UiThreadUtil.runOnUiThread {
      // Hide the compass during initialization
      mapView.compass.opacity = 0.0f
      // Sets this flag to false to make sure that the compass renders properly in RN
      mapView.compass.fadeWhenFacingNorth = false
      // Sets this flat to true to match the expected behavior
      mapView.compass.fadeWhenFacingNorth = true
    }
  }

  private fun relayoutMapView(mapView: MapView) {
    // Workaround for layout issues
    // https://github.com/rnmapbox/maps/blob/main/android/src/main/java/com/rnmapbox/rnmbx/components/mapview/RNMBXMapView.kt#L1336
    UiThreadUtil.runOnUiThread {
      mapView.requestLayout();
      mapView.forceLayout();

      mapView.measure(
        MeasureSpec.makeMeasureSpec(mapView.width, MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec(mapView.height, MeasureSpec.EXACTLY)
      )
      mapView.layout(mapView.left, mapView.top, mapView.right, mapView.bottom)
    }
  }

  private fun showCompass(mapView: MapView) {
    // When setting the fadeWhenFacingNorth flag to true, fade animation is started
    // This delay prevent the user to see the compass fading out
    val delay = 1000L

    UiThreadUtil.runOnUiThread({
      mapView.compass.opacity = 1.0f
    }, delay)
  }

  const val NAME = "RNOmhMapsPluginMapboxModule"
}
