<p align="center">
  <a href="https://www.openmobilehub.com/">
    <img width="160px" src="https://www.openmobilehub.com/images/logo/omh_logo.png"/><br/>
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

**React Native OMH Maps** eases the process to implement interactive maps in React Native apps on both iOS and Android. Under the hood, for Android it uses the Android [OMH Maps Client Library](https://github.com/openmobilehub/android-omh-maps). Supports both Google Mobile Services (GMS) and non-GMS configurations, with a unified interface for easy incorporation of Google Maps, OpenStreetMap, Mapbox, Azure Maps and other supported third-party maps providers.

## Features

- 📱 GMS and non-GMS support for all maps providers
- 🔗 Identical API across all providers
- 🌱 Easy configuration and setup
- 💨 Lightweight modules

## OMH Maps Modules

This is the main directory of the monorepo for React Native OMH Maps. Below are listed all possible packages that belong to the React Native OMH Maps ecosystem.

To get started, you need to install the [Core package](https://www.openmobilehub.com/react-native-omh-maps/docs/core).

Additionally, you need providers that will be used to render the map (at least one). Their availability depends on both the platform (Android / iOS) and - on Android - the support for and actual availability of GMS.

1. Providers for Android:

| Provider name & docs link                                                               | Supports GMS | Supports non-GMS |
| --------------------------------------------------------------------------------------- | :----------: | :--------------: |
| [Google Maps](https://www.openmobilehub.com/react-native-omh-maps/docs/googlemaps)      |      ✅      |        ✅        |
| [OpenStreetMap](https://www.openmobilehub.com/react-native-omh-maps/docs/openstreetmap) |      ✅      |        ✅        |
| [Mapbox](https://www.openmobilehub.com/react-native-omh-maps/docs/mapbox)               |      ✅      |        ✅        |
| [Azure Maps](https://www.openmobilehub.com/react-native-omh-maps/docs/azuremaps)        |      ✅      |        ✅        |

2. Providers for iOS:

- [Google Maps](https://www.openmobilehub.com/react-native-omh-maps/docs/googlemaps)
- [Apple Maps](https://www.openmobilehub.com/react-native-omh-maps/docs/openstreetmap)

## Compatibility matrix

The below matrix presents the compatibility matrix, denoting support levels for each of the functionalities across all providers.

Legend of support levels:

| Support level       | Symbol |
| ------------------- | :----: |
| Fully supported     |   ✅   |
| Partially supported |   🟨   |
| Not supported       |   ❌   |

### OmhMapView

| Props               | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| ------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| scaleFactor         |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
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
| onCameraMoveStarted | Described in the OMH Android SDK [Plugin OpenStreetMap documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-openstreetmap/README/), [Plugin Mapbox documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-mapbox/README/) for `setOnCameraMoveStartedListener` |

| Ref                 | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| ------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| getCameraCoordinate |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| setCameraCoordinate |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| getProviderName     |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| takeSnapshot        |         ✅         |           ✅           |       ✅       |        ❌         |       ✅       |      ✅       |

### OmhMarker

| Props                 | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| --------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| position              |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| title                 |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| clickable             |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| draggable             |         ✅         |           ✅           |       ✅       |        ❌         |       ?        |       ?       |
| anchor                |         ✅         |           ✅           |       🟨       |        🟨         |       ?        |       ?       |
| infoWindowAnchor      |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| alpha                 |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| snippet               |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| isVisible             |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| isFlat                |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| rotation              |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| backgroundColor       |         ✅         |           ❌           |       ✅       |        ✅         |       ?        |       ?       |
| isInfoWindowShown     |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| markerZIndex          |         ✅         |           ❌           |       ❌       |        ❌         |       ?        |       ?       |
| icon                  |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| consumeMarkerClicks   |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| onPress               |         🟨         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| onDragStart           |         ✅         |           ✅           |       ✅       |        ❌         |       ?        |       ?       |
| onDrag                |         ✅         |           ✅           |       ✅       |        ❌         |       ?        |       ?       |
| onDragEnd             |         ✅         |           ✅           |       ✅       |        ❌         |       ?        |       ?       |
| onInfoWindowPress     |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| onInfoWindowLongPress |         ✅         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| onInfoWindowClose     |         🟨         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |
| onInfoWindowOpen      |         🟨         |           ✅           |       ✅       |        ✅         |       ?        |       ?       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| anchor | On Mapbox and Azure Maps providers, values are discretized as described in - respectively - the OMH Android SDK [Plugin Mapbox documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-mapbox/README/) and the OMH Android SDK [Plugin AzureMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `anchor` |
| onPress | Described in the OMH Android SDK [Plugin GoogleMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-googlemaps/README/) for `setOnMarkerClickListener` |
| onInfoWindowClose, onInfoWindowOpen | Described in the OMH Android SDK [Plugin GoogleMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-googlemaps/README/) for `setOnInfoWindowOpenStatusChangeListener` |

For advanced usage of `OmhMarker`, see the [Advanced Usage](https://www.openmobilehub.com/react-native-omh-maps/docs/advanced-usage) section.

### OmhPolyline

| Props                 | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| --------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| points                |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| clickable             |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| color                 |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| width                 |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| isVisible             |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| zIndex                |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ❌       |
| jointType             |         ✅         |           ❌           |       ✅       |        ✅         |       ❌       |      ✅       |
| pattern               |         ✅         |           ❌           |       ❌       |        🟨         |       ✅       |      ✅       |
| onPolylineClick       |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| consumePolylineClicks |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| spans                 |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ✅       |
| cap                   |         ✅         |           🟨           |       ✅       |        🟨         |       ❌       |      ✅       |
| startCap              |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ✅       |
| endCap                |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ✅       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| pattern | Described in the OMH Android SDK [Plugin AzureMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `pattern` |
| cap | Described in the OMH Android SDK [Plugin OpenStreetMap documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-openstreetmap/README/) for `setCap` |

### OmhPolygon

| Props                | Android GoogleMaps | Android OpenStreetMaps | Android Mapbox | Android AzureMaps | iOS GoogleMaps | iOS AppleMaps |
| -------------------- | :----------------: | :--------------------: | :------------: | :---------------: | :------------: | :-----------: |
| outline              |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| clickable            |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ❌       |
| strokeColor          |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| fillColor            |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| holes                |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| strokeWidth          |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| isVisible            |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| zIndex               |         ✅         |           ❌           |       ❌       |        ❌         |       ✅       |      ❌       |
| strokeJointType      |         ✅         |           ❌           |       ✅       |        ✅         |       ❌       |      ✅       |
| strokePattern        |         ✅         |           ❌           |       ❌       |        🟨         |       ❌       |      ✅       |
| onPolygonClick       |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |
| consumePolygonClicks |         ✅         |           ✅           |       ✅       |        ✅         |       ✅       |      ✅       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| strokePattern | Described in the OMH Android SDK [Plugin AzureMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `strokePattern` |

## Documentation

- [Quick Start](https://www.openmobilehub.com/react-native-omh-maps/docs/getting-started)
- [Reference API](https://www.openmobilehub.com/react-native-omh-maps/docs/api)

## Contributing

- [Overview](https://www.openmobilehub.com/react-native-omh-maps/docs/contributing)
- [Issues](https://github.com/openmobilehub/react-native-omh-maps/issues)
- [PRs](https://github.com/openmobilehub/react-native-omh-maps/pulls)

## License

- See [LICENSE](https://github.com/openmobilehub/react-native-omh-maps/blob/main/LICENSE)
