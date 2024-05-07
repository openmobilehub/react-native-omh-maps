import React, { forwardRef } from 'react';
import MapView from 'react-native-maps';
import { OmhMapViewProps, OmhMapViewRef } from './OmhMapView.types';
import { mergeStyles } from '../../utils/styleHelpers';
import { OmhMapsModule } from '../../modules/core/OmhMapsModule.ios';

export const OmhMapView = forwardRef<OmhMapViewRef, OmhMapViewProps>(
  ({ style }, _forwardedRef) => {
    const mergedStyles = mergeStyles(style);
    const { width, height, ...restStyles } = mergedStyles || {};

    const provider = OmhMapsModule.getSelectedMapProvider();

    return (
      <MapView
        provider={provider.name === 'Google' ? 'google' : undefined}
        style={[
          { height: height || '100%', width: width || '100%' },
          restStyles,
        ]}
      />
    );
  }
);
