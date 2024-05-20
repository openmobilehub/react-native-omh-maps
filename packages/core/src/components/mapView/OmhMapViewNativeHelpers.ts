import NativeOmhMapsCoreModule from '../../modules/core/NativeOmhMapsCoreModule';
import React, { useEffect } from 'react';
import { NativeOmhMapViewComponent } from './RNOmhMapsCoreViewNativeComponent';
import { getViewRefHandle } from './OmhMapViewHelpers';

export const tweakCompass = (
  nativeComponentRef: React.MutableRefObject<NativeOmhMapViewComponent | null>
) => {
  try {
    const viewRef = getViewRefHandle(nativeComponentRef, true);
    const providerName = NativeOmhMapsCoreModule.getProviderName(viewRef);

    if (providerName === 'Mapbox') {
      const mapboxPlugin = require('@omh/react-native-maps-plugin-mapbox');
      mapboxPlugin.OmhMapsPluginMapboxModule.tweakCompass(viewRef);
    }
  } catch (error) {
    console.error(error);
  }
};

const relayoutMapView = (
  nativeComponentRef: React.MutableRefObject<NativeOmhMapViewComponent | null>
) => {
  try {
    const viewRef = getViewRefHandle(nativeComponentRef, true);
    const providerName = NativeOmhMapsCoreModule.getProviderName(viewRef);

    if (providerName === 'Mapbox') {
      const mapboxPlugin = require('@omh/react-native-maps-plugin-mapbox');
      mapboxPlugin.OmhMapsPluginMapboxModule.relayoutMapView(viewRef);
    }

    if (providerName === 'AzureMaps') {
      const azureMapsPlugin = require('@omh/react-native-maps-plugin-azuremaps');
      azureMapsPlugin.OmhMapsPluginAzureMapsModule.relayoutMapView(viewRef);
    }
  } catch (error) {
    console.error(error);
  }
};

export const useMyLocationIconFix = (
  nativeComponentRef: React.MutableRefObject<NativeOmhMapViewComponent | null>,
  isMapReady: boolean,
  myLocationEnabled?: boolean
) => {
  useEffect(() => {
    if (isMapReady && myLocationEnabled) {
      relayoutMapView(nativeComponentRef);
    }
  }, [isMapReady, myLocationEnabled, nativeComponentRef]);
};
