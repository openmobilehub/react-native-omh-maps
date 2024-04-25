import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

export function rnResourceIdToAndroidURI(rnResourceId: number): string {
  return resolveAssetSource(rnResourceId).uri;
}
