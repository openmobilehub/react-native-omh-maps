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
import com.openmobilehub.android.maps.core.presentation.models.OmhCoordinate
import com.openmobilehub.android.rn.maps.core.extensions.toWritableMap

@Suppress("TooManyFunctions")
class OmhMapViewFragment(private var defaultProviderPath: String) :
    Fragment(), OmhOnMapReadyCallback {
    private var _binding: FragmentOmhMapBinding? = null
    private val binding get() = _binding!!

    private var _savedInstanceState: Bundle? = null

    private var omhMapView: OmhMapView? = null
    internal var omhMap: OmhMap? = null

    fun interface OnMapReadyListener {
        fun onMapReady()
    }

    private var mListener: OnMapReadyListener? = null

    fun setOnMapReadyListener(listener: OnMapReadyListener?) {
        mListener = listener
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _savedInstanceState = savedInstanceState
        _binding = FragmentOmhMapBinding.inflate(inflater, container, false)

        OmhMapProvider.Initiator()
            .addGmsPath(defaultProviderPath)
            .addNonGmsPath(defaultProviderPath)
            .initialize()
        reinitializeFragmentContents()

        return binding.root
    }

    fun reinitializeFragmentContents() {
        val wasOmhMapInitialized = omhMapView != null
        if (wasOmhMapInitialized) {
            binding.frameLayoutMapContainer.removeAllViews()
        }

        omhMap = null
        omhMapView = context?.let { OmhMapProvider.getInstance().provideOmhMapView(it) }
        omhMapView?.onCreate(_savedInstanceState)

        val mapView = omhMapView?.getView()
        if (mapView != null) {
            binding.frameLayoutMapContainer.addView(mapView)
        }

        if (wasOmhMapInitialized) {
            // only run this from here if the map was already initialized
            // in case this is run from onCreate(), getMapAsync will be called in onViewCreated()
            omhMapView?.getMapAsync(this)
        }
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
            promise.resolve(coords?.toWritableMap())
        }
    }

    fun setCameraPositionCoordinate(coordinate: OmhCoordinate, zoomLevel: Float, promise: Promise) {
        UiThreadUtil.runOnUiThread {
            omhMap?.moveCamera(coordinate, zoomLevel)
            promise.resolve(null)
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
