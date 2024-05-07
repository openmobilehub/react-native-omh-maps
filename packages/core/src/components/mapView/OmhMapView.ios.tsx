import React, { forwardRef } from 'react';
import MapView from 'react-native-maps';
import { OmhMapViewProps, OmhMapViewRef } from './OmhMapView.types';

export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  (_props, _forwardedRef) => {
    return <MapView style={{ height: 200, width: 200 }} />;
  }
);
