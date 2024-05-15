package com.openmobilehub.android.rn.maps.core.utils

import android.view.View

object ViewUtils {
    fun manuallyLayoutView(view: View) {
        view.requestLayout()
        view.forceLayout()

        view.measure(
            View.MeasureSpec.makeMeasureSpec(view.width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(view.height, View.MeasureSpec.EXACTLY)
        )
        view.layout(
            view.left,
            view.top,
            view.right,
            view.bottom
        )
    }
}
