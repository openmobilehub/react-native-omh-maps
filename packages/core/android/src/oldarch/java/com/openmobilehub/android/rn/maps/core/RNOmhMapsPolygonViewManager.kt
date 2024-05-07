package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.openmobilehub.android.rn.maps.core.entities.OmhPolygonEntity
import com.openmobilehub.android.rn.maps.core.viewmanagers.RNOmhMapsPolygonViewManagerImpl

@ReactModule(name = RNOmhMapsPolygonViewManager.NAME)
class RNOmhMapsPolygonViewManager :
  SimpleViewManager<OmhPolygonEntity>(){
  private val omhMapPolygonComponentManagerImpl = RNOmhMapsPolygonViewManagerImpl()

  @ReactProp(name = "outline")
  fun setOutline(view: OmhPolygonEntity, value: ReadableArray?) {
      omhMapPolygonComponentManagerImpl.setOutline(view, value)
  }

  @ReactProp(name = "clickable")
  fun setClickable(view: OmhPolygonEntity, value: Boolean) {
    omhMapPolygonComponentManagerImpl.setClickable(view, value)
  }

  @ReactProp(name = "consumePolygonClicks")
  fun setConsumePolygonClicks(view: OmhPolygonEntity, value: Boolean) {
    omhMapPolygonComponentManagerImpl.setConsumePolygonClicks(view, value)
  }

  @ReactProp(name = "strokeColor")
  fun setStrokeColor(view: OmhPolygonEntity, value: Double) {
    omhMapPolygonComponentManagerImpl.setStrokeColor(view, value)
  }

  @ReactProp(name = "fillColor")
  fun setFillColor(view: OmhPolygonEntity, value: Double) {
    omhMapPolygonComponentManagerImpl.setFillColor(view, value)
  }

  @ReactProp(name = "holes")
  fun setHoles(view: OmhPolygonEntity, value: ReadableArray?) {
    omhMapPolygonComponentManagerImpl.setHoles(view, value)
  }

  @ReactProp(name = "strokeWidth")
  fun setStrokeWidth(view: OmhPolygonEntity, value: Float) {
    omhMapPolygonComponentManagerImpl.setStrokeWidth(view, value)
  }

  @ReactProp(name = "isVisible")
  fun setIsVisible(view: OmhPolygonEntity, value: Boolean) {
    omhMapPolygonComponentManagerImpl.setIsVisible(view, value)
  }

  @ReactProp(name = "polygonZIndex")
  fun setPolygonZIndex(view: OmhPolygonEntity, value: Float) {
    omhMapPolygonComponentManagerImpl.setZIndex(view, value)
  }

  @ReactProp(name = "strokeJointType")
  fun setStrokeJointType(view: OmhPolygonEntity, value: Int) {
    omhMapPolygonComponentManagerImpl.setStrokeJointType(view, value)
  }

  @ReactProp(name = "strokePattern")
  fun setStrokePattern(view: OmhPolygonEntity, value: ReadableArray?) {
    omhMapPolygonComponentManagerImpl.setStrokePattern(view, value)
  }

  override fun getName(): String = NAME

  override fun createViewInstance(reactContext: ThemedReactContext): OmhPolygonEntity {
    return omhMapPolygonComponentManagerImpl.createViewInstance(reactContext)
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
    return RNOmhMapsPolygonViewManagerImpl.EVENTS
  }

  companion object {
    const val NAME = RNOmhMapsPolygonViewManagerImpl.NAME
  }
}
