import { OmhMapProviderVariant } from '@omh/react-native-maps-core';

/**
 * Checks whether the mapProvider is in availableProviders.
 * @param mapProvider the provider to check for.
 * @param availableProviders the baseline of providers that support the given feature.
 * @returns whether the mapProvider is in availableProviders.
 */
export const isFeatureSupported = (
  mapProvider: OmhMapProviderVariant | undefined,
  availableProviders: OmhMapProviderVariant[] | '*'
) => {
  if (!mapProvider) return false;

  if (availableProviders === '*') return true;

  return availableProviders.includes(mapProvider);
};
