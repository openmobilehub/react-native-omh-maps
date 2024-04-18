package com.openmobilehub.android.rn.maps.core.fragments

import android.os.Bundle
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
import com.openmobilehub.android.maps.core.presentation.interfaces.maps.OmhOnMapReadyCallback

@Suppress("TooManyFunctions")
class OmhMapViewFragment : Fragment(), OmhOnMapReadyCallback {
    private var _binding: FragmentOmhMapBinding? = null
    private val binding get() = _binding!!

    private var omhMapView: OmhMapView? = null
    private var omhMap: OmhMap? = null

    interface MapEventsListener {
        fun onMapReady()
    }

    private var mListener: MapEventsListener? = null

    fun setOnMapReadyListener(listener: MapEventsListener?) {
        mListener = listener
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        omhMapView = context?.let { OmhMapProvider.getInstance().provideOmhMapView(it) }
        omhMapView?.onCreate(savedInstanceState)
        _binding = FragmentOmhMapBinding.inflate(inflater, container, false)
        val mapView = omhMapView?.getView()
        if (mapView != null) {
            binding.frameLayoutMapContainer.addView(mapView)
        }
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        omhMapView?.getMapAsync(this)
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

    fun getCameraPositionCoordinate(promise: Promise) {
        UiThreadUtil.runOnUiThread {
            val coords = omhMap?.getCameraPositionCoordinate()
            promise.resolve(coords.toString())
        }
    }

    fun setZoomEnabled(value: Boolean) {
        omhMap?.setZoomGesturesEnabled(value)
    }

    companion object {
        const val NAME = "RNOmhMapsCoreView"
    }

    override fun onMapReady(omhMap: OmhMap) {
        this.omhMap = omhMap
        mListener?.onMapReady()
    }
}
