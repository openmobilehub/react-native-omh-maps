package com.openmobilehub.android.rn.maps.core.viewmanagers

import androidx.fragment.app.FragmentContainerView
import com.facebook.react.bridge.Dynamic
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.facebook.react.viewmanagers.RNOmhMapsCoreViewManagerInterface
import com.openmobilehub.android.rn.maps.core.fragments.OmhMapViewFragment

@ReactModule(name = OmhMapViewFragment.NAME)
class RNOmhMapsCoreViewManager :
    SimpleViewManager<FragmentContainerView>(),
    RNOmhMapsCoreViewManagerInterface<FragmentContainerView> {
    private lateinit var omhMapViewManagerImpl: RNOmhMapsCoreViewManagerImpl

    override fun createViewInstance(reactContext: ThemedReactContext): FragmentContainerView {
        omhMapViewManagerImpl = RNOmhMapsCoreViewManagerImpl(reactContext)
        return omhMapViewManagerImpl.createViewInstance(reactContext)
    }

    override fun onDropViewInstance(view: FragmentContainerView) {
        super.onDropViewInstance(view)
        omhMapViewManagerImpl.unmountFragment(view)
    }

    @ReactProp(name = "zoomEnabled")
    override fun setZoomEnabled(view: FragmentContainerView, value: Boolean) {
        omhMapViewManagerImpl.setZoomEnabled(view, value)
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: FragmentContainerView, index: Int, value: Dynamic?) {
        omhMapViewManagerImpl.setStyle(view, index, value)
    }

    @ReactProp(name = "paths")
    override fun setPaths(view: FragmentContainerView, value: ReadableMap?) {
        omhMapViewManagerImpl.setPaths(view, value)
    }

    override fun getName() = RNOmhMapsCoreViewManagerImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        return RNOmhMapsCoreViewManagerImpl.EVENTS
    }
}
