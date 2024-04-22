package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPolyline
import com.openmobilehub.android.maps.core.presentation.models.OmhPolylineOptions

class OmhPolylineEntity(context: Context) :
    OmhMapEntity<OmhPolyline>(context) {

    internal val initialOptions = OmhPolylineOptions()

    override fun mountEntity(omhMap: OmhMap) {
        val polyline = omhMap.addPolyline(initialOptions)
            ?: error("Failed to add polyline to the map")

        setEntity(polyline)
    }

    override fun unmountEntity() {
        getEntity()?.remove()
    }
}
