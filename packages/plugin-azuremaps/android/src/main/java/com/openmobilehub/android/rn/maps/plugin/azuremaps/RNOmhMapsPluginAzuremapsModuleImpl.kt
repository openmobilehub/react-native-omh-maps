package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.azure.android.maps.control.AzureMaps

object RNOmhMapsPluginAzuremapsModuleImpl {
    fun setSubscriptionKey(subscriptionKey: String) {
        AzureMaps.setSubscriptionKey(subscriptionKey)
    }

    const val NAME = "RNOmhMapsPluginAzuremapsModule"
}
