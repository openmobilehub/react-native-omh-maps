import NativeOmhMapsCoreModule from '../../modules/core/NativeOmhMapsCoreModule';
import React from 'react';
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

export const useOSMMapViewRelayout =
  (
    nativeComponentRef: React.MutableRefObject<NativeOmhMapViewComponent | null> | null,
    providerName: string | null
  ) =>
  () => {
    if (!nativeComponentRef) return;

    const viewRef = getViewRefHandle(nativeComponentRef, false);
    if (!viewRef) return;

    if (providerName === 'OpenStreetMap') {
      const osmPlugin = require('@omh/react-native-maps-plugin-openstreetmap');
      osmPlugin.OmhMapsPluginOpenstreetmapModule.relayoutMapView(viewRef);
    }
  };
