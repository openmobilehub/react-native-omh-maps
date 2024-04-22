package com.openmobilehub.android.rn.maps.core.viewmanagers

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.openmobilehub.android.rn.maps.core.entities.OmhPolylineEntity
import com.openmobilehub.android.rn.maps.core.extensions.toPoints

class RNOmhMapsPolylineViewManagerImpl {
    fun createViewInstance(reactContext: ReactContext): OmhPolylineEntity {
        return OmhPolylineEntity(reactContext)
    }

    fun setPosition(omhPolylineEntity: OmhPolylineEntity, value: ReadableArray) {
        if (omhPolylineEntity.isMounted()) {
          omhPolylineEntity.getEntity()?.setPoints(value.toPoints())
                ?: error("RN OmhPolyline entity has not yet been added to the OmhMap")
        } else {
            omhPolylineEntity.initialOptions.points = value.toPoints()
        }
    }

    companion object {
        const val NAME = "RNOmhMapsPolylineView"
    }
}
