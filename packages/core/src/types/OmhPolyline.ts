import { ViewProps } from 'react-native';
import {
  OmhCap,
  OmhColor,
  OmhCoordinate,
  OmhEvent,
  OmhIcon,
  OmhPatternItem,
  OmhTag,
} from './common';

/**
 * Common properties for the OmhSpan types.
 */
type OmhSpanCommon = {
  /** The number of segments in the span. */
  segments: number;
  /** The stamp icon for the span. */
  stamp?: OmhIcon;
};

/**
 * Properties for a monochromatic OmhSpan.
 */
type OmhMonochromaticSpan = {
  /** The type of the span. */
  type: 'monochromatic';
  /** The color of the span. */
  color: OmhColor;
};

/**
 * Properties for a gradient OmhSpan.
 */
type OmhGradientSpan = {
  /** The type of the span. */
  type: 'gradient';
  /** The starting color of the gradient. */
  fromColor: OmhColor;
  /** The ending color of the gradient. */
  toColor: OmhColor;
};

/**
 * The OmhSpan type, which can be either monochromatic or gradient.
 */
export type OmhSpan = OmhSpanCommon & (OmhMonochromaticSpan | OmhGradientSpan);

/**
 * Properties for the OmhPolyline component.
 */
export type OmhPolylineProperties = {
  /** The cap style of the polyline. */
  cap?: OmhCap;
  /** The custom cap icon of the polyline. */
  customCap?: OmhIcon;
  /** If true, the polyline is clickable. */
  clickable?: boolean;
  /** The color of the polyline. */
  color?: number;
  /** The end cap style of the polyline. */
  endCap?: OmhCap;
  /** The joint type of the polyline. */
  jointType?: number;
  /** The pattern of the polyline. */
  pattern?: OmhPatternItem[];
  /** The points that make up the polyline. */
  points?: OmhCoordinate[];
  /** The spans of the polyline. */
  spans?: OmhSpan[];
  /** The start cap style of the polyline. */
  startCap?: OmhCap;
  /** The tag of the polyline. */
  tag?: OmhTag;
  /** If true, the polyline is visible. */
  visible?: boolean;
  /** The width of the polyline. */
  width?: number;
  /** The z-index of the polyline. */
  zIndex?: number;
};

/**
 * Event triggered when a polyline is pressed.
 */
export type PolylinePressEvent = OmhEvent<{
  /** The properties of the polyline. */
  omhPolylineProperties: OmhPolylineProperties;
}>;

/**
 * Events for the OmhPolyline component.
 */
export type OmhPolylineEvents = {
  /** Called when a polyline is pressed. */
  onPress: (event: PolylinePressEvent) => void;
};

/**
 * Properties for the OmhPolyline component.
 */
export type OmhPolylineComponentProps = ViewProps &
  OmhPolylineProperties &
  OmhPolylineEvents;
