/**
 * React Native OMH Maps Azure Maps Plugin
 * @module @openmobilehub/maps-plugin-azuremaps
 */

import { OmhMapProvider } from '@openmobilehub/maps-core';

export const OmhMapsAzureMapsProvider: OmhMapProvider = {
  name: 'AzureMaps',
  path: 'com.openmobilehub.android.maps.plugin.azuremaps.presentation.OmhMapFactoryImpl',
};

export { default as OmhMapsPluginAzureMapsModule } from './NativeOmhMapsPluginAzureMapsModule';
