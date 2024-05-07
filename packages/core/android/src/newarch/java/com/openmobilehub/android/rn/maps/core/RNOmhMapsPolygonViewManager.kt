package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RNOmhMapsPolygonViewManagerInterface
import com.openmobilehub.android.rn.maps.core.entities.OmhPolygonEntity
import com.openmobilehub.android.rn.maps.core.viewmanagers.RNOmhMapsPolygonViewManagerImpl

@ReactModule(name = RNOmhMapsPolygonViewManager.NAME)
class RNOmhMapsPolygonViewManager :
  SimpleViewManager<OmhPolygonEntity>(),
  RNOmhMapsPolygonViewManagerInterface<OmhPolygonEntity> {
  private val omhMapPolygonComponentManagerImpl = RNOmhMapsPolygonViewManagerImpl()

  @ReactProp(name = "outline")
  override fun setOutline(view: OmhPolygonEntity, value: ReadableArray?) {
      omhMapPolygonComponentManagerImpl.setOutline(view, value)
  }

  @ReactProp(name = "clickable")
  override fun setClickable(view: OmhPolygonEntity, value: Boolean) {
    omhMapPolygonComponentManagerImpl.setClickable(view, value)
  }

  @ReactProp(name = "consumePolygonClicks")
  override fun setConsumePolygonClicks(view: OmhPolygonEntity, value: Boolean) {
    omhMapPolygonComponentManagerImpl.setConsumePolygonClicks(view, value)
  }

  @ReactProp(name = "strokeColor")
  override fun setStrokeColor(view: OmhPolygonEntity, value: Double) {
    omhMapPolygonComponentManagerImpl.setStrokeColor(view, value)
  }

  @ReactProp(name = "fillColor")
  override fun setFillColor(view: OmhPolygonEntity, value: Double) {
    omhMapPolygonComponentManagerImpl.setFillColor(view, value)
  }

  @ReactProp(name = "strokeWidth")
  override fun setStrokeWidth(view: OmhPolygonEntity, value: Float) {
    omhMapPolygonComponentManagerImpl.setStrokeWidth(view, value)
  }

  @ReactProp(name = "isVisible")
  override fun setIsVisible(view: OmhPolygonEntity, value: Boolean) {
    omhMapPolygonComponentManagerImpl.setIsVisible(view, value)
  }

  @ReactProp(name = "polygonZIndex")
  override fun setPolygonZIndex(view: OmhPolygonEntity, value: Float) {
    omhMapPolygonComponentManagerImpl.setZIndex(view, value)
  }

  @ReactProp(name = "strokeJointType")
  override fun setStrokeJointType(view: OmhPolygonEntity, value: Int) {
    omhMapPolygonComponentManagerImpl.setStrokeJointType(view, value)
  }

  @ReactProp(name = "strokePattern")
  override fun setStrokePattern(view: OmhPolygonEntity, value: ReadableArray?) {
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
