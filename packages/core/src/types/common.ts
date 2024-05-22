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

/**
 * The type of line join.
 */
export type OmhLineJoin = 'miter' | 'round' | 'bevel';

/**
 * An item in a pattern.
 */
export type OmhPatternItem =
  | {
      /** The type of the pattern item. */
      variant: 'dot';
    }
  | {
      /** The type of the pattern item. */
      variant: 'dash' | 'gap';
      /** The length of the pattern item. */
      length: number;
    };

/**
 * A provider name type.
 */
export type OmhMapProviderName = string;

/**
 * A map provider, used to initialize the map view.
 */
export type OmhMapProvider = {
  /** The name of the provider. */
  name: OmhMapProviderName;
  /** Android only: path to the implementation class. */
  path: string;
};

/**
 * A map provider pair.
 */
export type Providers = {
  /** Provider for devices with Google Play Services availability. */
  gmsProvider: OmhMapProvider;
  /** Provider for devices without Google Play Services availability. */
  nonGmsProvider: OmhMapProvider;
};
