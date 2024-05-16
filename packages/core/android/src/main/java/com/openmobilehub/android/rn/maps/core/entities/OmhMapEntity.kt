package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMapView

fun interface OmhMapEntityOnMountAction<E> {
    fun onMount(entity: E)
}

fun interface OmhMapEntityOnMapReadyAction<E> {
    fun onMapReady(entity: E?, omhMap: OmhMap, omhMapView: OmhMapView?)
}

abstract class OmhMapEntity<E>(context: Context) : ReactViewGroup(context) {
    private var entity: E? = null
    private val onMountActionsQueue = mutableListOf<OmhMapEntityOnMountAction<E>>()
    private val onMapLoadedActionsQueue = mutableListOf<OmhMapEntityOnMapReadyAction<E>>()
    var viewId: Int = -1
    private var mapLoaded = false
    private lateinit var omhMap: OmhMap
    private var omhMapView: OmhMapView? = null

    fun handleMapLoaded(omhMap: OmhMap, omhMapView: OmhMapView?) {
        this.omhMap = omhMap
        this.omhMapView = omhMapView

        if (mapLoaded) return

        mapLoaded = true
        onMapLoadedActionsQueue.forEach { action ->
            action.onMapReady(entity, omhMap, omhMapView)
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
                action.onMapReady(it, omhMap, omhMapView)
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
