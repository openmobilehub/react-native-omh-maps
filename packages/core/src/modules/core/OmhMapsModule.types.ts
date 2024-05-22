import { OmhMapProvider, Providers } from '../../types/common';

/**
 * The interface for the OmhMapsModule.
 */
export interface IOmhMapsModule {
  /**
   * Initializes the module with the given providers.
   * @param providers The providers to use.
   */
  initialize(providers: Providers): void;
  /**
   * Gets the available map providers depending on the operating system
   * and Google Play Services availability.
   * @returns The available map providers.
   */
  getAvailableMapProviders(): OmhMapProvider[];
  /**
   * Gets the default map provider.
   * @returns The default map provider.
   */
  getDefaultMapProvider(): OmhMapProvider;
}
