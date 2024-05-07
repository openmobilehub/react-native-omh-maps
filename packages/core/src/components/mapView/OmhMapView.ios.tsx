import React, { forwardRef } from 'react';
import MapView from 'react-native-maps';
import { OmhMapViewProps, OmhMapViewRef } from './OmhMapView.types';
import { mergeStyles } from '../../utils/styleHelpers';

export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  ({ style }, _forwardedRef) => {
    const mergedStyles = mergeStyles(style);
    const { width, height, ...restStyles } = mergedStyles || {};

    return (
      <MapView
        style={[
          { height: height || '100%', width: width || '100%' },
          restStyles,
        ]}
      />
    );
  }
);
