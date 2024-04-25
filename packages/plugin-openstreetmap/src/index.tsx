/**
 * React Native OMH Maps OpenStreetMap Plugin
 * @module @omh/react-native-maps-plugin-openstreetmap
 */

import { MapProvider } from '@omh/react-native-maps-core';

export const OmhMapsOpenStreetMapProvider: MapProvider = {
  name: 'OpenStreetMap',
  path: 'com.openmobilehub.android.maps.plugin.openstreetmap.presentation.OmhMapFactoryImpl',
};
