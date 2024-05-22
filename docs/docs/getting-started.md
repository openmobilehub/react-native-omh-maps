---
sidebar_position: 1
---

# Getting started

React Native OMH Maps is a project that brings various native maps providers to React Native. It provides a single API to use different maps providers:

- Google Maps via `@openmobilehub/maps-plugin-googlemaps`
- OpenStreetMap via `@openmobilehub/maps-plugin-openstreetmap`
- Mapbox via `@openmobilehub/maps-plugin-mapbox`
- Azure Maps via `@openmobilehub/maps-plugin-azuremaps`

## Prerequisites

Before getting started, the documentation assumes you are able to create a project with React Native. If you do not meet these prerequisites, follow the links below:

[React Native - Setting up the development environment](https://reactnative.dev/docs/environment-setup)

Additionally, the current versions of Android OMH libraries have a minimum Android API level requirement of **23**. In order for your Android application to build successfully, make sure that `minSdkVersion` is set to a value greater or equal to **23** in your [**android/build.gradle**](https://github.com/openmobilehub/react-native-omh-maps/blob/main/apps/sample-app/android/build.gradle#L4) file.

## Compatibility

| React Native | 2.0.0-beta |
| ------------ | ---------- |
| 0.73.6       | ✅         |

## Installation

To integrate React Native OMH Maps into your React Native project, you need to install the core package (`@openmobilehub/maps-core`) and at least one of the plugins:

| Provider      | Package                                       |
| ------------- | --------------------------------------------- |
| GoogleMaps    | `@openmobilehub/maps-plugin-googlemaps`    |
| OpenStreetMap | `@openmobilehub/maps-plugin-openstreetmap` |
| Mapbox        | `@openmobilehub/maps-plugin-mapbox`        |
| Azure Maps    | `@openmobilehub/maps-plugin-azuremaps`     |

For example, using yarn:

```bash
yarn add @openmobilehub/maps-core @openmobilehub/maps-plugin-*
```

or using NPM:

```bash
npm install --save @openmobilehub/maps-core @openmobilehub/maps-plugin-*
```

## Provider configuration

Each provider requires you to specify different secrets. Please follow the individual provider configuration:

- [GoogleMaps](https://legendary-broccoli-93ze846.pages.github.io/docs/googlemaps#configuration)
- [OpenStreetMap](https://legendary-broccoli-93ze846.pages.github.io/docs/facebook#configuration)
- [Mapbox](https://legendary-broccoli-93ze846.pages.github.io/docs/microsoft#configuration)
- [Azure Maps](https://legendary-broccoli-93ze846.pages.github.io/docs/dropbox#configuration)

## iOS configuration

TODO: Add iOS configuration steps

## Usage

TODO: Write this section
