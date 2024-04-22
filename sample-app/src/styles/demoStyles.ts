import { StyleSheet } from 'react-native';

export const demoStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 0.6,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoControlsScrollViewContainer: {
    flex: 0.4,
    overflow: 'hidden',
    width: '100%',
  },
  demoControlsScrollViewContentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  centeredHeading: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
  },
});
