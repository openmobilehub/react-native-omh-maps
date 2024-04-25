import { OmhMapProviderVariant } from '@omh/react-native-maps-core';

export const isFeatureSupported = (
  mapProvider: OmhMapProviderVariant | undefined,
  supportedProviders: OmhMapProviderVariant[]
) => {
  if (!mapProvider) {
    return false;
  }

  return supportedProviders.includes(mapProvider);
};

export const allProviders: OmhMapProviderVariant[] = [
  'GoogleMaps',
  'OpenStreetMap',
  'Mapbox',
  'AzureMaps',
];
