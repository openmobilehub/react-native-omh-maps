import React, { PropsWithChildren, createContext } from 'react';

import { MapProvider, OmhMapsModule } from '@omh/react-native-maps-core';

export type MapProviderContextType = {
  mapProvider: MapProvider;
  changeMapProvider: (mapProvider: MapProvider) => void;
};

export const MapProviderChoiceContext = createContext<MapProviderContextType>({
  mapProvider: OmhMapsModule.getDefaultMapProvider(),
  changeMapProvider: () => {},
});

export function MapProviderChoiceContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [mapProvider, setMapProvider] = React.useState<MapProvider>(
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
