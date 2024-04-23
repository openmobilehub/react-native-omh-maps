package com.openmobilehub.android.rn.maps.core

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity
import com.openmobilehub.android.rn.maps.core.viewmanagers.RNOmhMapsMarkerViewManagerImpl

@ReactModule(name = RNOmhMapsMarkerViewManager.NAME)
class RNOmhMapsMarkerViewManager :
  SimpleViewManager<OmhMarkerEntity>() {
  private val omhMapMarkerComponentManagerImpl = RNOmhMapsMarkerViewManagerImpl()

  override fun getName(): String = NAME

  override fun createViewInstance(reactContext: ThemedReactContext): OmhMarkerEntity {
    return omhMapMarkerComponentManagerImpl.createViewInstance(reactContext)
  }

  @ReactProp(name = "position")
  fun setPosition(view: OmhMarkerEntity, value: ReadableMap?) {
    omhMapMarkerComponentManagerImpl.setPosition(view, value!!)
  }

  companion object {
    const val NAME = RNOmhMapsMarkerViewManagerImpl.NAME
  }
}
