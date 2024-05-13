package com.openmobilehub.android.rn.maps.core

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity
import com.openmobilehub.android.rn.maps.core.viewmanagers.RNOmhMapsMarkerViewManagerImpl

@ReactModule(name = RNOmhMapsMarkerViewManagerImpl.NAME)
@Suppress("TooManyFunctions")
class RNOmhMapsMarkerViewManager :
    ViewGroupManager<OmhMarkerEntity>() {
    private val omhMapMarkerComponentManagerImpl = RNOmhMapsMarkerViewManagerImpl()

    override fun createViewInstance(reactContext: ThemedReactContext): OmhMarkerEntity {
        return omhMapMarkerComponentManagerImpl.createViewInstance(reactContext)
    }

    @ReactProp(name = "markerPosition")
    fun setMarkerPosition(entity: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setPosition(entity, value)
    }

    @ReactProp(name = "title")
    fun setTitle(entity: OmhMarkerEntity, value: String?) {
        omhMapMarkerComponentManagerImpl.setTitle(entity, value)
    }

    @ReactProp(name = "clickable")
    fun setClickable(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setClickable(entity, value)
    }

    @ReactProp(name = "draggable")
    fun setDraggable(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setDraggable(entity, value)
    }

    @ReactProp(name = "anchor")
    fun setAnchor(entity: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setAnchor(entity, value)
    }

    @ReactProp(name = "infoWindowAnchor")
    fun setInfoWindowAnchor(entity: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setInfoWindowAnchor(entity, value)
    }

    @ReactProp(name = "alpha")
    fun setAlpha(entity: OmhMarkerEntity, value: Float) {
        omhMapMarkerComponentManagerImpl.setAlpha(entity, value)
    }

    @ReactProp(name = "snippet")
    fun setSnippet(entity: OmhMarkerEntity, value: String?) {
        omhMapMarkerComponentManagerImpl.setSnippet(entity, value)
    }

    @ReactProp(name = "isVisible")
    fun setIsVisible(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setIsVisible(entity, value)
    }

    @ReactProp(name = "isFlat")
    fun setIsFlat(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setIsFlat(entity, value)
    }

    @ReactProp(name = "rotation")
    override fun setRotation(entity: OmhMarkerEntity, value: Float) {
        omhMapMarkerComponentManagerImpl.setRotation(entity, value)
    }

    @ReactProp(name = "backgroundColor")
    fun setBackgroundColor(entity: OmhMarkerEntity, value: Double) {
        omhMapMarkerComponentManagerImpl.setBackgroundColor(entity, value)
    }

    @ReactProp(name = "markerZIndex")
    fun setMarkerZIndex(entity: OmhMarkerEntity, value: Float) {
        omhMapMarkerComponentManagerImpl.setZIndex(entity, value)
    }

    @ReactProp(name = "showInfoWindow")
    fun setShowInfoWindow(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setShowInfoWindow(entity, value)
    }

    @ReactProp(name = "consumeMarkerClicks")
    fun setConsumeMarkerClicks(entity: OmhMarkerEntity, value: Boolean) {
        omhMapMarkerComponentManagerImpl.setConsumeMarkerClicks(entity, value)
    }

    @ReactProp(name = "icon")
    fun setIcon(view: OmhMarkerEntity, value: ReadableMap?) {
        omhMapMarkerComponentManagerImpl.setIcon(view, value)
    }

    override fun getName(): String = RNOmhMapsMarkerViewManagerImpl.NAME

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return RNOmhMapsMarkerViewManagerImpl.EVENTS
    }
}
