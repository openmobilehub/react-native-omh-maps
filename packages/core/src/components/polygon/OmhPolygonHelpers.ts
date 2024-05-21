import { OmhCoordinate } from '../../types/common';

export const mapOutlineToPolylineCoordinates = (
  outline: OmhCoordinate[]
): OmhCoordinate[] => {
  if (outline.length === 0) {
    return [];
  } else {
    return [...outline, outline[0]!];
  }
};
