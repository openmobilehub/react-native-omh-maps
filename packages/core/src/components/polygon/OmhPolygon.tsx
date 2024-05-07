import React, { useCallback, useMemo } from 'react';
import RNOmhMapsPolygonNativeComponent from './RNOmhMapsPolygonNativeComponent';
import { OmhPolygonProps } from './OmhPolygon.types';

export const OmhPolygon = ({
  outline,
  clickable,
  strokeColor,
  fillColor,
  holes,
  strokeWidth,
  isVisible,
  zIndex,
  strokeJointType,
  strokePattern,
  onPolygonClick,
}: OmhPolygonProps) => {
  const nativeStrokeJointType = useMemo(() => {
    switch (strokeJointType) {
      case 'round':
        return 2;
      case 'bevel':
        return 1;
      case 'miter':
      default:
        return 0;
    }
  }, [strokeJointType]);

  const nativeStrokePattern = useMemo(() => {
    return strokePattern?.map(item => {
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
  }, [strokePattern]);

  const handlePolygonClick = useCallback(
    (event: { nativeEvent: { consumed: boolean } }) => {
      onPolygonClick?.(event.nativeEvent.consumed);
    },
    [onPolygonClick]
  );

  return (
    <RNOmhMapsPolygonNativeComponent
      outline={outline}
      clickable={clickable}
      strokeColor={strokeColor}
      fillColor={fillColor}
      holes={holes}
      strokeWidth={strokeWidth}
      isVisible={isVisible}
      polygonZIndex={zIndex}
      strokeJointType={nativeStrokeJointType}
      strokePattern={nativeStrokePattern}
      onPolygonClick={handlePolygonClick}
    />
  );
};

export default OmhPolygon;
