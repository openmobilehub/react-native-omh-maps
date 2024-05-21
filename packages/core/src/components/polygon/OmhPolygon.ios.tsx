import React, { useCallback, useMemo } from 'react';
import { OmhPolygonProps } from './OmhPolygon.types';
import { Polygon, Polyline } from 'react-native-maps';
import { omhColorToString } from '../../utils/colorHelper';
import { convertToPattern } from '../../utils/linePatternMapper';
import { mapOutlineToPolylineCoordinates } from './OmhPolygonHelpers';
import { OmhMapsModule } from '../../modules/core/OmhMapsModule.ios';

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
  strokePattern,
  onPolygonClick,
}: OmhPolygonProps) => {
  const provider = OmhMapsModule.getSelectedMapProvider();

  const mappedHoles = useMemo(() => {
    // OmhPolygon expects an empty array while MapPolygon expects an array with
    // at least one empty array inside to remove previously added holes.
    // Passing undefined does not clear out previously added holes either.
    if (!holes || holes.length === 0) {
      return [[]];
    }

    return holes;
  }, [holes]);

  const mappedPattern = useMemo(() => {
    return convertToPattern(strokePattern);
  }, [strokePattern]);

  const handleOnPress = useCallback(() => {
    // tappable is supported on Google Maps only
    if (clickable) onPolygonClick?.(consumePolygonClicks);
  }, [clickable, consumePolygonClicks, onPolygonClick]);

  if (provider.name === 'Google') {
    // Google Maps on iOS has an issue where the polygon outline is not visible at low zoom levels (approximately <3).
    // This workaround makes the outline visible at all zoom levels by rendering the polygon without an outline
    // and rendering separate polylines for the outline and hole outlines.
    const commonProps = {
      zIndex,
      tappable: clickable,
      onPress: handleOnPress,
    };

    const outlineCommonProps = {
      strokeWidth,
      strokeColor: strokeColor ? omhColorToString(strokeColor) : undefined,
      lineJoin: strokeJointType,
      lineDashPattern: mappedPattern,
    };

    const invisiblePolygonStrokeProps = {
      strokeWidth: 0,
      strokeColor: 'transparent',
    };

    return (
      isVisible && (
        <>
          <Polygon
            coordinates={outline}
            holes={mappedHoles}
            fillColor={fillColor ? omhColorToString(fillColor) : 'transparent'}
            {...invisiblePolygonStrokeProps}
            {...commonProps}
          />
          <Polyline
            coordinates={mapOutlineToPolylineCoordinates(outline)}
            {...outlineCommonProps}
            {...commonProps}
          />
          {mappedHoles.map((hole, index) => (
            <Polyline
              key={index}
              coordinates={mapOutlineToPolylineCoordinates(hole)}
              {...outlineCommonProps}
              {...commonProps}
            />
          ))}
        </>
      )
    );
  }

  return (
    isVisible && (
      <Polygon
        coordinates={outline}
        strokeWidth={strokeWidth}
        lineJoin={strokeJointType}
        strokeColor={strokeColor ? omhColorToString(strokeColor) : undefined}
        fillColor={fillColor ? omhColorToString(fillColor) : 'transparent'}
        holes={mappedHoles}
        zIndex={zIndex}
        tappable={clickable}
        lineDashPattern={mappedPattern}
        onPress={handleOnPress}
      />
    )
  );
};

export default OmhPolygon;
