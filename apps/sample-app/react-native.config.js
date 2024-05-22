const pak = require('./package.json');
const root = require('./config-constants');

module.exports = {
  dependencies: {
    [pak.name]: {
      root,
    },
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-maps': {
      platforms: {
        android: null,
      },
    },
    '@react-native-community/geolocation': {
      platforms: {
        android: null,
      },
    },
    '@openmobilehub/maps-core': {
      platforms: {
        ios: null,
      },
    },
    '@openmobilehub/maps-plugin-azuremaps': {
      platforms: {
        ios: null,
      },
    },
    '@openmobilehub/maps-plugin-googlemaps': {
      platforms: {
        ios: null,
      },
    },
    '@openmobilehub/maps-plugin-mapbox': {
      platforms: {
        ios: null,
      },
    },
    '@openmobilehub/maps-plugin-openstreetmap': {
      platforms: {
        ios: null,
      },
    },
  },
};
