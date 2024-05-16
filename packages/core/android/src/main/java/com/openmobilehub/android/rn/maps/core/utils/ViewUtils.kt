package com.openmobilehub.android.rn.maps.core.utils

import android.view.View

fun View.manuallyLayoutView() {
    with(this) {
        requestLayout()
        forceLayout()
        measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
        )
        layout(
            left,
            top,
            right,
            bottom
        )
    }
}
