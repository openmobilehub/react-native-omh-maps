package com.openmobilehub.android.rn.maps.core.extensions

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate

fun OmhCoordinate.toWritableMap(): WritableMap {
    val coordinate = this
    return Arguments.createMap().apply {
        putDouble("latitude", coordinate.latitude)
        putDouble("longitude", coordinate.longitude)
    }
}
