import { OmhMapProviderName } from '@openmobilehub/maps-core';
import { Constants } from './Constants';
import Demo = Constants.Demo;

/**
 * Checks whether the mapProvider is in availableProviders.
 * @param mapProvider the provider to check for.
 * @param availableProviders the baseline of providers that support the given feature.
 * @returns whether the mapProvider is in availableProviders.
 */
export const isFeatureSupported = (
  mapProvider: OmhMapProviderName | undefined,
  availableProviders: OmhMapProviderName[] | '*'
) => {
  if (!mapProvider) return false;

  if (availableProviders === '*') return true;

  return availableProviders.includes(mapProvider);
};

/**
 * Return ANDROID_SUPPORTED_PROVIDERS without the excluded providers.
 * @param excludedProviders providers that should be excluded from the result.
 * @returns ANDROID_SUPPORTED_PROVIDERS without excluded providers.
 */
export const androidProvidersWithout = (
  excludedProviders: OmhMapProviderName[]
): OmhMapProviderName[] => {
  return Demo.ANDROID_SUPPORTED_PROVIDERS.filter(
    provider => !excludedProviders.includes(provider)
  );
};

/**
 * Return IOS_SUPPORTED_PROVIDERS without the excluded providers.
 * @param excludedProviders providers that should be excluded from the result.
 * @returns IOS_SUPPORTED_PROVIDERS without excluded providers.
 */
export const iOSProvidersWithout = (
  excludedProviders: OmhMapProviderName[]
): OmhMapProviderName[] => {
  return Demo.IOS_SUPPORTED_PROVIDERS.filter(
    provider => !excludedProviders.includes(provider)
  );
};
