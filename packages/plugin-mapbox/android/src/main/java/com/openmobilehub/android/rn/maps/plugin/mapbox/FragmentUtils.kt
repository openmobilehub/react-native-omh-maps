package com.openmobilehub.android.rn.maps.plugin.mapbox

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.fragment.app.FragmentManager
import com.facebook.react.bridge.ReactContext

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
