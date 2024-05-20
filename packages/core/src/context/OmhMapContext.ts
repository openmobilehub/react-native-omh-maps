import { MutableRefObject, createContext } from 'react';

import { NativeOmhMapViewComponent } from '../components/mapView/RNOmhMapsCoreViewNativeComponent';

export type OmhMapContextType = {
  nativeComponentRef: MutableRefObject<NativeOmhMapViewComponent | null> | null;
  providerName: string | null;
};

export const OmhMapContext = createContext<OmhMapContextType>({
  nativeComponentRef: null,
  providerName: null,
});

export const OmhMapProvider = OmhMapContext.Provider;
