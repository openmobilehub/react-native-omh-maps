import type { RGB } from 'color-convert/conversions';

import { OmhCoordinate } from '@omh/react-native-maps-core';

/**
 * Converts an RGB color to an ARGB Android color-like integer.
 * @param rgb the RGB color.
 * @returns the ARGB integer-representation color.
 */
export function rgbToInt(rgb: RGB): number {
  let valueInt: number = 0;

  for (const component of rgb) {
    // eslint-disable-next-line no-bitwise
    valueInt = (valueInt << 8) + Math.max(0, Math.min(255, component));
  }

  return valueInt;
}

/**
 * Formats an `OmhCoordinate` to a string.
 * @param position the string, precision up to 6 decimal places.
 */
export function formatPosition(position: OmhCoordinate): string {
  return `${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}`;
}
