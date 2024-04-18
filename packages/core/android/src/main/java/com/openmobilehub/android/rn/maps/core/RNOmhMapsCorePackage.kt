package com.openmobilehub.android.rn.maps.core

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.openmobilehub.android.rn.maps.core.viewmanager.RNOmhMapsCoreViewManager

class RNOmhMapsCorePackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        val viewManagers: MutableList<ViewManager<*, *>> = ArrayList()
        viewManagers.add(RNOmhMapsCoreViewManager())
        return viewManagers
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return emptyList()
    }
}
