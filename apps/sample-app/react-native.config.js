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
  },
};
