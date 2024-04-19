package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMarker
import com.openmobilehub.android.maps.core.presentation.models.OmhMarkerOptions

class OmhMarkerEntity(context: Context) :
    OmhMapEntity<OmhMarker, OmhMarkerOptions>(context) {

    internal val initialOptions = OmhMarkerOptions()

    override fun mountEntity(omhMap: OmhMap, options: OmhMarkerOptions) {
        val marker = omhMap.addMarker(options)
            ?: error("Failed to add marker to the map")

        setEntity(marker)
    }

    override fun unmountEntity() {
        getEntity()?.remove()
    }
}
