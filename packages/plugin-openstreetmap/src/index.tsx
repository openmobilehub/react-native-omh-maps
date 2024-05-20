/**
 * React Native OMH Maps OpenStreetMap Plugin
 * @module @omh/react-native-maps-plugin-openstreetmap
 */

import { OmhMapProvider } from '@omh/react-native-maps-core';

export const OmhMapsOpenStreetMapProvider: OmhMapProvider = {
  name: 'OpenStreetMap',
  path: 'com.openmobilehub.android.maps.plugin.openstreetmap.presentation.OmhMapFactoryImpl',
};

export { default as OmhMapsPluginOpenstreetmapModule } from './NativeOmhMapsPluginOpenstreetmapModule';
