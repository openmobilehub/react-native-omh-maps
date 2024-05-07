import React, { forwardRef } from 'react';
import MapView from 'react-native-maps';
import { OmhMapViewProps, OmhMapViewRef } from './OmhMapView.types';
import { mergeStyles } from '../../utils/styleHelpers';
import { OmhMapsModule } from '../../modules/core/OmhMapsModule.ios';

export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  ({ style }, _forwardedRef) => {
    const mergedStyles = mergeStyles(style);
    const { width, height, ...restStyles } = mergedStyles || {};

    // If undefined, Apple provider will be used
    const provider =
      OmhMapsModule.getSelectedMapProvider().name === 'Google'
        ? 'google'
        : undefined;

    return (
      <MapView
        provider={provider}
        style={[
          { height: height || '100%', width: width || '100%' },
          restStyles,
        ]}
      />
    );
  }
);
