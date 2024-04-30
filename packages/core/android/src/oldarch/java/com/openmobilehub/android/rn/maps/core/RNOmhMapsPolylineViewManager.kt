package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.openmobilehub.android.rn.maps.core.entities.OmhPolylineEntity
import com.openmobilehub.android.rn.maps.core.viewmanagers.RNOmhMapsPolylineViewManagerImpl

@ReactModule(name = RNOmhMapsPolylineViewManager.NAME)
class RNOmhMapsPolylineViewManager :
  SimpleViewManager<OmhPolylineEntity>(){
  private val omhMapPolylineComponentManagerImpl = RNOmhMapsPolylineViewManagerImpl()

  @ReactProp(name = "points")
  fun setPoints(view: OmhPolylineEntity, value: ReadableArray?) {
      omhMapPolylineComponentManagerImpl.setPosition(view, value)
  }

  @ReactProp(name = "clickable")
  fun setClickable(view: OmhPolylineEntity, value: Boolean) {
    omhMapPolylineComponentManagerImpl.setClickable(view, value)
  }

  @ReactProp(name = "consumePolylineClicks")
  fun setConsumePolylineClicks(view: OmhPolylineEntity, value: Boolean) {
    omhMapPolylineComponentManagerImpl.setConsumePolylineClicks(view, value)
  }

  @ReactProp(name = "color")
  fun setColor(view: OmhPolylineEntity, value: Double) {
    omhMapPolylineComponentManagerImpl.setColor(view, value)
  }

  @ReactProp(name = "width")
  fun setWidth(view: OmhPolylineEntity, value: Float) {
    omhMapPolylineComponentManagerImpl.setWidth(view, value)
  }

  @ReactProp(name = "isVisible")
  fun setIsVisible(view: OmhPolylineEntity, value: Boolean) {
    omhMapPolylineComponentManagerImpl.setIsVisible(view, value)
  }

  @ReactProp(name = "polylineZIndex")
  fun setPolylineZIndex(view: OmhPolylineEntity, value: Float) {
    omhMapPolylineComponentManagerImpl.setZIndex(view, value)
  }

  @ReactProp(name = "jointType")
  fun setJointType(view: OmhPolylineEntity, value: Int) {
    omhMapPolylineComponentManagerImpl.setJointType(view, value)
  }

  @ReactProp(name = "pattern")
  fun setPattern(view: OmhPolylineEntity, value: ReadableArray?) {
    omhMapPolylineComponentManagerImpl.setPattern(view, value)
  }

  @ReactProp(name = "cap")
  fun setCap(view: OmhPolylineEntity, value: ReadableMap?) {
    omhMapPolylineComponentManagerImpl.setCap(view, value)
  }

  @ReactProp(name = "startCap")
  fun setStartCap(view: OmhPolylineEntity, value: ReadableMap?) {
    omhMapPolylineComponentManagerImpl.setStartCap(view, value)
  }

  @ReactProp(name = "endCap")
  fun setEndCap(view: OmhPolylineEntity, value: ReadableMap?) {
    omhMapPolylineComponentManagerImpl.setEndCap(view, value)
  }

  @ReactProp(name = "spans")
  fun setSpans(view: OmhPolylineEntity, value: ReadableArray?) {
    omhMapPolylineComponentManagerImpl.setSpans(view, value)
  }

  override fun getName(): String = NAME

  override fun createViewInstance(reactContext: ThemedReactContext): OmhPolylineEntity {
    return omhMapPolylineComponentManagerImpl.createViewInstance(reactContext)
  }

  companion object {
    const val NAME = RNOmhMapsPolylineViewManagerImpl.NAME
  }
}
