import { ViewProps } from 'react-native';
import {
  OmhColor,
  OmhCoordinate,
  OmhLineJoin,
  OmhPatternItem,
} from '../../types/common';

/**
 * Common properties for the OmhSpan type.
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
      refWidth: number;
    };

/**
 * Cap variants for polyline.
 * Depending on the provider, start cap and end cap can be set separately.
 * If only cap is set, it will be used for both start and end.
 */
export type OmhCapProps =
  | {
      cap?: OmhCap;
      startCap?: never;
      endCap?: never;
    }
  | {
      cap?: never;
      startCap?: OmhCap;
      endCap?: OmhCap;
    };

/**
 * The Omh Polyline properties.
 */
export type OmhPolylineProps = OmhCapProps &
  ViewProps & {
    /**
     * The points that make up the polyline.
     */
    points: OmhCoordinate[];

    /**
     * Whether the polyline is clickable.
     */
    clickable?: boolean;

    /**
     * The RGB color of the polyline stroke represented as an integer.
     */
    color?: OmhColor;

    /**
     * The width of the polyline stroke.
     */
    width?: number;

    /**
     * Whether the polyline is visible.
     */
    isVisible?: boolean;

    /**
     * The zIndex of the polyline, which specifies the order in which the polyline is drawn on the map.
     */
    zIndex?: number;

    /**
     * The joint type of the polyline.
     */
    jointType?: OmhLineJoin;

    /**
     * The pattern of the polyline.
     */
    pattern?: OmhPatternItem[];

    /**
     * Callback invoked when the polyline is clicked.
     * The information if event was consumed is passed as an argument.
     */
    onPolylineClick?: (eventConsumed: boolean) => void;

    /**
     * Controls whether the default behaviour of a clicked polyline (such as opening an info window on click) for a polyline click
     * event; identical to returning `true` from native android code in `OmhOnPolylineClickListener.onPolylineClick`.
     *
     * The reasoning behind this is that RN does not support synchronous bi-directional callbacks for passing data in new architecture.
     *
     * @see https://openmobilehub.github.io/android-omh-maps/api-docs/packages/core/com.openmobilehub.android.maps.core.presentation.interfaces.maps/-omh-on-polyline-click-listener/on-polyline-click.html
     */
    consumePolylineClicks?: boolean;

    /**
     * The spans of the polyline.
     */
    spans?: OmhSpan[];
  };
