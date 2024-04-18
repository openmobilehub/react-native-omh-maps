import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface MapProvider {
  name: string;
  path: string;
}

export interface Spec extends TurboModule {
  getCameraCoordinate(viewRef: number): Promise<string>;
  getAvailableMapProviders(): MapProvider[];
  getDefaultMapProvider(): MapProvider;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNOmhMapsCoreModule');
