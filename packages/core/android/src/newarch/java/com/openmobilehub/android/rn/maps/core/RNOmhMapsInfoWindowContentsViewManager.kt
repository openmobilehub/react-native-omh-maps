package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RNOmhMapsInfoWindowContentsManagerInterface
import com.openmobilehub.android.rn.maps.core.entities.OmhMapInfoWindowContents
import com.openmobilehub.android.rn.maps.core.viewmanagers.RNOmhMapsInfoWindowContentsViewManagerImpl


@ReactModule(name = RNOmhMapsInfoWindowContentsViewManagerImpl.NAME)
@Suppress("TooManyFunctions")
class RNOmhMapsInfoWindowContentsViewManager :
    ViewGroupManager<OmhMapInfoWindowContents>(),
    RNOmhMapsInfoWindowContentsManagerInterface<OmhMapInfoWindowContents> {

    private val omhInfoWindowContentsViewManagerImpl = RNOmhMapsInfoWindowContentsViewManagerImpl()

    override fun createViewInstance(reactContext: ThemedReactContext): OmhMapInfoWindowContents {
        return omhInfoWindowContentsViewManagerImpl.createViewInstance(reactContext)
    }

    @ReactProp(name = "childrenSize")
    override fun setChildrenSize(view: OmhMapInfoWindowContents, value: ReadableMap?) {
        omhInfoWindowContentsViewManagerImpl.setChildrenSize(view, value)
    }

    override fun getName(): String {
        return RNOmhMapsInfoWindowContentsViewManagerImpl.NAME
    }
}
