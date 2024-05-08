package com.openmobilehub.android.rn.maps.core.viewmanagers

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.openmobilehub.android.rn.maps.core.entities.OmhMapInfoWindowContents

class RNOmhMapsInfoWindowContentsViewManagerImpl {

    fun createViewInstance(reactContext: ThemedReactContext): OmhMapInfoWindowContents {
        return OmhMapInfoWindowContents(reactContext)
    }

    fun setChildrenSize(view: OmhMapInfoWindowContents, value: ReadableMap?) {
        value?.let {
            view.width = value.getInt("width")
            view.height = value.getInt("height")
        }

        view.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED)

        view.markerEntity?.getEntity()?.let { marker ->
            marker.invalidateInfoWindow()
        }
    }

    companion object {
        const val NAME = "RNOmhMapsInfoWindowContents"
    }
}
