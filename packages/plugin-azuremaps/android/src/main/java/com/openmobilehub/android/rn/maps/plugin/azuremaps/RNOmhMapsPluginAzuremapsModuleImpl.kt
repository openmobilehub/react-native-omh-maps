package com.openmobilehub.android.rn.maps.plugin.azuremaps

import android.view.View
import com.azure.android.maps.control.AzureMaps
import com.azure.android.maps.control.MapControl
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.plugin.azuremaps.presentation.model.OmhMapView

object RNOmhMapsPluginAzuremapsModuleImpl {
  fun setSubscriptionKey(subscriptionKey: String) {
    AzureMaps.setSubscriptionKey(subscriptionKey)
  }

  private fun getMapView(viewRef: Double, context: ReactContext): MapControl {
    val fragment = FragmentUtils.requireFragment(context, viewRef.toInt())
    val omhMap = fragment.javaClass.getMethod("requireOmhMap").invoke(fragment) as OmhMap
    return (omhMap.mapView as OmhMapView).mapControl
  }

  fun relayoutMapView(viewRef: Double, context: ReactContext) {
    val mapView = getMapView(viewRef, context)
    relayoutMapView(mapView)
  }

  private fun relayoutMapView(mapControl: MapControl) {
    UiThreadUtil.runOnUiThread {
      mapControl.requestLayout();
      mapControl.forceLayout();

      mapControl.measure(
        View.MeasureSpec.makeMeasureSpec(mapControl.width, View.MeasureSpec.EXACTLY),
        View.MeasureSpec.makeMeasureSpec(mapControl.height, View.MeasureSpec.EXACTLY)
      )
      mapControl.layout(mapControl.left, mapControl.top, mapControl.right, mapControl.bottom)
    }
  }

  const val NAME = "RNOmhMapsPluginAzuremapsModule"
}
