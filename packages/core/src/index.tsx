/**
 * React Native OMH Maps Core Package
 * @module @omh/react-native-maps-core
 */

export * from './components/mapView/OmhMapView';
export {
  default as OmhMapView,
  OmhCameraMoveStartedReason,
} from './components/mapView/OmhMapView';

export * from './NativeOmhMapsCoreModule';
export { default as OmhMapsModule } from './NativeOmhMapsCoreModule';

export * from './components/marker/OmhMarkerConstants';
export * from './components/marker/OmhMarker';

export * from './components/polyline/OmhPolyline';

export {
  OmhMapProviderVariant,
  OmhLineJoin,
  OmhPatternVariant,
  OmhPatternItem,
} from './types/common';

import './types.d.ts'; // provides react-native resolveAssetSource typings to consumers of the library
