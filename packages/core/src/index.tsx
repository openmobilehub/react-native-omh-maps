/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * React Native OMH Maps Core Plugin
 * @module @omh/react-native-maps-core
 */

import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
  NativeSyntheticEvent,
  ColorValue,
  ImageRequireSource,
  ImageURISource,
} from 'react-native';

const LINKING_ERROR =
  `The package @omh/react-native-maps-core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ReactNativeOmhMapsCoreProps = {
  color: OmhColor;
  style: ViewStyle;
  scaleFactor: number;
  mapStyle: OmhMapStyle;
  rotateEnabled: boolean;
  zoomEnabled: boolean;
  myLocationEnabled: boolean;
  // events
  onMyLocationButtonPress: (event?: NativeSyntheticEvent<{}>) => void;
  onMapReady: (event?: NativeSyntheticEvent<{}>) => void;
};

// Common types

type OmhMapStyle = any;

type OmhCoordinate = {
  latitude: number;
  longitude: number;
};

type OmhCommonSpan = {
  segments: number;
  stamp?: OmhIcon;
};

type OmhMonochromaticSpan = {
  type: 'monochromatic';
  color: OmhColor;
};

type OmhGradientSpan = {
  type: 'gradient';
  fromColor: OmhColor;
  toColor: OmhColor;
};

type OmhSpan = OmhCommonSpan & (OmhMonochromaticSpan | OmhGradientSpan);

type OmhPoint = {
  x: number;
  y: number;
};

type OmhColor = ColorValue;

type OmhIcon = ImageURISource | ImageRequireSource;

type OmhLineJoin = 'miter' | 'round' | 'bevel';
type OmhCap = 'butt' | 'round' | 'square' | 'custom';
type OmhPatternVariant = 'gap' | 'dash' | 'dot';

type OmhPatternItem = {
  variant: OmhPatternVariant;
  length: number;
};

type OmhTag = any;

type OmhCameraMoveStartedReason =
  | 'gesture'
  | 'apiAnimation'
  | 'developerAnimation';

// Polygon
type OmhPolylineProperties = {
  cap?: OmhCap;
  customCap?: OmhIcon;
  clickable?: boolean;
  color?: number;
  endCap?: OmhCap;
  jointType?: number;
  pattern?: OmhPatternItem[];
  points?: OmhCoordinate[];
  spans?: OmhSpan[];
  startCap?: OmhCap;
  tag?: OmhTag;
  visible?: boolean;
  width?: number;
  zIndex?: number;
};

type PolygonPressEvent = OmhEvent<{
  omhPolygonProperties: OmhPolygonProperties;
}>;

type OmhPolygonEvents = {
  onPress: (event: PolygonPressEvent) => void;
};

type OmhPolygonComponentProps = OmhPolylineProperties & OmhPolygonEvents;

// Polyline
type OmhPolygonProperties = {
  outline: OmhCoordinate[];
  clickable?: boolean;
  fillColor?: number;
  holes?: OmhCoordinate[][];
  tag?: OmhTag;
  strokeColor?: OmhColor;
  strokeJointType?: OmhLineJoin;
  strokePattern?: OmhPatternItem[];
  strokeWidth?: number;
  visible?: boolean;
  zIndex?: number;
};

type PolylinePressEvent = OmhEvent<{
  omhPolylineProperties: OmhPolylineProperties;
}>;

type OmhPolylineEvents = {
  onPress: (event: PolylinePressEvent) => void;
};

type OmhPolylineComponentProps = OmhPolylineProperties & OmhPolylineEvents;

// Marker
type OmhMarkerProperties = {
  position: OmhCoordinate;
  title?: string;
  clickable?: boolean;
  draggable?: boolean;
  anchor?: OmhPoint;
  infoWindowAnchor?: number;
  alpha?: number;
  snippet?: string;
  icon?: OmhIcon;
  isVisible?: boolean;
  isFlat?: boolean;
  rotation?: number;
  backgroundColor?: OmhColor;
};

type MarkerPressEvent = OmhEvent<{ omhMarkerProperties: OmhMarkerProperties }>;

type OmhMarkerEvents = {
  onPress: (event: MarkerPressEvent) => void;
};

type OmhMarkerComponentProps = OmhMarkerProperties & OmhMarkerEvents;

type OmhMapProperties = {
  color: OmhColor;
  style: ViewStyle;
  scaleFactor: number;
  mapStyle: OmhMapStyle;
  rotateEnabled: boolean;
  zoomEnabled: boolean;
  myLocationEnabled: boolean;
};

type OmhEvent<T> = NativeSyntheticEvent<T>;

type MyLocationButtonPressEvent = OmhEvent<{}>;
type MapLoadedEvent = OmhEvent<{}>;
type CameraIdleEvent = OmhEvent<{}>;
type CameraMoveStartedEvent = OmhEvent<{ reason: OmhCameraMoveStartedReason }>;

type OmhMapEvents = {
  onMapLoaded: (event: MapLoadedEvent) => void;
  onMyLocationButtonPress: (event: MyLocationButtonPressEvent) => void;
  onCameraIdle: (event: CameraIdleEvent) => void;
  onCameraMoveStarted: (event: CameraMoveStartedEvent) => void;
};

const ComponentName = 'ReactNativeOmhMapsCoreView';

/**
 * The root map view component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const ReactNativeOmhMapsCoreView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeOmhMapsCoreProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
