package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap

abstract class OmhMapEntity<E, EOptions>(context: Context) : ReactViewGroup(context) {
    private var entity: E? = null

    abstract fun mountEntity(
        omhMap: OmhMap,
        options: EOptions
    )

    abstract fun unmountEntity()

    fun setEntity(entity: E) {
        this.entity = entity
    }

    fun getEntity(): E? {
        return entity
    }

    fun isMounted(): Boolean {
        return entity != null
    }
}
