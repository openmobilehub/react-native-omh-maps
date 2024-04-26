package com.openmobilehub.android.rn.maps.core.viewmanagers

import android.graphics.drawable.Drawable
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity
import com.openmobilehub.android.rn.maps.core.extensions.toAnchor
import com.openmobilehub.android.rn.maps.core.extensions.toOmhCoordinate
import com.openmobilehub.android.rn.maps.core.utils.ColorUtils
import com.openmobilehub.android.rn.maps.core.utils.DrawableLoader
import com.openmobilehub.android.rn.maps.core.utils.RNComponentUtils.requirePropertyNotNull
import com.openmobilehub.android.maps.core.presentation.models.Constants as OmhConstants


internal object Constants {
    val DEFAULT_ANCHOR = OmhConstants.ANCHOR_CENTER to OmhConstants.ANCHOR_CENTER
    val DEFAULT_IW_ANCHOR = OmhConstants.ANCHOR_CENTER to OmhConstants.ANCHOR_TOP
}

@Suppress("TooManyFunctions")
class RNOmhMapsMarkerViewManagerImpl {
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
        val color = ColorUtils.toColorInt(value)

        if (entity.isMounted()) {
            entity.getEntity()!!.setBackgroundColor(color)
        } else {
            entity.initialOptions.backgroundColor = color
        }
    }

    fun setZIndex(entity: OmhMarkerEntity, value: Float) {
        if (entity.isMounted()) {
            entity.getEntity()!!.setZIndex(value)
        } else {
            entity.initialOptions.zIndex = value
        }
    }

    fun setIsInfoWindowShown(entity: OmhMarkerEntity, value: Boolean) {
        entity.queueOnMountAction {
            if (value) {
                it.showInfoWindow()
            } else {
                it.hideInfoWindow()
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

    fun setIcon(entity: OmhMarkerEntity, value: String?) {
        if (value == null) {
            setIconDrawable(entity, null)
        } else {
            DrawableLoader.loadDrawable(entity, value) { drawable ->
                setIconDrawable(entity, drawable)
            }
        }
    }

    companion object {
        const val NAME = "RNOmhMapsMarkerView"
    }
}
