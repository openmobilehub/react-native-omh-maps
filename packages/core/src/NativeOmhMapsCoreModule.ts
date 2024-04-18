import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getCameraCoordinate(viewRef: number): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNOmhMapsCoreModule');
