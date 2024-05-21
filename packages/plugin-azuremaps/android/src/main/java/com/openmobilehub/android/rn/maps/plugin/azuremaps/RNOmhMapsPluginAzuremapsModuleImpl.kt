package com.openmobilehub.android.rn.maps.plugin.azuremaps

import android.view.View
import com.azure.android.maps.control.AzureMaps
import com.azure.android.maps.control.MapControl
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.plugin.azuremaps.presentation.model.OmhMapView

object RNOmhMapsPluginAzuremapsModuleImpl {
    fun setSubscriptionKey(subscriptionKey: String) {
        AzureMaps.setSubscriptionKey(subscriptionKey)
    }

    const val NAME = "RNOmhMapsPluginAzuremapsModule"
}
