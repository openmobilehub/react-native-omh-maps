import React, { useCallback, useMemo } from 'react';
import RNOmhMapsPolylineNativeComponent from './RNOmhMapsPolylineNativeComponent';
import { mapCapToNative } from './OmhPolylineHelpers';
import { resolveResource } from '../../utils/RNResourceTranscoder';
import { OmhPolylineProps } from './OmhPolyline.types';

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
      const stamp = omhSpan.stamp ? resolveResource(omhSpan.stamp) : undefined;

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
