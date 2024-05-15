package com.openmobilehub.android.rn.maps.core.viewmanagers

import android.graphics.drawable.Drawable
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.common.MapBuilder
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerDragEndEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerDragEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerDragStartEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWClose
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWLongPressEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWOpen
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerIWPressEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMarkerPressEvent
import com.openmobilehub.android.rn.maps.core.extensions.toAnchor
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCoordinate
import com.openmobilehub.android.rn.maps.core.utils.DrawableLoader
import com.openmobilehub.android.rn.maps.core.utils.RNComponentUtils.requirePropertyNotNull
import com.openmobilehub.android.rn.maps.core.utils.ViewUtils
import com.openmobilehub.android.maps.core.presentation.models.Constants as OmhConstants

internal object Constants {
    val DEFAULT_ANCHOR = OmhConstants.ANCHOR_CENTER to OmhConstants.ANCHOR_CENTER
    val DEFAULT_IW_ANCHOR = OmhConstants.ANCHOR_CENTER to OmhConstants.ANCHOR_TOP
}

@Suppress("TooManyFunctions")
class RNOmhMapsMarkerViewManagerImpl {

    private var lastBackgroundColor: MutableMap<OmhMarkerEntity, Double> = mutableMapOf()
    private var lastIconURI: MutableMap<OmhMarkerEntity, String?> = mutableMapOf()

    fun createViewInstance(reactContext: ReactContext): OmhMarkerEntity {
        return OmhMarkerEntity(reactContext)
    }

    fun setPosition(entity: OmhMarkerEntity, value: ReadableMap?) {
        requirePropertyNotNull("position", value)

        if (entity.isMounted()) {
            entity.getEntity()!!.setPosition(value!!.toOmhCoordinate())
        } else {
            entity.initialOptions.position = value!!.toOmhCoordinate()
        }
    }

    fun setTitle(entity: OmhMarkerEntity, value: String?) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setTitle(value)
        } else {
            entity.initialOptions.title = value
        }
    }

    fun setClickable(entity: OmhMarkerEntity, value: Boolean) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setClickable(value)
        } else {
            entity.initialOptions.clickable = value
        }
    }

    fun setDraggable(entity: OmhMarkerEntity, value: Boolean) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setDraggable(value)
        } else {
            entity.initialOptions.draggable = value
        }
    }

    fun setAnchor(entity: OmhMarkerEntity, value: ReadableMap?) {
        val anchor = value?.toAnchor() ?: Constants.DEFAULT_ANCHOR

        if (entity.isMounted()) {
            entity.getEntity()!!.setAnchor(anchor.first, anchor.second)
        } else {
            entity.initialOptions.anchor = anchor
        }
    }

    fun setInfoWindowAnchor(entity: OmhMarkerEntity, value: ReadableMap?) {
        val anchor = value?.toAnchor() ?: Constants.DEFAULT_IW_ANCHOR

        if (entity.isMounted()) {
            entity.getEntity()!!.setInfoWindowAnchor(anchor.first, anchor.second)
        } else {
            entity.initialOptions.infoWindowAnchor = anchor
        }
    }

    fun setAlpha(entity: OmhMarkerEntity, value: Float) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setAlpha(value)
        } else {
            entity.initialOptions.alpha = value
        }
    }

    fun setSnippet(entity: OmhMarkerEntity, value: String?) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setSnippet(value)
        } else {
            entity.initialOptions.snippet = value
        }
    }

    fun setIsVisible(entity: OmhMarkerEntity, value: Boolean) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setIsVisible(value)
        } else {
            entity.initialOptions.isVisible = value
        }
    }

    fun setIsFlat(entity: OmhMarkerEntity, value: Boolean) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setIsFlat(value)
        } else {
            entity.initialOptions.isFlat = value
        }
    }

    fun setRotation(entity: OmhMarkerEntity, value: Float) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setRotation(value)
        } else {
            entity.initialOptions.rotation = value
        }
    }

    fun setBackgroundColor(entity: OmhMarkerEntity, value: Double) {
        // since setBackgroundColor & setIcon are mutually exclusive
        // (overwrite each other) in the OMH SDK, we are caching the values
        if (lastBackgroundColor[entity] != value) {
            val color =
                (0xFF000000L or value.toLong()).toInt() // impute possibly missing bits (RGB instead of ARGB)

            if (entity.isMounted()) {
                entity.getEntity()!!.setBackgroundColor(color)
            } else {
                entity.initialOptions.backgroundColor = color
            }

            lastBackgroundColor[entity] = value
        }
    }

    fun setZIndex(entity: OmhMarkerEntity, value: Float) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setZIndex(value)
        } else {
            entity.initialOptions.zIndex = value
        }
    }

    fun setShowInfoWindow(entity: OmhMarkerEntity, value: Boolean) {
        entity.queueOnMapReadyAction { marker, _, omhMapView ->
            UiThreadUtil.runOnUiThread {
                if (value) {
                    marker?.showInfoWindow()
                } else {
                    marker?.hideInfoWindow()
                }

                omhMapView?.getView()?.let { ViewUtils.manuallyLayoutView(it) }
            }
        }
    }

    fun setConsumeMarkerClicks(entity: OmhMarkerEntity, value: Boolean) {
        entity.consumeMarkerClicks = value
    }

    private fun setIconDrawable(entity: OmhMarkerEntity, drawable: Drawable?) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setIcon(drawable)
        } else {
            entity.initialOptions.icon = drawable
        }
    }

    fun setIcon(entity: OmhMarkerEntity, value: ReadableMap?) {
        val uri = value?.getString("uri")

        if (lastIconURI[entity] != uri) {
            if (uri == null) {
                setIconDrawable(entity, null)
            } else {
                var dimensions: Pair<Int, Int>? = null
                if (value.hasKey("width") && value.hasKey("height")) {
                    dimensions = value.getInt("width") to value.getInt("height")
                }

                DrawableLoader.loadDrawable(
                    entity,
                    uri,
                    { drawable -> setIconDrawable(entity, drawable) },
                    dimensions
                )
            }

            lastIconURI[entity] = uri
        }
    }

    companion object {
        const val NAME = "RNOmhMapsMarkerView"

        val EVENTS: Map<String, Any> =
            listOf(
                OmhOnMarkerDragStartEvent,
                OmhOnMarkerDragEvent,
                OmhOnMarkerDragEndEvent,
                OmhOnMarkerPressEvent,
                OmhOnMarkerIWPressEvent,
                OmhOnMarkerIWLongPressEvent,
                OmhOnMarkerIWOpen,
                OmhOnMarkerIWClose
            ).associateBy(
                { it.NAME },
                { MapBuilder.of("registrationName", it.REGISTRATION_NAME) }
            ).toMap()
    }
}
