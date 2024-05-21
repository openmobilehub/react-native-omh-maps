import React, { PropsWithChildren, createContext } from 'react';

import { OmhMapProvider, OmhMapsModule } from '@openmobilehub/maps-core';

export type MapProviderContextType = {
  mapProvider: OmhMapProvider;
  changeMapProvider: (mapProvider: OmhMapProvider) => void;
};

export const MapProviderChoiceContext = createContext<MapProviderContextType>({
  mapProvider: OmhMapsModule.getDefaultMapProvider(),
  changeMapProvider: () => {},
});

export function MapProviderChoiceContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [mapProvider, setMapProvider] = React.useState<OmhMapProvider>(
    OmhMapsModule.getDefaultMapProvider()
  );

  return (
    <MapProviderChoiceContext.Provider
      value={{
        changeMapProvider(newMapProvider) {
          setMapProvider(newMapProvider);
        },
        mapProvider: mapProvider,
      }}>
      {children}
    </MapProviderChoiceContext.Provider>
  );
}

export default MapProviderChoiceContext;
