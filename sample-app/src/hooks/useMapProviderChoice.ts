import { useContext } from 'react';

import MapProviderChoiceContext from '../context/MapProviderChoiceContext';

export default function useMapProviderChoiceContext() {
  return useContext(MapProviderChoiceContext);
}
