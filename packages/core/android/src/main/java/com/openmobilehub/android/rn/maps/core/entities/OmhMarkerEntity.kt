package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMarker
import com.openmobilehub.android.maps.core.presentation.models.OmhMarkerOptions

class OmhMarkerEntity(context: Context) :
    OmhMapEntity<OmhMarker>(context) {

    internal val initialOptions = OmhMarkerOptions()

    override fun mountEntity(omhMap: OmhMap) {
        val marker = omhMap.addMarker(initialOptions)
            ?: error("Failed to add marker to the map")

        setEntity(marker)
    }

    override fun unmountEntity() {
        getEntity()?.remove()
    }
}
