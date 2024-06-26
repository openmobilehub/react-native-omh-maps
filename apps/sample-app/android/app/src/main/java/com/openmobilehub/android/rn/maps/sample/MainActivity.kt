package com.openmobilehub.android.rn.maps.sample

import android.os.Bundle
import com.azure.android.maps.control.AzureMaps
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.mapbox.common.MapboxOptions

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // below: setup required by @openmobilehub/maps-plugin-mapbox
        MapboxOptions.accessToken = BuildConfig.MAPBOX_PUBLIC_TOKEN

        // below: setup required by @openmobilehub/maps-plugin-azuremaps
        AzureMaps.setSubscriptionKey(BuildConfig.AZURE_MAPS_SUBSCRIPTION_KEY)

        super.onCreate(null) // setup required by react-native-screens
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "RnOmhMapsExample"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
