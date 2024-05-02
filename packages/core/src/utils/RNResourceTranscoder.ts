import { Image, ImageResolvedAssetSource } from 'react-native';

import { OmhIcon } from '../types/common';

export function resolveResource(resource: OmhIcon): ImageResolvedAssetSource {
  return Image.resolveAssetSource(resource);
}
