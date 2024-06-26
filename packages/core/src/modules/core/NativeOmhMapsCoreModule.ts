import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type MapProvider = {
  name: string;
  path: string;
};

type OmhCoordinate = {
  latitude: number;
  longitude: number;
};

type Paths = {
  gmsPath: string;
  nonGmsPath: string;
};

export interface Spec extends TurboModule {
  initialize(paths: Paths): void;
  getProviderName(viewRef: number): string;
  takeSnapshot(viewRef: number, format: string): Promise<string>;
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
