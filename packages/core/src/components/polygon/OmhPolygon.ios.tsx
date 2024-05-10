import React, { useMemo } from 'react';
import { OmhPolygonProps } from './OmhPolygon.types';
import { Polygon } from 'react-native-maps';
import { omhColorToString } from '../../utils/colorHelper';

export const OmhPolygon = ({
  outline,
  clickable,
  strokeColor,
  fillColor,
  holes,
  strokeWidth,
  isVisible = true,
  zIndex,
  strokeJointType,
  consumePolygonClicks = true,
  //strokePattern,
  onPolygonClick,
}: OmhPolygonProps) => {
  const mappedHoles = useMemo(() => {
    // OmhPolygon expects an empty array while MapPolygon expects an array with
    // at least one empty array inside to remove previously added holes.
    // Passing undefined does not clear out previously added holes either.
    if (!holes || holes.length === 0) {
      return [[]];
    }

    return holes;
  }, [holes]);

  return (
    isVisible && (
      <Polygon
        coordinates={outline}
        strokeWidth={strokeWidth}
        lineJoin={strokeJointType}
        strokeColor={strokeColor ? omhColorToString(strokeColor) : undefined}
        fillColor={fillColor ? omhColorToString(fillColor) : undefined}
        holes={mappedHoles}
        zIndex={zIndex}
        tappable={clickable}
        onPress={() => {
          onPolygonClick?.(consumePolygonClicks);
        }}
      />
    )
  );
};

export default OmhPolygon;
