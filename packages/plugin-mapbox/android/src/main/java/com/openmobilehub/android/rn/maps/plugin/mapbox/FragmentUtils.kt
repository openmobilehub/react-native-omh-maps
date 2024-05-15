package com.openmobilehub.android.rn.maps.plugin.mapbox

import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.fragment.app.FragmentContainerView
import androidx.fragment.app.FragmentManager
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.ThemedReactContext

object FragmentUtils {
  private fun findFragment(context: ReactContext, viewId: Int): Fragment? {
    val fragmentManager = getFragmentManager(context)
    return fragmentManager?.findFragmentByTag(getFragmentTag(viewId))
  }

  fun requireFragment(context: ReactContext, viewId: Int): Fragment {
    return findFragment(context, viewId) ?: error("Fragment not found")
  }

  private fun getFragmentManager(context: ReactContext): FragmentManager? {
    val activity = context.currentActivity as? FragmentActivity ?: return null

    return activity.supportFragmentManager
  }

  private fun getFragmentTag(viewId: Int): String {
    return "OmhMapViewFragment-$viewId"
  }
}
