import { ViewProps } from 'react-native';
import {
  OmhColor,
  OmhCoordinate,
  OmhLineJoin,
  OmhPatternItem,
} from '../../types/common';

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
   * The holes in the polygon.
   * */
  holes?: OmhCoordinate[][];

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
