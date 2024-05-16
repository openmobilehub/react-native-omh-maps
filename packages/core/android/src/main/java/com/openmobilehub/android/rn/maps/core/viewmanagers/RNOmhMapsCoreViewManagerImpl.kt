package com.openmobilehub.android.rn.maps.core.viewmanagers

import android.content.Context
import android.graphics.Point
import android.os.Build
import android.util.Log
import android.view.View
import android.view.View.MeasureSpec
import android.view.WindowManager
import androidx.fragment.app.FragmentContainerView
import com.facebook.react.bridge.Dynamic
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMapView
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMarker
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnInfoWindowOpenStatusChangeListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnMarkerDragListener
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPolygon
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhPolyline
import com.openmobilehub.android.rn.maps.core.BuildConfig
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity
import com.openmobilehub.android.rn.maps.core.entities.OmhMarkerEntity
import com.openmobilehub.android.rn.maps.core.entities.OmhPolygonEntity
import com.openmobilehub.android.rn.maps.core.entities.OmhPolylineEntity
import com.openmobilehub.android.rn.maps.core.events.OmhMyLocationButtonPressEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnCameraIdleEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnCameraMoveStartedEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMapLoadedEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMapReadyEvent
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils
import com.openmobilehub.android.rn.maps.core.fragments.OmhMapViewFragment
import com.openmobilehub.android.rn.maps.core.utils.RNComponentUtils.dispatchEvent
import com.openmobilehub.android.rn.maps.core.utils.ViewUtils


@Suppress("TooManyFunctions")
class RNOmhMapsCoreViewManagerImpl(private val reactContext: ReactContext) {

    var height: Int? = null
    var width: Int? = null
    private val mountedChildren = HashMap<Int, OmhMapEntity<*>>()
    private val addEntitiesQueue = mutableListOf<Pair<View, Int>>()
    private val onMapLoadedActionsQueue = mutableListOf<() -> Unit>()
    private var isMounted = false
    private var mapLoaded = false
    private var omhMapView: OmhMapView? = null

    fun createViewInstance(reactContext: ThemedReactContext): FragmentContainerView {
        return FragmentContainerView(reactContext)
    }

    fun onReactViewReady(reactContext: ThemedReactContext, view: FragmentContainerView) {
        mountFragment(view)

        val fragment = FragmentUtils.findFragment(reactContext, view.id)
        omhMapView = fragment?.omhMapView

        omhMapView?.getMapAsync { omhMap ->
            fragment?.omhMap = omhMap

            setupListeners(omhMap, reactContext, view)

            dispatchEvent(
                reactContext,
                view.id,
                OmhOnMapReadyEvent(
                    UIManagerHelper.getSurfaceId(reactContext),
                    view.id
                )
            )
        }
    }

    fun getChildAt(index: Int): OmhMapEntity<*>? {
        return mountedChildren[index]
    }

    fun addView(
        parent: FragmentContainerView,
        child: View,
        index: Int,
        entityComesFromQueue: Boolean = false
    ) {
        try {
            val fragment = FragmentUtils.requireFragment(reactContext, parent)
            val omhMap = fragment.requireOmhMap()

            var addToRegistry = true

            when (child) {
                is OmhMapEntity<*> -> {
                    child.mountEntity(omhMap, child.id)
                    if (mapLoaded) child.handleMapLoaded(omhMap, omhMapView)
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

    fun removeViewAt(index: Int) {
        // note: on old RN architecture, RN unmounts the fragment first, and then the children
        // which causes a NullPointerException when unmountEntity() triggers calls to underlying
        // native entities, which are bound to a non-existent map that has already been unmounted
        if (!isMounted) return

        // note: on old RN architecture, RN tries to unmount the child view
        // at index 0 even when it had never been added, thus the check is omitted in such case
        val child = mountedChildren[index]
            ?: (if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) error(ERRORS.REMOVE_VIEW_AT_CHILD_NOT_FOUND) else null)

        child?.unmountEntity()

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

                isMounted = false
                mapLoaded = false
            }
        }
    }

    private fun mountFragment(view: FragmentContainerView) {
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

            val newFragment = OmhMapViewFragment()
            view.removeAllViews()
            val transaction = fragmentManager.beginTransaction()

            transaction.add(newFragment, FragmentUtils.getFragmentTag(view.id))

            transaction.runOnCommit {
                view.addView(newFragment.requireView())
                layoutChildren(view)
            }
            transaction.commitNowAllowingStateLoss()

            isMounted = true
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
                MeasureSpec.makeMeasureSpec(calcWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(calcHeight, MeasureSpec.EXACTLY)
            )
        } else {
            //  if size specified by RN, take exactly it
            view.measure(
                MeasureSpec.makeMeasureSpec(width!!, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(height!!, MeasureSpec.EXACTLY)
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

    private inline fun <reified E : OmhMapEntity<T>, T> findChildOfType(instance: T): E? {
        return mountedChildren.values.find { it is E && it.getEntity() == instance }
            ?.let { it as E }
    }

    private fun setupListeners(
        omhMap: OmhMap,
        reactContext: ThemedReactContext,
        view: FragmentContainerView
    ) {
        omhMap.setOnMarkerClickListener { clickedOmhMarker ->
            findChildOfType<OmhMarkerEntity, OmhMarker>(clickedOmhMarker)?.onClickListener?.onMarkerClick(
                clickedOmhMarker
            )
                ?: false
        }

        omhMap.setOnMarkerDragListener(object : OmhOnMarkerDragListener {
            override fun onMarkerDragStart(marker: OmhMarker) {
                findChildOfType<OmhMarkerEntity, OmhMarker>(marker)?.onMarkerDragListener?.onMarkerDragStart(
                    marker
                )
                ViewUtils.manuallyLayoutView(omhMap.mapView as View)
            }

            override fun onMarkerDrag(marker: OmhMarker) {
                findChildOfType<OmhMarkerEntity, OmhMarker>(marker)?.onMarkerDragListener?.onMarkerDrag(
                    marker
                )
                ViewUtils.manuallyLayoutView(omhMap.mapView as View)
            }

            override fun onMarkerDragEnd(marker: OmhMarker) {
                findChildOfType<OmhMarkerEntity, OmhMarker>(marker)?.onMarkerDragListener?.onMarkerDragEnd(
                    marker
                )
                ViewUtils.manuallyLayoutView(omhMap.mapView as View)
            }
        })

        omhMap.setOnInfoWindowClickListener { marker ->
            findChildOfType<OmhMarkerEntity, OmhMarker>(marker)?.onInfoWindowClickListener?.onInfoWindowClick(
                marker
            )
        }

        omhMap.setOnInfoWindowLongClickListener { marker ->
            findChildOfType<OmhMarkerEntity, OmhMarker>(marker)?.onInfoWindowLongClickListener?.onInfoWindowLongClick(
                marker
            )
        }

        omhMap.setOnInfoWindowOpenStatusChangeListener(object :
            OmhOnInfoWindowOpenStatusChangeListener {
            override fun onInfoWindowClose(marker: OmhMarker) {
                val entity = findChildOfType<OmhMarkerEntity, OmhMarker>(marker)
                entity?.onInfoWindowOpenStatusChangeListener?.onInfoWindowClose(
                    marker
                )
            }

            override fun onInfoWindowOpen(marker: OmhMarker) {
                val entity = findChildOfType<OmhMarkerEntity, OmhMarker>(marker)
                entity?.onInfoWindowOpenStatusChangeListener?.onInfoWindowOpen(
                    marker
                )
            }

        })

        omhMap.setOnPolylineClickListener { clickedOmhPolyline ->
            findChildOfType<OmhPolylineEntity, OmhPolyline>(clickedOmhPolyline)?.onClickListener?.onPolylineClick(
                clickedOmhPolyline
            )
                ?: false
        }

        omhMap.setOnPolygonClickListener { clickedOmhPolygon ->
            findChildOfType<OmhPolygonEntity, OmhPolygon>(clickedOmhPolygon)?.onClickListener?.onPolygonClick(
                clickedOmhPolygon
            )
                ?: false
        }

        omhMap.setOnMapLoadedCallback {
            mapLoaded = true
            mountedChildren.values.forEach {
                it.handleMapLoaded(omhMap, omhMapView)
            }
            onMapLoadedActionsQueue.forEach {
                it.invoke()
            }
            onMapLoadedActionsQueue.clear()

            dispatchEvent(
                reactContext,
                view.id,
                OmhOnMapLoadedEvent(
                    UIManagerHelper.getSurfaceId(reactContext),
                    view.id
                )
            )
        }
        omhMap.setOnCameraIdleListener {
            dispatchEvent(
                reactContext,
                view.id,
                OmhOnCameraIdleEvent(
                    UIManagerHelper.getSurfaceId(reactContext),
                    view.id
                )
            )
        }
        omhMap.setOnCameraMoveStartedListener {
            dispatchEvent(
                reactContext,
                view.id,
                OmhOnCameraMoveStartedEvent(
                    UIManagerHelper.getSurfaceId(reactContext),
                    view.id,
                    it ?: -1
                )
            )
        }
        omhMap.setMyLocationButtonClickListener {
            dispatchEvent(
                reactContext,
                view.id,
                OmhMyLocationButtonPressEvent(
                    UIManagerHelper.getSurfaceId(reactContext),
                    view.id
                )
            )
            false
        }
    }

    fun setZoomEnabled(view: FragmentContainerView, value: Boolean) {
        FragmentUtils.findFragment(view)?.omhMap?.setZoomGesturesEnabled(value)
    }

    fun setRotateEnabled(view: FragmentContainerView, value: Boolean) {
        val omhMap = FragmentUtils.findFragment(view)?.omhMap
        omhMap?.setRotateGesturesEnabled(value)
    }

    fun setMapStyle(view: FragmentContainerView, value: String?) {
        FragmentUtils.findFragment(view)?.omhMap?.setMapStyle(value)
    }

    private fun queueOnMapLoadedAction(action: () -> Unit) {
        if (mapLoaded) {
            action.invoke()
        } else {
            onMapLoadedActionsQueue.add(action)
        }
    }

    fun setMyLocationEnabled(view: FragmentContainerView, value: Boolean) {
        val omhMap = FragmentUtils.findFragment(view)?.omhMap
        omhMap?.setMyLocationEnabled(value)
    }

    companion object {
        const val NAME = OmhMapViewFragment.NAME

        val EVENTS: Map<String, Any> =
            listOf(
                OmhOnMapReadyEvent,
                OmhOnMapLoadedEvent,
                OmhOnCameraIdleEvent,
                OmhOnCameraMoveStartedEvent,
            ).associateBy(
                { it.NAME },
                { MapBuilder.of("registrationName", it.REGISTRATION_NAME) }
            ).toMap()

        object ERRORS {
            const val UNSUPPORTED_CHILD_VIEW_TYPE =
                "Unsupported child view type mounted inside RN OmhMap"

            const val REMOVE_VIEW_AT_CHILD_NOT_FOUND =
                "Child to be removed via removeViewAt() not found in mounted children registry"

            const val CHILD_NOT_FOUND = "Child not found"
        }
    }
}
