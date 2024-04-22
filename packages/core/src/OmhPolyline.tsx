import React from 'react';
import RNOmhMapsPolylineNativeComponent, {
  NativeOmhPolylineProps,
} from './RNOmhMapsPolylineNativeComponent';

/**
 * The OMH Polyline properties.
 */
export type OmhPolylineProps = NativeOmhPolylineProps;

/**
 * The OMH Polyline component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const OmhPolyline = ({ points }: OmhPolylineProps) => {
  const nativeComponentRef = React.useRef<
    typeof RNOmhMapsPolylineNativeComponent | null
  >(null);

  return (
    <RNOmhMapsPolylineNativeComponent
      // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
      ref={nativeComponentRef}
      points={points}
    />
  );
};

export default OmhPolyline;
