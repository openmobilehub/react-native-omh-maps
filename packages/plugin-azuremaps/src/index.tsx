/**
 * React Native OMH Maps Azure Maps Plugin
 * @module @omh/react-native-maps-plugin-azuremaps
 */

import { MapProvider } from '@omh/react-native-maps-core';

export const OmhMapsAzureMapsProvider: MapProvider = {
  name: 'Azure Maps',
  path: 'com.openmobilehub.android.maps.plugin.azuremaps.presentation.OmhMapFactoryImpl',
};

export { default as OmhMapsPluginAzureMapsModule } from './NativeOmhMapsPluginAzureMapsModule';
