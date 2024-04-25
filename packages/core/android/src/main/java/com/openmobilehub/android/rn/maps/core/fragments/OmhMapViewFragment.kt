package com.openmobilehub.android.rn.maps.core.fragments

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.UiThreadUtil
import com.openmobilehub.android.maps.core.databinding.FragmentOmhMapBinding
import com.openmobilehub.android.maps.core.factories.OmhMapProvider
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMap
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhMapView
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap

@Suppress("TooManyFunctions")
class OmhMapViewFragment : Fragment() {
  private var _binding: FragmentOmhMapBinding? = null
  internal val binding get() = _binding!!

  private var _savedInstanceState: Bundle? = null

  internal var omhMapView: OmhMapView? = null
  internal var omhMap: OmhMap? = null

  fun requireOmhMap(): OmhMap {
    return omhMap ?: error("OmhMap in OmhMapViewFragment is not available")
  }

  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View {
    _savedInstanceState = savedInstanceState
    _binding = FragmentOmhMapBinding.inflate(inflater, container, false)

    omhMap = null
    omhMapView = context?.let { OmhMapProvider.getInstance().provideOmhMapView(it) }
    omhMapView?.onCreate(_savedInstanceState)

    val mapView = omhMapView?.getView()
    if (mapView != null) {
      binding.frameLayoutMapContainer.addView(mapView)
    }

    return binding.root
  }

  override fun onDestroyView() {
    super.onDestroyView()
    _binding = null
  }

  override fun onDestroy() {
    omhMapView?.onDestroy()
    super.onDestroy()
  }

  override fun onLowMemory() {
    omhMapView?.onLowMemory()
    super.onLowMemory()
  }

  override fun onPause() {
    omhMapView?.onPause()
    super.onPause()
  }

  override fun onResume() {
    super.onResume()
    omhMapView?.onResume()
  }

  override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    omhMapView?.onSaveInstanceState(outState)
  }

  override fun onStart() {
    super.onStart()
    omhMapView?.onStart()
  }

  override fun onStop() {
    omhMapView?.onStop()
    super.onStop()
  }

  companion object {
    const val NAME = "RNOmhMapsCoreView"
  }
}
