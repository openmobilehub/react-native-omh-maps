/**
 * React Native OMH Maps Mapbox Plugin
 * @module @omh/react-native-maps-plugin-mapbox
 */

import { MapProvider } from '@omh/react-native-maps-core';

export const OmhMapsMapboxProvider: MapProvider = {
  name: 'Mapbox',
  path: 'com.openmobilehub.android.maps.plugin.mapbox.presentation.OmhMapFactoryImpl',
};

export { default as OmhMapsPluginMapboxModule } from './NativeOmhMapsPluginMapboxModule';
