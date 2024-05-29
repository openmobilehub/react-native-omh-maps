import NativeOmhMapsCoreModule from '../../modules/core/NativeOmhMapsCoreModule';
import React from 'react';
import { NativeOmhMapViewComponent } from './RNOmhMapsCoreViewNativeComponent';
import { getViewRefHandle } from './OmhMapViewHelpers';

export const tweakCompass = async (
  nativeComponentRef: React.MutableRefObject<NativeOmhMapViewComponent | null>
) => {
  try {
    const viewRef = getViewRefHandle(nativeComponentRef, true);
    const providerName = NativeOmhMapsCoreModule.getProviderName(viewRef);

    if (providerName === 'Mapbox') {
      const mapboxPlugin =
        await require('../../utils/optionalPlugins/optionalMapboxPlugin').getPlugin();
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
  async () => {
    if (!nativeComponentRef) return;

    const viewRef = getViewRefHandle(nativeComponentRef, false);
    if (!viewRef) return;

    if (providerName === 'OpenStreetMap') {
      const osmPlugin =
        await require('../../utils/optionalPlugins/optionalOpenstreetmapPlugin').getPlugin();
      osmPlugin.OmhMapsPluginOpenstreetmapModule.relayoutMapView(viewRef);
    }
  };
