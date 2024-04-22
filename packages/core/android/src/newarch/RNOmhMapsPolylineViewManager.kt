package com.openmobilehub.android.rn.maps.core.viewmanagers

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RNOmhMapsPolylineViewManagerInterface
import com.openmobilehub.android.rn.maps.core.entities.OmhPolylineEntity

@ReactModule(name = RNOmhMapsPolylineViewManager.NAME)
class RNOmhMapsPolylineViewManager :
    SimpleViewManager<OmhPolylineEntity>(),
    RNOmhMapsPolylineViewManagerInterface<OmhPolylineEntity> {
    private val omhMapPolylineComponentManagerImpl = RNOmhMapsPolylineViewManagerImpl()

    @ReactProp(name = "points")
    override fun setPoints(view: OmhPolylineEntity, value: ReadableArray?) {
      omhMapPolylineComponentManagerImpl.setPosition(view, value!!)
    }

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): OmhPolylineEntity {
        return omhMapPolylineComponentManagerImpl.createViewInstance(reactContext)
    }

    companion object {
        const val NAME = RNOmhMapsPolylineViewManagerImpl.NAME
    }
}
