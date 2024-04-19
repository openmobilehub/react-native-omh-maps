package com.openmobilehub.android.rn.maps.core.viewmanagers

import android.content.Context
import android.graphics.Point
import android.os.Build
import android.view.View
import android.view.WindowManager
import androidx.fragment.app.FragmentContainerView
import com.facebook.react.bridge.Dynamic
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.openmobilehub.android.maps.core.factories.OmhMapProvider
import com.openmobilehub.android.maps.core.utils.MapProvidersUtils
import com.openmobilehub.android.rn.maps.core.events.OnOmhMapReadyEvent
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils
import com.openmobilehub.android.rn.maps.core.fragments.OmhMapViewFragment

class RNOmhMapsCoreViewManagerImpl(private val reactContext: ReactContext) {
    var height: Int? = null
    var width: Int? = null

    fun createViewInstance(reactContext: ThemedReactContext): FragmentContainerView {
        return FragmentContainerView(reactContext)
    }

    fun unmountFragment(view: FragmentContainerView) {
        UiThreadUtil.assertOnUiThread()
        val fragmentManager = FragmentUtils.getFragmentManager(view)

        if (fragmentManager != null) {
            val fragment = FragmentUtils.findFragment(view)

            if (fragment != null) {
                val transaction = fragmentManager.beginTransaction()
                transaction.remove(fragment)
                transaction.commitNowAllowingStateLoss()
            }
        }
    }

    fun mountFragment(view: FragmentContainerView) {
        UiThreadUtil.assertOnUiThread()
        val fragmentManager = FragmentUtils.getFragmentManager(view)

        if (fragmentManager != null) {
            val fragment = FragmentUtils.findFragment(view)

            if (fragment != null) {
                view.post {
                    layoutChildren(view)
                }
                return
            }

            val defaultProviderPath = MapProvidersUtils().getDefaultMapProvider(reactContext).path
            val newFragment = OmhMapViewFragment(defaultProviderPath)
            view.removeAllViews()
            val transaction = fragmentManager.beginTransaction()
            transaction.add(newFragment, FragmentUtils.getFragmentTag(view.id))
            transaction.runOnCommit {
                view.addView(newFragment.requireView())
                layoutChildren(view)
            }
            transaction.commitNowAllowingStateLoss()
        }
    }

    private fun layoutChildren(view: View) {
        if (width == null || height == null) {
            //  if no size specified by RN, take the whole screen
            val windowManager: WindowManager =
                reactContext.getSystemService(Context.WINDOW_SERVICE) as WindowManager

            val (calcWidth, calcHeight) = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                val metrics = windowManager.currentWindowMetrics

                Pair(metrics.bounds.width(), metrics.bounds.height())
            } else {
                val size = Point()
                windowManager.defaultDisplay.getSize(size)

                Pair(size.x, size.y)
            }

            view.measure(
                View.MeasureSpec.makeMeasureSpec(calcWidth, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(calcHeight, View.MeasureSpec.EXACTLY)
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

    fun setStyle(view: FragmentContainerView, index: Int, value: Dynamic?) {
        if (value == null) {
            return
        }

        if (index == 0) {
            width = value.asInt()
        }

        if (index == 1) {
            height = value.asInt()
        }

        view.post {
            layoutChildren(view)
        }
    }

    fun addEventEmitters(reactContext: ThemedReactContext, view: FragmentContainerView) {
        val viewID = view.id

        FragmentUtils.findFragment(reactContext, viewID)?.setOnMapReadyListener(object :
            OmhMapViewFragment.OnMapReadyListener {
            override fun onMapReady() {
                UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewID)
                    ?.dispatchEvent(
                        OnOmhMapReadyEvent(
                            UIManagerHelper.getSurfaceId(reactContext),
                            viewID
                        )
                    )
            }
        })
    }

    fun setZoomEnabled(view: FragmentContainerView, value: Boolean) {
        FragmentUtils.findFragment(view)?.setZoomEnabled(value)
    }

    fun setPaths(view: FragmentContainerView, paths: ReadableMap?) {
        OmhMapProvider.Initiator()
            .addGmsPath(paths?.getString("gmsPath"))
            .addNonGmsPath(paths?.getString("nonGmsPath"))
            .initialize()

        FragmentUtils.findFragment(view)?.reinitializeFragmentContents()
    }

    companion object {
        const val NAME = OmhMapViewFragment.NAME

        val EVENTS: MutableMap<String, Any> =
            MapBuilder.of(
                OnOmhMapReadyEvent.NAME,
                MapBuilder.of("registrationName", OnOmhMapReadyEvent.EVENT_PROP_NAME),
            )
    }
}
