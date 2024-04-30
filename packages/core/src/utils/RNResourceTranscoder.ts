import { ImageResolvedAssetSource } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

export function rnResourceIdToAndroidURI(
  rnResourceId: number
): ImageResolvedAssetSource {
  return resolveAssetSource(rnResourceId);
}
