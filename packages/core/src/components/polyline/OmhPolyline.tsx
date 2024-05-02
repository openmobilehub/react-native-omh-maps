import React, { useCallback, useMemo } from 'react';
import { ViewProps } from 'react-native';
import RNOmhMapsPolylineNativeComponent from './RNOmhMapsPolylineNativeComponent';
import { rnResourceIdToAndroidURI } from '../../utils/RNResourceTranscoder';
import {
  OmhCap,
  OmhCoordinate,
  OmhLineJoin,
  OmhPatternItem,
  OmhSpan,
} from '../../types/common';
import { mapCapToNative } from './OmhPolylineHelpers';

export type OmhCapProps =
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

export type OmhPolylineProps = OmhCapProps &
  ViewProps & {
    /**
     * The points that make up the polyline.
     */
    points: OmhCoordinate[];

    /**
     * Whether the polyline is clickable.
     */
    clickable?: boolean;

    /**
     * The RGB color of the polyline stroke represented as an integer.
     */
    color?: number; // note: Int32 is too small, there is no Int64, so Double is used

    /**
     * The width of the polyline stroke.
     */
    width?: number;

    /**
     * Whether the polyline is visible.
     */
    isVisible?: boolean;

    /**
     * The zIndex of the polyline, which specifies the order in which the polyline is drawn on the map.
     */
    zIndex?: number;

    /**
     * The joint type of the polyline.
     */
    jointType?: OmhLineJoin;

    /**
     * The pattern of the polyline.
     */
    pattern?: OmhPatternItem[];

    /**
     * Callback invoked when the polyline is clicked.
     * The information if event was consumed is passed as an argument.
     */
    onPolylineClick?: (eventConsumed: boolean) => void;

    /**
     * Controls whether the default behaviour of a clicked polyline (such as opening an info window on click) for a polyline click
     * event; identical to returning `true` from native android code in `OmhOnPolylineClickListener.onPolylineClick`.
     *
     * The reasoning behind this is that RN does not support synchronous bi-directional callbacks for passing data in new architecture.
     *
     * @see https://www.openmobilehub.com/android-omh-maps/api-docs/packages/core/com.openmobilehub.android.maps.core.presentation.interfaces.maps/-omh-on-polyline-click-listener/on-polyline-click.html
     */
    consumePolylineClicks?: boolean;

    /**
     * The spans of the polyline.
     */
    spans?: OmhSpan[];
  };

export const OmhPolyline = ({
  points,
  clickable,
  color,
  width,
  isVisible,
  zIndex,
  jointType,
  cap: omhCap,
  startCap: omhStartCap,
  endCap: omhEndCap,
  pattern,
  spans,
  onPolylineClick,
}: OmhPolylineProps) => {
  const nativeSpans = useMemo(() => {
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

  const nativeLineJoin = useMemo(() => {
    switch (jointType) {
      case 'round':
        return 2;
      case 'bevel':
        return 1;
      case 'miter':
      default:
        return 0;
    }
  }, [jointType]);

  const nativePattern = useMemo(() => {
    return pattern?.map(item => {
      if (item.variant === 'dot') {
        return {
          type: item.variant,
        };
      }

      return {
        type: item.variant,
        length: item.length,
      };
    });
  }, [pattern]);

  const handlePolylineClick = useCallback(
    (event: { nativeEvent: { consumed: boolean } }) => {
      onPolylineClick?.(event.nativeEvent.consumed);
    },
    [onPolylineClick]
  );

  return (
    <RNOmhMapsPolylineNativeComponent
      points={points}
      clickable={clickable}
      color={color}
      width={width}
      isVisible={isVisible}
      polylineZIndex={zIndex}
      jointType={nativeLineJoin}
      cap={cap}
      startCap={startCap}
      endCap={endCap}
      pattern={nativePattern}
      spans={nativeSpans}
      onPolylineClick={handlePolylineClick}
    />
  );
};

export default OmhPolyline;
