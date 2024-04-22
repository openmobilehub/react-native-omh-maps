import { ViewProps } from 'react-native';
import {
  OmhColor,
  OmhCoordinate,
  OmhEvent,
  OmhLineJoin,
  OmhPatternItem,
  OmhTag,
} from './common';

/**
 * Properties for the OmhPolygon component.
 */
type OmhPolygonProperties = {
  /** The outline of the polygon. */
  outline: OmhCoordinate[];
  /** If true, the polygon is clickable. */
  clickable?: boolean;
  /** The fill color of the polygon. */
  fillColor?: number;
  /** The holes in the polygon. */
  holes?: OmhCoordinate[][];
  /** The tag of the polygon. */
  tag?: OmhTag;
  /** The stroke color of the polygon. */
  strokeColor?: OmhColor;
  /** The stroke joint type of the polygon. */
  strokeJointType?: OmhLineJoin;
  /** The stroke pattern of the polygon. */
  strokePattern?: OmhPatternItem[];
  /** The stroke width of the polygon. */
  strokeWidth?: number;
  /** If true, the polygon is visible. */
  visible?: boolean;
  /** The z-index of the polygon. */
  zIndex?: number;
};

/**
 * Event triggered when a polygon is pressed.
 */
export type PolygonPressEvent = OmhEvent<{
  /** The properties of the polygon. */
  omhPolygonProperties: OmhPolygonProperties;
}>;

/**
 * Events for the OmhPolygon component.
 */
type OmhPolygonEvents = {
  /** Called when a polygon is pressed. */
  onPress: (event: PolygonPressEvent) => void;
};

/**
 * Properties for the OmhPolygon component.
 */
export type OmhPolygonComponentProps = ViewProps &
  OmhPolygonProperties &
  OmhPolygonEvents;
