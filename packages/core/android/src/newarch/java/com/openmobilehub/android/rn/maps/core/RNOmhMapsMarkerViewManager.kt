package com.openmobilehub.android.rn.maps.core.viewmanagers

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RNOmhMapsMarkerViewManagerInterface
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity

@ReactModule(name = RNOmhMapsMarkerViewManager.NAME)
@Suppress("TooManyFunctions")
class RNOmhMapsMarkerViewManager :
    SimpleViewManager<OmhMarkerEntity>(),
    RNOmhMapsMarkerViewManagerInterface<OmhMarkerEntity> {
    private val omhMapMarkerComponentManagerImpl = RNOmhMapsMarkerViewManagerImpl()

    @ReactProp(name = "position")
    override fun setPosition(entity: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setPosition(entity, value)
    }

    @ReactProp(name = "title")
    override fun setTitle(entity: OmhMarkerEntity, value: String?) {
        omhMapMarkerComponentManagerImpl.setTitle(entity, value)
    }

    @ReactProp(name = "clickable")
    override fun setClickable(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setClickable(entity, value)
    }

    @ReactProp(name = "draggable")
    override fun setDraggable(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setDraggable(entity, value)
    }

    @ReactProp(name = "anchor")
    override fun setAnchor(entity: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setAnchor(entity, value)
    }

    @ReactProp(name = "infoWindowAnchor")
    override fun setInfoWindowAnchor(entity: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setInfoWindowAnchor(entity, value)
    }

    @ReactProp(name = "alpha")
    override fun setAlpha(entity: OmhMarkerEntity, value: Float) {
        omhMapMarkerComponentManagerImpl.setAlpha(entity, value)
    }

    @ReactProp(name = "snippet")
    override fun setSnippet(entity: OmhMarkerEntity, value: String?) {
        omhMapMarkerComponentManagerImpl.setSnippet(entity, value)
    }

    @ReactProp(name = "isVisible")
    override fun setIsVisible(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setIsVisible(entity, value)
    }

    @ReactProp(name = "isFlat")
    override fun setIsFlat(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setIsFlat(entity, value)
    }

    @ReactProp(name = "rotation")
    override fun setRotation(entity: OmhMarkerEntity, value: Float) {
        omhMapMarkerComponentManagerImpl.setRotation(entity, value)
    }

    @ReactProp(name = "backgroundColor")
    override fun setBackgroundColor(entity: OmhMarkerEntity, value: Double) {
        omhMapMarkerComponentManagerImpl.setBackgroundColor(entity, value)
    }

    @ReactProp(name = "markerZIndex")
    override fun setMarkerZIndex(entity: OmhMarkerEntity, value: Float) {
        omhMapMarkerComponentManagerImpl.setZIndex(entity, value)
    }

    @ReactProp(name = "isInfoWindowShown")
    override fun setIsInfoWindowShown(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setIsInfoWindowShown(entity, value)
    }

    @ReactProp(name = "consumeMarkerClicks")
    override fun setConsumeMarkerClicks(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setConsumeMarkerClicks(entity, value)
    }

    @ReactProp(name = "icon")
    override fun setIcon(view: OmhMarkerEntity, value: String?) {
        omhMapMarkerComponentManagerImpl.setIcon(view, value)
    }

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): OmhMarkerEntity {
        return omhMapMarkerComponentManagerImpl.createViewInstance(reactContext)
    }

    companion object {
        const val NAME = RNOmhMapsMarkerViewManagerImpl.NAME
    }
}
