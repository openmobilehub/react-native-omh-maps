import React, { useMemo } from 'react';
import RNOmhMapsPolylineNativeComponent, {
  NativeOmhPolylineProps,
} from './RNOmhMapsPolylineNativeComponent';
import { OmhSpan } from '../../types/OmhPolyline';
import { rnResourceIdToAndroidURI } from '../../utils/RNResourceTranscoder';

export type OmhCap =
  | {
      type: 'butt' | 'round' | 'square';
    }
  | {
      type: 'custom';
      icon: number;
      refWidth?: number;
    };

export type CapProps =
  | {
      cap?: OmhCap;
      startCap?: never;
      endCap?: never;
    }
  | {
      cap?: never;
      startCap?: OmhCap;
      endCap?: OmhCap;
    };

/**
 * The OMH Polyline properties.
 */
export type OmhPolylineProps = Omit<
  NativeOmhPolylineProps,
  'spans' | 'cap' | 'startCap' | 'endCap'
> & {
  spans?: OmhSpan[];
} & CapProps;

const mapCapToNative = (cap?: OmhCap) => {
  if (!cap) {
    return undefined;
  }

  if (cap.type === 'custom') {
    return {
      type: cap.type,
      refWidth: cap.refWidth || 0,
      icon: rnResourceIdToAndroidURI(cap.icon),
    };
  }

  return cap;
};

/**
 * The OMH Polyline component. Actual implementation is picked based on the platform capabilities (GMS or non-GMS)
 * and availability of installed providers (`@omh/react-native-maps-plugin-*`).
 */
export const OmhPolyline = ({
  points,
  clickable,
  color,
  width,
  isVisible,
  polylineZIndex,
  jointType,
  cap: omhCap,
  startCap: omhStartCap,
  endCap: omhEndCap,
  pattern,
  spans,
  onPolylineClick,
}: OmhPolylineProps) => {
  const nativeComponentRef = React.useRef<
    typeof RNOmhMapsPolylineNativeComponent | null
  >(null);

  const mappedSpans = useMemo(() => {
    return spans?.map(omhSpan => {
      const stamp = omhSpan.stamp
        ? rnResourceIdToAndroidURI(omhSpan.stamp)
        : undefined;

      if (omhSpan.type === 'monochromatic') {
        return {
          segments: omhSpan.segments,
          stamp,
          color: omhSpan.color,
          type: omhSpan.type,
        };
      } else {
        return {
          segments: omhSpan.segments,
          stamp,
          fromColor: omhSpan.fromColor,
          toColor: omhSpan.toColor,
          type: omhSpan.type,
        };
      }
    });
  }, [spans]);

  const cap = useMemo(() => mapCapToNative(omhCap), [omhCap]);
  const startCap = useMemo(() => mapCapToNative(omhStartCap), [omhStartCap]);
  const endCap = useMemo(() => mapCapToNative(omhEndCap), [omhEndCap]);

  console.log('test - polyline', cap);
  return (
    <RNOmhMapsPolylineNativeComponent
      // @ts-ignore next line: missing typing for 'ref' prop on HostComponent
      ref={nativeComponentRef}
      points={points}
      clickable={clickable}
      color={color}
      width={width}
      isVisible={isVisible}
      polylineZIndex={polylineZIndex}
      jointType={jointType}
      cap={cap}
      startCap={startCap}
      endCap={endCap}
      pattern={pattern}
      spans={mappedSpans}
      onPolylineClick={onPolylineClick}
    />
  );
};

export default OmhPolyline;
