import { OmhColor } from '@openmobilehub/maps-core';

export function omhColorToString(color: OmhColor): string {
  return '#' + color.toString(16).padStart(6, '0');
}
