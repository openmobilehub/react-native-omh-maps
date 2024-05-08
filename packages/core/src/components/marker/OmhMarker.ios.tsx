import React from 'react';
import { Marker } from 'react-native-maps';
import { OmhMarkerProps } from './OmhMarker.types';

/**
 * The OMH Marker component.
 */
export const OmhMarker = ({ position }: OmhMarkerProps) => {
  //TODO: Implement OmhMarker for iOS
  return <Marker coordinate={position} />;
};
