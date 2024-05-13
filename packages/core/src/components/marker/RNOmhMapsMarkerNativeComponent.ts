import type { HostComponent, ViewProps } from 'react-native';
import {
  DirectEventHandler,
  Double,
  Float,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type NativeOmhCoordinate = {
  latitude: Double;
  longitude: Double;
};

export type Anchor = {
  u: Float;
  v: Float;
};

export type NativePositionEventData = {
  position: {
    latitude: Double;
    longitude: Double;
  };
};

/**
 * Properties for the OmhMarker component.
 */
export interface NativeOmhMarkerProps extends ViewProps {
  markerPosition: NativeOmhCoordinate;
  title?: string;
  clickable?: boolean;
  draggable?: boolean;
  anchor?: Anchor;
  infoWindowAnchor?: Anchor;
  alpha?: Float;
  snippet?: string;
  isVisible?: boolean;
  isFlat?: boolean;
  rotation?: Float;
  backgroundColor?: Double; // note: Int32 is too small, there is no Int64, so Double is used
  showInfoWindow?: boolean;
  markerZIndex?: Float; // note: the name is not just zIndex, since this somehow collides with RN's property and fails to compile
  icon?: {
    uri?: string;
    width?: Int32;
    height?: Int32;
  };
  consumeMarkerClicks?: boolean;
  onMarkerPress?: DirectEventHandler<NativePositionEventData>;
  onDragStart?: DirectEventHandler<NativePositionEventData>;
  onDrag?: DirectEventHandler<NativePositionEventData>;
  onDragEnd?: DirectEventHandler<NativePositionEventData>;
  onInfoWindowPress: DirectEventHandler<NativePositionEventData>;
  onInfoWindowLongPress: DirectEventHandler<NativePositionEventData>;
  onInfoWindowClose: DirectEventHandler<{}>;
  onInfoWindowOpen: DirectEventHandler<{}>;
}

export type RNOmhMapsMarkerNativeComponent =
  HostComponent<NativeOmhMarkerProps>;

export default codegenNativeComponent<NativeOmhMarkerProps>(
  'RNOmhMapsMarkerView',
  {
    excludedPlatforms: ['iOS'],
  }
) as RNOmhMapsMarkerNativeComponent;
