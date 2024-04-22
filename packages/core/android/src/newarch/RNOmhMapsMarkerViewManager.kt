package com.openmobilehub.android.rn.maps.core.viewmanagers

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RNOmhMapsMarkerViewManagerInterface
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity

@ReactModule(name = RNOmhMapsMarkerViewManager.NAME)
class RNOmhMapsMarkerViewManager :
    SimpleViewManager<OmhMarkerEntity>(),
    RNOmhMapsMarkerViewManagerInterface<OmhMarkerEntity> {
    private val omhMapMarkerComponentManagerImpl = RNOmhMapsMarkerViewManagerImpl()

    @ReactProp(name = "position")
    override fun setPosition(view: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setPosition(view, value!!)
    }

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): OmhMarkerEntity {
        return omhMapMarkerComponentManagerImpl.createViewInstance(reactContext)
    }

    companion object {
        const val NAME = RNOmhMapsMarkerViewManagerImpl.NAME
    }
}