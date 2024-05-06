import { ImageRequireSource, NativeSyntheticEvent } from 'react-native';

/**
 * A common abstraction of map event.
 * @template T The native event type.
 */
export type OmhEvent<T> = NativeSyntheticEvent<T>;

/**
 * A geographical coordinate.
 */
export type OmhCoordinate = {
  /** The latitude of the coordinate. */
  latitude: number;
  /** The longitude of the coordinate. */
  longitude: number;
};

/**
 * A point in a 2D space.
 */
export type OmhPoint = {
  /** The x-coordinate of the point. */
  x: number;
  /** The y-coordinate of the point. */
  y: number;
};

/**
 * A color value.
 */
export type OmhColor = number;

/**
 * An icon, which can be either a URI source or an imported/required image source.
 */
export type OmhIcon =
  | { uri: string; width?: number; height?: number }
  | ImageRequireSource;

/**
 * An anchor offset.
 */
export type OmhAnchor = {
  /** The normalized (`0` - `1`) X coordinate specifier; default: `0.5`. */
  u: number;
  /** The normalized (`0` - `1`) Y coordinate specifier; default: `0.5`. */
  v: number;
};

export type Percentage = `${number}%`;

/**
 * The type of line join.
 */
export type OmhLineJoin = 'miter' | 'round' | 'bevel';

/**
 * The variant of a pattern.
 */
export type OmhPatternVariant = 'gap' | 'dash' | 'dot';

/**
 * An item in a pattern.
 */
export type OmhPatternItem =
  | {
      variant: 'dot';
    }
  | {
      variant: 'dash' | 'gap';
      length: number;
    };

/**
 * A tag, which can be of any type.
 */
export type OmhTag = any;

/**
 * Common properties for the OmhSpan types.
 */
type OmhSpanCommon = {
  /** The number of segments in the span. */
  segments: number;
  /** The stamp icon for the span. */
  stamp?: number;
};

/**
 * Properties for a monochromatic OmhSpan.
 */
type OmhMonochromaticSpan = {
  /** The type of the span. */
  type: 'monochromatic';
  /** The color of the span. */
  color: number;
};

/**
 * Properties for a gradient OmhSpan.
 */
type OmhGradientSpan = {
  /** The type of the span. */
  type: 'gradient';
  /** The starting color of the gradient. */
  fromColor: number;
  /** The ending color of the gradient. */
  toColor: number;
};

/**
 * The OmhSpan type, which can be either monochromatic or gradient.
 */
export type OmhSpan = OmhSpanCommon & (OmhMonochromaticSpan | OmhGradientSpan);

/**
 * Cap types for polyline.
 */
export type OmhCap =
  | {
      type: 'butt' | 'round' | 'square';
    }
  | {
      type: 'custom';
      icon: number;
      refWidth?: number;
    };

export type OmhMapProviderVariant = string;
