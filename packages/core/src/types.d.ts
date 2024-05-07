declare module 'react-native/Libraries/Image/resolveAssetSource' {
  import { ImageResolvedAssetSource } from 'react-native';

  export default function resolveAssetSource(
    source: number
  ): ImageResolvedAssetSource;
}
