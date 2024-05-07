import React, { useCallback, useMemo } from 'react';
import { ViewProps } from 'react-native';
import {
  OmhColor,
  OmhCoordinate,
  OmhLineJoin,
  OmhPatternItem,
} from '../../types/common';
import RNOmhMapsPolygonNativeComponent from './RNOmhMapsPolygonNativeComponent';

export type OmhPolygonProps = ViewProps & {
  /**
   * The points that make up the polygon.
   */
  outline: OmhCoordinate[];

  /**
   * Whether the polygon is clickable.
   */
  clickable?: boolean;

  /**
   * The RGB color of the polygon stroke represented as an integer.
   */
  strokeColor?: OmhColor;

  /**
   * The RGB color of the polygon fill represented as an integer.
   */
  fillColor?: OmhColor;

  /**
   * The width of the polygon stroke.
   */
  strokeWidth?: number;

  /**
   * Whether the polygon is visible.
   */
  isVisible?: boolean;

  /**
   * The zIndex of the polygon, which specifies the order in which the polygon is drawn on the map.
   */
  zIndex?: number;

  /**
   * The joint type of the polygon stroke.
   */
  strokeJointType?: OmhLineJoin;

  /**
   * The pattern of the polygon.
   */
  strokePattern?: OmhPatternItem[];

  /**
   * Callback invoked when the polygon is clicked.
   * The information if event was consumed is passed as an argument.
   */
  onPolygonClick?: (eventConsumed: boolean) => void;

  /**
   * Controls whether the default behaviour of a clicked polygon (such as opening an info window on click) for a polygon click
   * event; identical to returning `true` from native android code in `OmhOnPolygonClickListener.onPolygonClick`.
   *
   * The reasoning behind this is that RN does not support synchronous bi-directional callbacks for passing data in new architecture.
   *
   * @see https://www.openmobilehub.com/android-omh-maps/api-docs/packages/core/com.openmobilehub.android.maps.core.presentation.interfaces.maps/-omh-on-polygon-click-listener/on-polygon-click.html
   */
  consumePolygonClicks?: boolean;
};

export const OmhPolygon = ({
  outline,
  clickable,
  strokeColor,
  fillColor,
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
