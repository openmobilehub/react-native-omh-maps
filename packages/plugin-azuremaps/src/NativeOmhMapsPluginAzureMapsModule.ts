import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setSubscriptionKey(subscriptionKey: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNOmhMapsPluginAzuremapsModule'
);
