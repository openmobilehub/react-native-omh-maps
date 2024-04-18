package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.mapbox.common.MapboxOptions

object RNOmhMapsPluginMapboxModuleImpl {
    fun setPublicToken(publicToken: String) {
        MapboxOptions.accessToken = publicToken
    }

    const val NAME = "RNOmhMapsPluginMapboxModule"
}
