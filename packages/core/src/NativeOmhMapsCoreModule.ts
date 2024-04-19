import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface MapProvider {
  name: string;
  path: string;
}

export interface OmhCoordinate {
  latitude: number;
  longitude: number;
}

export interface Spec extends TurboModule {
  getCameraCoordinate(viewRef: number): Promise<OmhCoordinate | null>;
  setCameraCoordinate(
    viewRef: number,
    coordinate: OmhCoordinate,
    zoomLevel: number
  ): Promise<void>;
  getAvailableMapProviders(): MapProvider[];
  getDefaultMapProvider(): MapProvider;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNOmhMapsCoreModule');