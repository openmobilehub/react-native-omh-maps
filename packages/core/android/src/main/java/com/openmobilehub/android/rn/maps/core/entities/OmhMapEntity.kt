package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap

fun interface OmhMapEntityOnMountAction<E> {
    fun onMount(entity: E)
}

fun interface OmhMapEntityOnMapReadyAction<E> {
    fun onMapReady(entity: E?)
}

abstract class OmhMapEntity<E>(context: Context) : ReactViewGroup(context) {
    private var entity: E? = null
    private val onMountActionsQueue = mutableListOf<OmhMapEntityOnMountAction<E>>()
    private val onMapLoadedActionsQueue = mutableListOf<OmhMapEntityOnMapReadyAction<E>>()
    var viewId: Int = -1
    private var mapLoaded = false

    fun handleMapLoaded() {
        if (mapLoaded) return

        mapLoaded = true
        onMapLoadedActionsQueue.forEach { action ->
            action.onMapReady(entity)
        }
        onMapLoadedActionsQueue.clear()
    }

    fun mountEntity(
        omhMap: OmhMap,
        viewId: Int
    ) {
        this.viewId = viewId

        mountEntity(omhMap)
    }

    abstract fun mountEntity(
        omhMap: OmhMap
    )

    abstract fun unmountEntity()

    fun queueOnMountAction(action: OmhMapEntityOnMountAction<E>) {
        if (entity != null) {
            action.onMount(entity!!)
        } else {
            onMountActionsQueue.add(action)
        }
    }

    fun queueOnMapReadyAction(action: OmhMapEntityOnMapReadyAction<E>) {
        if (mapLoaded) {
            queueOnMountAction {
                action.onMapReady(it)
            }
        } else {
            onMapLoadedActionsQueue.add(action)
        }
    }

    fun setEntity(entity: E) {
        var entityJustMounted = false
        if (this.entity == null && entity != null) {
            // entity is being mounted
            entityJustMounted = true
        }

        this.entity = entity

        if (entityJustMounted) {
            onMountActionsQueue.forEach { action ->
                action.onMount(entity)
            }
            onMountActionsQueue.clear()
        }
    }

    fun getEntity(): E? {
        return entity
    }

    fun isMounted(): Boolean {
        return entity != null
    }
}
