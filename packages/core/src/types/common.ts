import {
  ImageRequireSource,
  ImageURISource,
  NativeSyntheticEvent,
} from 'react-native';

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
export type OmhIcon = ImageURISource | ImageRequireSource;

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
 * The type of cap.
 */
export type OmhCap = 'butt' | 'round' | 'square' | 'custom';

/**
 * The variant of a pattern.
 */
export type OmhPatternVariant = 'gap' | 'dash' | 'dot';

/**
 * An item in a pattern.
 */
export type OmhPatternItem = {
  /** The variant of the pattern item. */
  variant: OmhPatternVariant;
  /** The length of the pattern item. */
  length: number;
};

/**
 * A tag, which can be of any type.
 */
export type OmhTag = any;

export type OmhMapProviderVariant = string;
