package com.openmobilehub.android.rn.maps.plugin.openstreetmap

import android.view.View
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import org.osmdroid.views.MapView

class RNOmhMapsPluginOpenstreetmapModuleImpl {

    private fun getMapView(viewRef: Double, context: ReactContext): View {
        val fragment = FragmentUtils.requireFragment(context, viewRef.toInt())
        val omhMap = fragment.javaClass.getMethod("requireOmhMap").invoke(fragment) as OmhMap

        return omhMap.mapView as MapView
    }

    fun relayoutMapView(viewRef: Double, context: ReactContext) {
        val mapView = getMapView(viewRef, context)
        relayoutMapView(mapView)
    }

    private fun relayoutMapView(mapRoot: View) {
        UiThreadUtil.runOnUiThread {
            with(mapRoot) {
                requestLayout()
                forceLayout()

                measure(
                    View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
                )

                layout(
                    left,
                    top,
                    right,
                    bottom
                )
            }
        }
    }

    companion object {
        const val NAME = "RNOmhMapsPluginOpenstreetmapModule"
    }
}
