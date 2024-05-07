import { resolveResource } from '../../utils/RNResourceTranscoder';
import { OmhCap } from './OmhPolyline.types';

export const mapCapToNative = (cap?: OmhCap) => {
  if (!cap) {
    return undefined;
  }

  if (cap.type === 'custom') {
    return {
      type: cap.type,
      refWidth: cap.refWidth || 0,
      icon: resolveResource(cap.icon),
    };
  }

  return cap;
};
