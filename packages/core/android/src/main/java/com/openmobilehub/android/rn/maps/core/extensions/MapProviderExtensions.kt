package com.openmobilehub.android.rn.maps.core.extensions

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.maps.core.model.MapProvider

fun MapProvider.toWritableMap(): WritableMap {
    val provider = this
    return Arguments.createMap().apply {
        putString("name", provider.name)
        putString("path", provider.path)
    }
}
