package com.openmobilehub.android.rn.maps.plugin.azuremaps

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.uimanager.ViewManager

class OmhMapsPluginAzuremapsTurboPackage : TurboReactPackage() {
    /**
     * Initialize and export modules based on the name of the required module
     */
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            RNOmhMapsPluginAzuremapsModule.NAME -> RNOmhMapsPluginAzuremapsModule(reactContext)
            else -> null
        }
    }

    /**
     * Declare info about exported modules
     */
    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        /**
         * Here declare the array of exported modules
         */
        val moduleList: Array<Class<out NativeModule?>> = arrayOf(
            RNOmhMapsPluginAzuremapsModule::class.java
        )
        val reactModuleInfoMap: MutableMap<String, ReactModuleInfo> = HashMap()
        /**
         * And here just iterate on that array and produce the info provider instance
         */
        for (moduleClass in moduleList) {
            val reactModule = moduleClass.getAnnotation(ReactModule::class.java) ?: continue
            reactModuleInfoMap[reactModule.name] =
                ReactModuleInfo(
                    reactModule.name,
                    moduleClass.name,
                    true,
                    reactModule.needsEagerInit,
                    reactModule.hasConstants,
                    reactModule.isCxxModule,
                    TurboModule::class.java.isAssignableFrom(moduleClass)
                )
        }
        return ReactModuleInfoProvider { reactModuleInfoMap }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        /**
         * Here declare the list of exported native components
         */
        return listOf()
    }
}
