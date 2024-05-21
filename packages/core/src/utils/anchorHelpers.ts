import { OmhAnchor } from '@openmobilehub/maps-core';
import { Point } from 'react-native-maps';

export function anchorToPoint(
  omhAnchor: OmhAnchor | undefined
): Point | undefined {
  if (!omhAnchor) return undefined;
  return { x: omhAnchor.u, y: omhAnchor.v };
}
