import { OmhCap } from '../../types/common';
import { rnResourceIdToAndroidURI } from '../../utils/RNResourceTranscoder';

export const mapCapToNative = (cap?: OmhCap) => {
  if (!cap) {
    return undefined;
  }

  if (cap.type === 'custom') {
    return {
      type: cap.type,
      refWidth: cap.refWidth || 0,
      icon: rnResourceIdToAndroidURI(cap.icon),
    };
  }

  return cap;
};
