import { PixelRatio } from 'react-native';
import { resolveResource } from '../../utils/RNResourceTranscoder';
import { OmhCap } from './OmhPolyline.types';

const calculateRefWidth = (refWidth: number) => {
  // In release mode, Glide library is used to load images,
  // so we need to multiply the refWidth by pixel ratio.
  return __DEV__ ? refWidth : refWidth * PixelRatio.get();
};

export const mapCapToNative = (cap?: OmhCap) => {
  if (!cap) {
    return undefined;
  }

  if (cap.type === 'custom') {
    return {
      type: cap.type,
      refWidth: calculateRefWidth(cap.refWidth),
      icon: resolveResource(cap.icon),
    };
  }

  return cap;
};
