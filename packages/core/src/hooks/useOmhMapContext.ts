import { useContext } from 'react';

import { OmhMapContext } from '../context/OmhMapContext';

export const useOmhMapContext = () => useContext(OmhMapContext);
