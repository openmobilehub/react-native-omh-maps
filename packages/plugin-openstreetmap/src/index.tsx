/**
 * React Native OMH Maps OpenStreetMap Plugin
 * @module @openmobilehub/maps-plugin-openstreetmap
 */

import { OmhMapProvider } from '@openmobilehub/maps-core';

export const OmhMapsOpenStreetMapProvider: OmhMapProvider = {
  name: 'OpenStreetMap',
  path: 'com.openmobilehub.android.maps.plugin.openstreetmap.presentation.OmhMapFactoryImpl',
};

export { default as OmhMapsPluginOpenstreetmapModule } from './NativeOmhMapsPluginOpenstreetmapModule';
