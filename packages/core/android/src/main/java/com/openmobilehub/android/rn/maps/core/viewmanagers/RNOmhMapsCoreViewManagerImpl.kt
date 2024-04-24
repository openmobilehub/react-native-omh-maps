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
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.rn.maps.core.BuildConfig
import com.openmobilehub.android.rn.maps.core.entities.OmhMapEntity
import com.openmobilehub.android.rn.maps.core.events.OmhOnCameraIdleEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnCameraMoveStartedEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMapLoadedEvent
import com.openmobilehub.android.rn.maps.core.events.OmhOnMapReadyEvent
import com.openmobilehub.android.rn.maps.core.fragments.FragmentUtils
import com.openmobilehub.android.rn.maps.core.fragments.OmhMapViewFragment

class RNOmhMapsCoreViewManagerImpl(private val reactContext: ReactContext) {
  var height: Int? = null
  var width: Int? = null
  private var mountedChildren = HashMap<Int, OmhMapEntity<*>>()
  private var addEntitiesQueue = mutableListOf<Pair<View, Int>>()

  fun createViewInstance(reactContext: ThemedReactContext): FragmentContainerView {
    return FragmentContainerView(reactContext)
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

  fun onReactViewReady(reactContext: ThemedReactContext, view: FragmentContainerView) {
    mountFragment(view)

    val fragment = FragmentUtils.findFragment(reactContext, view.id)
    val omhMapView = fragment?.omhMapView

    omhMapView?.getMapAsync {
      fragment.omhMap = it

//      setupListeners(it, reactContext, view)

      dispatchEvent(
        reactContext,
        view.id,
        OmhOnMapReadyEvent(
          UIManagerHelper.getSurfaceId(reactContext),
          view.id
        ), 250L
      )
    }
  }

  private fun <T : Event<*>?> dispatchEvent(
    reactContext: ThemedReactContext,
    viewId: Int,
    event: Event<T>,
    delay: Long = 0L
  ) {

    val runnable = Runnable {
      Log.v("MBX", "dispatchEvent: ${event}")
      val dispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewId)
      dispatcher?.dispatchEvent(
        event
      )
    }

    UiThreadUtil.runOnUiThread(runnable, 0)
  }

  private fun setupListeners(
    omhMap: OmhMap,
    reactContext: ThemedReactContext,
    view: FragmentContainerView
  ) {
    omhMap.setOnMapLoadedCallback {
      dispatchEvent(
        reactContext,
        view.id,
        OmhOnMapLoadedEvent(
          UIManagerHelper.getSurfaceId(reactContext),
          view.id
        ),
        250L
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
  }

  fun setZoomEnabled(view: FragmentContainerView, value: Boolean) {
    FragmentUtils.findFragment(view)?.omhMap?.setZoomGesturesEnabled(value)
  }

  fun setRotateEnabled(view: FragmentContainerView, value: Boolean) {
    val omhMap = FragmentUtils.findFragment(view)?.omhMap
    omhMap?.setRotateGesturesEnabled(value)
  }

  companion object {
    const val NAME = OmhMapViewFragment.NAME

    val EVENTS: MutableMap<String, Any> =
      MapBuilder.of(
        OmhOnMapReadyEvent.NAME,
        MapBuilder.of("registrationName", OmhOnMapReadyEvent.EVENT_PROP_NAME),
        OmhOnMapLoadedEvent.NAME,
        MapBuilder.of("registrationName", OmhOnMapLoadedEvent.EVENT_PROP_NAME),
        OmhOnCameraIdleEvent.NAME,
        MapBuilder.of("registrationName", OmhOnCameraIdleEvent.EVENT_PROP_NAME),
        OmhOnCameraMoveStartedEvent.NAME,
        MapBuilder.of("registrationName", OmhOnCameraMoveStartedEvent.EVENT_PROP_NAME),
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

      const val CHILD_NOT_FOUND = "Child not found"
    }
  }
}
