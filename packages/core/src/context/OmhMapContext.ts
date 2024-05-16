import { createContext } from 'react';

export type OmhMapContextType = {
  providerName: string | null;
};

export const OmhMapContext = createContext<OmhMapContextType>({
  providerName: null,
});

export const OmhMapProvider = OmhMapContext.Provider;
