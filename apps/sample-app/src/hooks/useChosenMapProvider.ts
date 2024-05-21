import useMapProviderChoiceContext from './useMapProviderChoice';

export default function useChosenMapProvider() {
  return useMapProviderChoiceContext().mapProvider;
}
