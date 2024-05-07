package com.openmobilehub.android.rn.maps.core.utils

internal object ColorUtils {
  fun toColorInt(value: Double) =
    (0xFF000000L or value.toLong()).toInt() // impute possibly missing bits (RGB instead of ARGB)
}
