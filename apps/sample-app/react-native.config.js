const path = require('path');
const pak = require('./package.json');

module.exports = {
  dependencies: {
    [pak.name]: {
      root: path.join(path.dirname(__filename), '..'),
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
