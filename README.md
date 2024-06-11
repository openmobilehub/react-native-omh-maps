<p align="center">
  <a href="https://openmobilehub.org/">
    <img width="160px" src="https://openmobilehub.org/wp-content/uploads/sites/13/2024/06/OpenMobileHub-horizontal-color.svg"/><br/>
  </a>
  <h2 align="center">React Native OMH Maps</h2>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@openmobilehub/maps-core"><img src="https://img.shields.io/npm/dm/@openmobilehub/maps-core.svg?style=flat" alt="NPM downloads"/></a>
  <a href="https://www.npmjs.com/package/@openmobilehub/maps-core"><img src="https://img.shields.io/npm/v/@openmobilehub/maps-core.svg?style=flat" alt="NPM version"/></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/@openmobilehub/maps-core.svg?style=flat" alt="License"/></a>
</p>

<p align="center">
  <a href="https://discord.com/invite/yTAFKbeVMw"><img src="https://img.shields.io/discord/1115727214827278446.svg?style=flat&colorA=7289da&label=Chat%20on%20Discord" alt="Chat on Discord"/></a>
  <a href="https://twitter.com/openmobilehub"><img src="https://img.shields.io/twitter/follow/rnfirebase.svg?style=flat&colorA=1da1f2&colorB=&label=Follow%20on%20Twitter" alt="Follow on Twitter"/></a>
</p>

---

**React Native OMH Maps** eases the process to implement interactive maps in React Native apps on both iOS and Android. Under the hood, for Android it uses the Android [OMH Maps Client Library](https://github.com/openmobilehub/android-omh-maps). Supports both Google Mobile Services (GMS) and non-GMS configurations, with a unified interface for easy incorporation of Google Maps, OpenStreetMap, Mapbox, Azure Maps and other supported third-party maps providers. It provides a single API to use different maps providers:

- Google Maps via `@openmobilehub/maps-plugin-googlemaps`
- OpenStreetMap via `@openmobilehub/maps-plugin-openstreetmap`
- Mapbox via `@openmobilehub/maps-plugin-mapbox`
- Azure Maps via `@openmobilehub/maps-plugin-azuremaps`

iOS implementation relies on `react-native-maps` library and supports the following providers:
- Apple Maps
- Google Maps

All of the iOS providers are available by installing @openmobilehub/maps-core.

## Features

- 📱 GMS and non-GMS support for all maps providers
- 🔗 Identical API across all providers
- 🌱 Easy configuration and setup
- 💨 Lightweight modules

## Prerequisites

Before getting started, the documentation assumes you are able to create a project with React Native. If you do not meet these prerequisites, follow the links below:

[React Native - Setting up the development environment](https://reactnative.dev/docs/environment-setup)

Additionally, the current versions of Android OMH libraries have a minimum Android API level requirement of **23**. In order for your Android application to build successfully, make sure that `minSdkVersion` is set to a value greater or equal to **23** in your [**android/build.gradle**](https://github.com/openmobilehub/react-native-omh-maps/blob/main/apps/sample-app/android/build.gradle#L4) file.

## Compatibility

| React Native | 2.1.0 |
| ------------ | ----- |
| 0.73.6       | ✅    |

## OMH Maps Modules

This is the main directory of the monorepo for React Native OMH Maps. Below are listed all possible packages that belong to the React Native OMH Maps ecosystem.

To get started, you need to install the [Core package](https://openmobilehub.github.io/react-native-omh-maps/docs/core).

Additionally, you need providers that will be used to render the map (at least one). Their availability depends on both the platform (Android / iOS) and - on Android - the support for and actual availability of GMS.

Providers compatibility:

| Provider name & docs link                                                               | Supports GMS | Supports non-GMS | Supports Apple iOS |
| --------------------------------------------------------------------------------------- | :----------: | :--------------: | :----------------: |
| [Google Maps](https://openmobilehub.github.io/react-native-omh-maps/docs/googlemaps)      |      ✅      |        ❌        |         ✅         |
| [OpenStreetMap](https://openmobilehub.github.io/react-native-omh-maps/docs/openstreetmap) |      ✅      |        ✅        |         ❌         |
| [Mapbox](https://openmobilehub.github.io/react-native-omh-maps/docs/mapbox)               |      ✅      |        ✅        |         ❌         |
| [Azure Maps](https://openmobilehub.github.io/react-native-omh-maps/docs/azuremaps)        |      ✅      |        ✅        |         ❌         |
| [Apple Maps](https://openmobilehub.github.io/react-native-omh-maps/docs/apple)            |      ❌      |        ❌        |         ✅         |

## Sample App

This repository includes a [Sample App](https://openmobilehub.github.io/react-native-omh-maps/docs/sample-app) that demonstrates the functionality of the OMH Maps Client Library. By cloning the repo and executing the app, you can explore the various features offered by the library.

However, if you prefer a step-by-step approach to learn the SDK from scratch, we recommend following the detailed [Getting Started](https://openmobilehub.github.io/react-native-omh-maps/docs/getting-started) guide provided in this repository. The guide will walk you through the implementation process and help you integrate the OMH Maps Client Library into your projects effectively.

## Documentation

- [Quick Start](https://openmobilehub.github.io/react-native-omh-maps/docs/getting-started)
- [Reference API](https://openmobilehub.github.io/react-native-omh-maps/docs/api)

## Compatibility matrix

The below matrix presents the compatibility matrix, denoting support levels for each of the functionalities across all providers.

Legend of support levels:

| Support level       | Symbol |
| ------------------- | :----: |
| Fully supported     |   ✅   |
| Partially supported |   🟨   |
| Not supported       |   ❌   |

### MapView

<details>
  <summary>Show details</summary>

| Props               | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| ------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| mapStyle            |         ✅         |           ❌           |       ✅       |        ❌         |       ✅       |      ❌       |
| rotateEnabled       |         ✅         |           ✅           |       ✅       |        ❌         |       ✅       |      ❌       |
| zoomEnabled         |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| myLocationEnabled   |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      🟨       |
| onMapReady          |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| onMapLoaded         |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| onCameraIdle        |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| onMyLocationClicked |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| onCameraMoveStarted |         ✅         |           🟨           |       🟨       |        ✅         |       ✅       |      ✅       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| myLocationEnabled | On iOS Apple Maps provider, the property only controls the display of user's current location; on this provider, 'move to current location' button is not supported |
| onCameraMoveStarted | Described in the OMH Android SDK [Plugin OpenStreetMap documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-openstreetmap/README/), [Plugin Mapbox documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-mapbox/README/) for `setOnCameraMoveStartedListener` |

| Ref                 | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| ------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| getCameraCoordinate |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| setCameraCoordinate |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| getProviderName     |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| takeSnapshot        |         ✅         |           ✅           |       ✅       |        ❌         |       ✅       |      ✅       |

</details>

### Marker

<details>
  <summary>Show details</summary>

| Props                 | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| --------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| position              |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| title                 |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      🟨       |
| clickable             |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      🟨       |
| draggable             |         ✅         |           ✅           |       ✅       |        ❌         |       ✅       |      ✅       |
| anchor                |         ✅         |           ✅           |       🟨       |        🟨         |       ✅       |      ❌       |
| infoWindowAnchor      |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| alpha                 |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| snippet               |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      🟨       |
| isVisible             |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| isFlat                |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| rotation              |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| backgroundColor       |         ✅         |           ❌           |       ✅       |        ✅         |       ✅       |      ✅       |
| markerZIndex          |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ✅       |
| icon                  |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| consumeMarkerClicks   |         ✅         |           ✅           |       ✅       |        ✅         |       ❌       |      ❌       |
| onPress               |         🟨         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| onDragStart           |         ✅         |           ✅           |       ✅       |        ❌         |       ✅       |      ✅       |
| onDrag                |         ✅         |           ✅           |       ✅       |        ❌         |       ✅       |      ✅       |
| onDragEnd             |         ✅         |           ✅           |       ✅       |        ❌         |       ✅       |      ✅       |
| onInfoWindowPress     |         ✅         |           ✅           |       ✅       |        ✅         |       ❌       |      ✅       |
| onInfoWindowLongPress |         ✅         |           ✅           |       ✅       |        ✅         |       ❌       |      ❌       |
| onInfoWindowClose     |         🟨         |           ✅           |       ✅       |        ✅         |       ❌       |      ❌       |
| onInfoWindowOpen      |         🟨         |           ✅           |       ✅       |        ✅         |       ❌       |      ❌       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| anchor | On Mapbox and Azure Maps providers, values are discretized as described in - respectively - the OMH Android SDK [Plugin Mapbox documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-mapbox/README/) and the OMH Android SDK [Plugin AzureMaps documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `anchor` |
| onPress | Described in the OMH Android SDK [Plugin GoogleMaps documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-googlemaps/README/) for `setOnMarkerClickListener` |
| onInfoWindowClose, onInfoWindowOpen | Described in the OMH Android SDK [Plugin GoogleMaps documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-googlemaps/README/) for `setOnInfoWindowOpenStatusChangeListener` |
| title, snippet | Described in OMH iOS [Plugin AppleMaps documentation](https://openmobilehub.github.io/react-native-omh-maps/docs/apple) for `title` and `snippet` |

| Ref            | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| -------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| showInfoWindow |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| hideInfoWindow |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |

For advanced usage of `OmhMarker`, see the [Advanced Usage](https://openmobilehub.github.io/react-native-omh-maps/docs/advanced-usage) section.

</details>

### Polyline

<details>
  <summary>Show details</summary>

| Props                 | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| --------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| points                |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| clickable             |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| color                 |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| width                 |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| isVisible             |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| zIndex                |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ❌       |
| jointType             |         ✅         |           ❌           |       ✅       |        ✅         |       ❌       |      ✅       |
| pattern               |         ✅         |           ❌           |       ❌       |        🟨         |       ❌       |      🟨       |
| onPolylineClick       |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| consumePolylineClicks |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| spans                 |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ❌       |
| cap                   |         ✅         |           🟨           |       ✅       |        🟨         |       ❌       |      🟨       |
| startCap              |         ✅         |           ❌           |       ❌       |        ❌         |       ❌       |      ❌       |
| endCap                |         ✅         |           ❌           |       ❌       |        ❌         |       ❌       |      ❌       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| pattern | Described in the OMH Android SDK [Plugin AzureMaps documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-azuremaps/README/) and OMH iOS [Plugin AppleMaps documentation](https://openmobilehub.github.io/react-native-omh-maps/docs/apple) for `pattern` |
| cap | Described in the OMH Android SDK [Plugin OpenStreetMap documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-openstreetmap/README/), [Plugin AzureMaps documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `setCap` and OMH iOS [Plugin AppleMaps documentation](https://openmobilehub.github.io/react-native-omh-maps/docs/apple) for `cap` |

</details>

### Polygon

<details>
  <summary>Show details</summary>

| Props                | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| -------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| outline              |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| clickable            |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| strokeColor          |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| fillColor            |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| holes                |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| strokeWidth          |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| isVisible            |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| zIndex               |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ❌       |
| strokeJointType      |         ✅         |           ❌           |       ✅       |        ✅         |       ❌       |      🟨       |
| strokePattern        |         ✅         |           ❌           |       ❌       |        🟨         |       ❌       |      🟨       |
| onPolygonClick       |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| consumePolygonClicks |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| strokeJointType | Described in the OMH iOS [Plugin AppleMaps documentation](https://openmobilehub.github.io/react-native-omh-maps/docs/apple) for `strokeJointType` |
| strokePattern | Described in the OMH Android SDK [Plugin AzureMaps documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-azuremaps/README/) and OMH iOS [Plugin AppleMaps documentation](https://openmobilehub.github.io/react-native-omh-maps/docs/apple) for `strokePattern` |

</details>

## Contributing

- [Overview](https://openmobilehub.github.io/react-native-omh-maps/docs/contributing)
- [Issues](https://github.com/openmobilehub/react-native-omh-maps/issues)
- [PRs](https://github.com/openmobilehub/react-native-omh-maps/pulls)

## License

```
Copyright 2023 Open Mobile Hub

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
