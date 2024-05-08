package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

class OmhMapInfoWindowContents(context: Context) : ReactViewGroup(context) {
    var markerEntity: OmhMarkerEntity? = null

    @get:JvmName("GetOmhWidth")
    @set:JvmName("SetOmhWidth")
    var width: Int = 1

    @get:JvmName("GetOmhHeight")
    @set:JvmName("SetOmhHeight")
    var height: Int = 1

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        setMeasuredDimension(width, height)
    }
}
