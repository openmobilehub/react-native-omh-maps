package com.openmobilehub.android.rn.maps.core.viewmanagers

import android.content.Context
import android.graphics.Point
import android.os.Build
import android.util.Log
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
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.utils.MapProvidersUtils
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity
import com.openmobilehub.android.rn.maps.core.events.OnOmhMapReadyEvent
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils
import com.openmobilehub.android.rn.maps.core.fragments.OmhMapViewFragment

class RNOmhMapsCoreViewManagerImpl(private val reactContext: ReactContext) {
    var height: Int? = null
    var width: Int? = null
    private var lastGmsPath: String? = null
    private var lastNonGmsPath: String? = null
    private var mountedChildren = HashMap<Int, OmhMapEntity<*>>()
    private var addEntitiesQueue = mutableListOf<Pair<View, Int>>()

    fun createViewInstance(reactContext: ThemedReactContext): FragmentContainerView {
        return FragmentContainerView(reactContext)
    }

    private fun getFragmentOrThrow(parent: FragmentContainerView): OmhMapViewFragment {
        return FragmentUtils.findFragment(reactContext, parent.id)
            ?: error(ERRORS.MAP_FRAGMENT_NOT_FOUND)
    }

    private fun getMapOrThrow(parent: FragmentContainerView): OmhMap {
        return getFragmentOrThrow(parent).omhMap ?: error(ERRORS.MAP_INSTANCE_NOT_AVAILABLE)
    }

    private fun getMapOrThrow(fragment: OmhMapViewFragment): OmhMap {
        return fragment.omhMap ?: error(ERRORS.MAP_INSTANCE_NOT_AVAILABLE)
    }

    fun getChildAt(index: Int): OmhMapEntity<*> {
        return mountedChildren[index]!!
    }

    fun addView(
        parent: FragmentContainerView,
        child: View,
        index: Int,
        entityComesFromQueue: Boolean = false
    ) {
        try {
            val fragment = getFragmentOrThrow(parent)
            val omhMap = getMapOrThrow(fragment)

            var addToRegistry = true

            when (child) {
                is OmhMapEntity<*> -> {
                    // TODO: handle index - set zIndex
                    child.mountEntity(omhMap)
                }

                else -> {
                    addToRegistry = false

                    Log.w(
                        NAME,
                        "${ERRORS.UNSUPPORTED_CHILD_VIEW_TYPE}: ${child.javaClass.simpleName}"
                    )
                }
            }

            if (addToRegistry) {
                mountedChildren[index] = child as OmhMapEntity<*>
            }
        } catch (@Suppress("SwallowedException") e: IllegalStateException) {
            if (entityComesFromQueue) {
                throw e
            } else {
                addEntitiesQueue.add(Pair(child, index))
            }
        }
    }

    fun removeViewAt(parent: FragmentContainerView, index: Int) {
        getMapOrThrow(parent) // ensure the map is mounted

        val child = mountedChildren[index] ?: error(ERRORS.REMOVE_VIEW_AT_CHILD_NOT_FOUND)

        child.unmountEntity()

        mountedChildren.remove(index)
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

            val defaultProvider = MapProvidersUtils().getDefaultMapProvider(reactContext)
            lastGmsPath = defaultProvider.path
            lastNonGmsPath = defaultProvider.path

            val newFragment = OmhMapViewFragment(defaultProvider.path)
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
                addEntitiesQueue.forEach { (child, index) ->
                    addView(view, child, index, entityComesFromQueue = true)
                }
                addEntitiesQueue.clear()

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
        val gmsPath = paths?.getString("gmsPath")
        val nonGmsPath = paths?.getString("nonGmsPath")

        if (lastGmsPath != gmsPath || lastNonGmsPath != nonGmsPath) {
            OmhMapProvider.Initiator()
                .addGmsPath(gmsPath)
                .addNonGmsPath(nonGmsPath)
                .initialize()

            FragmentUtils.findFragment(view)?.reinitializeFragmentContents()
            // after the map is reinitialized, no entities will be present and they won't be added
            // since the RN component tree has not changed; thus, here the current entites are stored for re-addition
            mountedChildren.forEach { (index, entity) ->
                addView(view, entity, index)
            }

            layoutChildren(view)

            lastGmsPath = gmsPath
            lastNonGmsPath = nonGmsPath
        }
    }

    companion object {
        const val NAME = OmhMapViewFragment.NAME

        val EVENTS: MutableMap<String, Any> =
            MapBuilder.of(
                OnOmhMapReadyEvent.NAME,
                MapBuilder.of("registrationName", OnOmhMapReadyEvent.EVENT_PROP_NAME),
            )

        object ERRORS {
            const val MAP_INSTANCE_NOT_AVAILABLE =
                "RN-managed OmhMap instance not available. Did you wait for the map to become ready?"

            const val MAP_FRAGMENT_NOT_FOUND =
                "RN-managed OmhMap fragment not found. Did you wait for the map to mount?"

            const val UNSUPPORTED_CHILD_VIEW_TYPE =
                "Unsupported child view type mounted inside RN OmhMap"

            const val REMOVE_VIEW_AT_CHILD_NOT_FOUND =
                "Child to be removed via removeViewAt() not found in mounted children registry"
        }
    }
}
