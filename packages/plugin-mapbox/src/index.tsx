/**
 * React Native OMH Maps Mapbox Plugin
 * @module @openmobilehub/maps-plugin-mapbox
 */

import { OmhMapProvider } from '@openmobilehub/maps-core';

export const OmhMapsMapboxProvider: OmhMapProvider = {
  name: 'Mapbox',
  path: 'com.openmobilehub.android.maps.plugin.mapbox.presentation.OmhMapFactoryImpl',
};

export { OmhMapsPluginMapboxModule } from './OmhMapsPluginMapboxModule';
