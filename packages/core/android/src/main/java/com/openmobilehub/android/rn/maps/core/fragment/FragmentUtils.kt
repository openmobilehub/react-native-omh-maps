package com.openmobilehub.android.rn.maps.core.fragment

import android.view.View
import androidx.fragment.app.FragmentActivity
import androidx.fragment.app.FragmentManager
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.ThemedReactContext

object FragmentUtils {
    fun findFragment(context: ReactContext, viewId: Int): OmhMapViewFragment? {
        val fragmentManager = getFragmentManager(context)

        return fragmentManager?.findFragmentByTag(getFragmentTag(viewId)) as? OmhMapViewFragment
    }

    fun findFragment(view: View): OmhMapViewFragment? {
        val fragmentManager = getFragmentManager(view.context as ThemedReactContext)

        return fragmentManager?.findFragmentByTag(getFragmentTag(view.id)) as? OmhMapViewFragment
    }


    private fun getFragmentManager(context: ReactContext): FragmentManager? {
        val activity = context.currentActivity as? FragmentActivity ?: return null

        return activity.supportFragmentManager
    }

    fun getFragmentManager(view: View): FragmentManager? {
        val activity =
            (view.context as ThemedReactContext).currentActivity as? FragmentActivity ?: return null

        return activity.supportFragmentManager
    }

    fun getFragmentTag(viewId: Int): String {
        return "OmhMapViewFragment-$viewId"
    }
}
