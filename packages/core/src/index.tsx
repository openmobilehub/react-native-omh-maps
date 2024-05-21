/**
 * React Native OMH Maps Core Package
 * @module @openmobilehub/maps-core
 */

export * from './components/mapView/OmhMapView';
export * from './components/mapView/OmhMapView.types';

export * from './components/marker/OmhMarker';
export * from './components/marker/OmhMarker.types';
export * from './components/marker/OmhMarkerConstants';

export * from './components/infoWindow/OmhInfoWindowConstants';

export * from './components/polyline/OmhPolyline';
export * from './components/polyline/OmhPolyline.types';

export * from './components/polygon/OmhPolygon';
export * from './components/polygon/OmhPolygon.types';

export * from './modules/core/OmhMapsModule';
export * from './modules/core/OmhMapsModule.types';

export * from './modules/location/OmhMapsLocationModule';

export * from './types/common';

import './types.d.ts'; // provides react-native resolveAssetSource typings to consumers of the library
