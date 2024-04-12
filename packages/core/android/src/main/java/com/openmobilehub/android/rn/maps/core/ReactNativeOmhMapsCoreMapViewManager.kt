/*
 * Copyright 2023 Open Mobile Hub
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.openmobilehub.android.rn.maps.core

import android.content.Context
import android.graphics.Point
import android.os.Build
import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.openmobilehub.android.maps.core.factories.OmhMapProvider
import com.openmobilehub.android.maps.core.presentation.fragments.OmhMapFragment
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnMapReadyCallback


class ReactNativeOmhMapsCoreMapViewManager(private val reactContext: ReactApplicationContext) :
    ViewGroupManager<FrameLayout>(), OmhOnMapReadyCallback {

    private val REACT_CLASS = "RNOmhMapViewManager"
    val COMMAND_CREATE_FRAGMENT = 1
    private var width: Int? = null
    private var height: Int? = null
    private lateinit var omhMap: OmhMap
    private lateinit var omhMapFragment: OmhMapFragment
    private var frameCallback: Choreographer.FrameCallback = Choreographer.FrameCallback { }

    override fun getName(): String {
        return REACT_CLASS
    }

    /**
     * Return a FrameLayout to host the OmhMapFragment
     */
    override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
        return FrameLayout(reactContext)
    }

    /**
     * Map the "create" command to an integer
     */
    override fun getCommandsMap(): MutableMap<String, Int>? {
        return MapBuilder.of("createFragment", COMMAND_CREATE_FRAGMENT)
    }

    /**
     * Handle "createFragment" command (called from JS) and call createFragment
     */
    override fun receiveCommand(root: FrameLayout, commandId: String?, args: ReadableArray?) {
        super.receiveCommand(root, commandId, args)
        val reactNativeViewId = args?.getInt(0)
        val commandIdInt = commandId?.let { Integer.parseInt(it) }

        OmhMapProvider.Initiator()
            .addGmsPath("com.openmobilehub.android.maps.plugin.googlemaps.presentation.OmhMapFactoryImpl")
            .addNonGmsPath("com.openmobilehub.android.maps.plugin.mapbox.presentation.OmhMapFactoryImpl")
            .initialize()

        if (reactNativeViewId != null) {
            when (commandIdInt) {
                COMMAND_CREATE_FRAGMENT ->
                    createFragment(root, reactNativeViewId)
            }
        }
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: FrameLayout, index: Int, value: Int) {
        if (index == 0) {
            width = value
        }

        if (index == 1) {
            height = value
        }
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    private fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
        val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
        setupLayout(parentView)

        omhMapFragment = OmhMapFragment()
        val activity = reactContext.currentActivity as FragmentActivity
        activity.supportFragmentManager
            .beginTransaction()
            .replace(reactNativeViewId, omhMapFragment, reactNativeViewId.toString())
            .commit()
    }

    private fun setupLayout(view: View) {
        frameCallback = Choreographer.FrameCallback {
            manuallyLayoutChildren(view)
            view.getViewTreeObserver().dispatchOnGlobalLayout()
            Choreographer.getInstance().postFrameCallback(frameCallback)
        }
        Choreographer.getInstance().postFrameCallback(frameCallback)
    }

    /**
     * Layout children manually - required
     */
    private fun manuallyLayoutChildren(view: View) {
        if (width == null || height == null) {
            //  if no size specified by RN, take the whole screen
            val windowManager: WindowManager =
                reactContext.getSystemService(Context.WINDOW_SERVICE) as WindowManager

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                val metrics = windowManager.currentWindowMetrics
                width = metrics.bounds.width()
                height = metrics.bounds.height()
            } else {
                val size = Point()
                windowManager.defaultDisplay.getSize(size)
                width = size.x
                height = size.y
            }

            view.measure(
                View.MeasureSpec.makeMeasureSpec(width!!, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height!!, View.MeasureSpec.EXACTLY)
            )
        } else {
            //  if size specified by RN, take exactly it
            view.measure(
                View.MeasureSpec.makeMeasureSpec(width!!, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height!!, View.MeasureSpec.EXACTLY)
            )
        }

        view.layout(0, 0, view.measuredWidth, view.measuredHeight)
    }

    override fun onMapReady(omhMap: OmhMap) {
        this.omhMap = omhMap
        Choreographer.getInstance().postFrameCallback(frameCallback)
    }
}
