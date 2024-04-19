package com.openmobilehub.android.rn.maps.core.entities

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup

abstract class OmhMapEntity<E>(context: Context, private var entity: E) : ReactViewGroup(context) {
    fun mountEntity() {}

    fun unmountEntity() {}

    fun getEntity(): E {
        return entity
    }
}
