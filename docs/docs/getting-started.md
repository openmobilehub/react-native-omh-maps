---
sidebar_position: 1
---

# Getting started

React Native OMH Maps is a project that brings various native maps providers to React Native. It provides a single API to use different maps providers:

- Google Maps via `@omh/react-native-maps-plugin-googlemaps`
- OpenStreetMap via `@omh/react-native-maps-plugin-openstreetmap`
- Mapbox via `@omh/react-native-maps-plugin-mapbox`
- Azure Maps via `@omh/react-native-maps-plugin-azuremaps`

## Installation

To integrate React Native OMH Maps into your React Native project, you need to install the core package and at least one of the plugins:

```bash
yarn add @omh/react-native-maps-core @omh/react-native-maps-plugin-*
```

or using NPM:

```bash
npm install --save @omh/react-native-maps-core @omh/react-native-maps-plugin-*
```

### Requirements

- [Node.js](https://nodejs.org/en/download/) version 20 or above and NPM
- A [React Native project](https://reactnative.dev/docs/environment-setup) with properly set up environment
