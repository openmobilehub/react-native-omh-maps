package com.openmobilehub.android.rn.maps.core.viewmanagers

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCoordinate

class RNOmhMapsMarkerViewManagerImpl {
    fun createViewInstance(reactContext: ReactContext): OmhMarkerEntity {
        return OmhMarkerEntity(reactContext)
    }

    fun setPosition(omhMarkerEntity: OmhMarkerEntity, value: ReadableMap) {
        if (omhMarkerEntity.isMounted()) {
            omhMarkerEntity.getEntity()?.setPosition(value.toOmhCoordinate())
                ?: error("RN OmhMarker entity has not yet been added to the OmhMap")
        } else {
            omhMarkerEntity.initialOptions.position = value.toOmhCoordinate()
        }
    }

    companion object {
        const val NAME = "RNOmhMapsMarkerView"
    }
}
