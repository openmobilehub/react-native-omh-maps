package com.openmobilehub.android.rn.maps.core.extensions

import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate

fun ReadableMap.toOmhCoordinate(): OmhCoordinate {
    return OmhCoordinate(
        getDouble("latitude"),
        getDouble("longitude")
    )
}
