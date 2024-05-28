
---

## Platforms

|  Platform  |  Supported  |
|:----------:|:-----------:|
|  Android   |      ✅      |
|    iOS     |      ✅      |

## Installation

### Android

```bash
yarn add @openmobilehub/maps-plugin-googlemaps
```

### iOS

No additional steps are required.

## Configuration

:::info[Prerequisites]

Each plugin requires you to follow the `@openmobilehub/maps-core` setup guide. You can find it [here](/docs/core).

:::

### Credentials

1. Create your API key according to the [official documentation](https://developers.google.com/maps/documentation/android-sdk/get-api-key).

#### Android

2. Add the following metadata tag to your `AndroidManifest.xml` file:

```xml
<manifest ...>
   <application ...>
      ...
      <meta-data
         android:name="com.google.android.geo.API_KEY"
         android:value="<YOUR_API_KEY>"/>
   </application>
</manifest>
```

3. [Optional] You can use Secrets Gradle Plugin to protect your API key. Read more about it [here](https://developers.google.com/maps/documentation/android-sdk/secrets-gradle-plugin).
4. [Optional] If you plan to use location services, you need to add the following permissions to your `AndroidManifest.xml` file:
```xml
<manifest ...>
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <application ...>
      ...
   </application>
</manifest>
```

#### iOS

2. This plugin uses `react-native-maps` underneaths, so please complete its [iOS setup guide](https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md#enabling-google-maps).

## Usage

Before interacting with any maps plugin, it is necessary to initialize the maps module.

```typescript
import {OmhMapView, OmhMapsModule, OmhMapsGoogleMapsIOSProvider} from '@openmobilehub/maps-core';
import {OmhMapsGoogleMapsProvider} from '@openmobilehub/maps-plugin-googlemaps';
import {OmhMapsOpenStreetMapProvider} from '@openmobilehub/maps-plugin-openstreetmap';

// You can use different providers for iOS and Android.
// For Android, you can use different providers for devices with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  gmsProvider: OmhMapsGoogleMapsProvider,
  nonGmsProvider: OmhMapsOpenStreetMapProvider, // <- Note: Google Maps is not available on devices without Google Play Services.
  iosProvider: OmhMapsGoogleMapsIOSProvider,
});

const App = () => {
  return <OmhMapView />;
}
```

### Usage Guide

Interacting with the Google Maps provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://www.openmobilehub.com/react-native-omh-maps/docs/getting-started) guide.

## Parity Matrix

The below matrix presents the compatibility matrix, denoting support levels for each of the functionalities across platforms.

Legend of support levels:

| Support level       | Symbol |
| ------------------- | :----: |
| Fully supported     |   ✅   |
| Partially supported |   🟨   |
| Not supported       |   ❌   |

### OmhMapView

| Props               | Android | iOS |
|---------------------|:-------:|:---:|
| mapStyle            |    ✅    |  ✅  |
| rotateEnabled       |    ✅    |  ✅  |
| zoomEnabled         |    ✅    |  ✅  |
| myLocationEnabled   |    ✅    |  ✅  |
| onMapReady          |    ✅    |  ✅  |
| onMapLoaded         |    ✅    |  ✅  |
| onCameraIdle        |    ✅    |  ✅  |
| onMyLocationClicked |    ✅    |  ✅  |
| onCameraMoveStarted |    ✅    |  ✅  |


| Ref                 | Android | iOS |
|---------------------|:-------:|:---:|
| getCameraCoordinate |    ✅    |  ✅  |
| setCameraCoordinate |    ✅    |  ✅  |
| getProviderName     |    ✅    |  ✅  |
| takeSnapshot        |    ✅    |  ✅  |

### OmhMarker

| Props                 |      Android      |      iOS      |
|-----------------------|:-----------------:|:-------------:|
| position              |         ✅         |       ✅       |
| title                 |         ✅         |       ✅       |
| clickable             |         ✅         |       ✅       |
| draggable             |         ✅         |       ✅       |
| anchor                |         ✅         |       ✅       |
| infoWindowAnchor      |         ✅         |       ✅       |
| alpha                 |         ✅         |       ✅       |
| snippet               |         ✅         |       ✅       |
| isVisible             |         ✅         |       ✅       |
| isFlat                |         ✅         |       ✅       |
| rotation              |         ✅         |       ✅       |
| backgroundColor       |         ✅         |       ✅       |
| markerZIndex          |         ✅         |       ✅       |
| icon                  |         ✅         |       ✅       |
| consumeMarkerClicks   |         ✅         |       ❌       |
| onPress               |         🟨         |       ✅       |
| onDragStart           |         ✅         |       ✅       |
| onDrag                |         ✅         |       ✅       |
| onDragEnd             |         ✅         |       ✅       |
| onInfoWindowPress     |         ✅         |       ❌       |
| onInfoWindowLongPress |         ✅         |       ❌       |
| onInfoWindowClose     |         🟨         |       ❌       |
| onInfoWindowOpen      |         🟨         |       ❌       |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| onPress | Described in the OMH Android SDK [Plugin GoogleMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-googlemaps/README/) for `setOnMarkerClickListener` |
| onInfoWindowClose, onInfoWindowOpen | Described in the OMH Android SDK [Plugin GoogleMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-googlemaps/README/) for `setOnInfoWindowOpenStatusChangeListener` |

| Ref            |      Android      |      iOS      |
|----------------|:-----------------:|:-------------:|
| showInfoWindow |         ✅         |       ✅       |
| hideInfoWindow |         ✅         |       ✅       |

For advanced usage of `OmhMarker`, see the [Advanced Usage](https://www.openmobilehub.com/react-native-omh-maps/docs/advanced-usage) section.

### OmhPolyline

| Props                 | Android |   iOS   |
|-----------------------|:-------:|:-------:|
| points                |    ✅    |    ✅    |
| clickable             |    ✅    |    ✅    |
| color                 |    ✅    |    ✅    |
| width                 |    ✅    |    ✅    |
| isVisible             |    ✅    |    ✅    |
| zIndex                |    ✅    |    ✅    |
| jointType             |    ✅    |    ❌    |
| pattern               |    ✅    |    ❌    |
| onPolylineClick       |    ✅    |    ✅    |
| consumePolylineClicks |    ✅    |    ✅    |
| spans                 |    ✅    |    ✅    |
| cap                   |    ✅    |    ❌    |
| startCap              |    ✅    |    ❌    |
| endCap                |    ✅    |    ❌    |

### OmhPolygon

| Props                | Android | iOS |
|----------------------|:-------:|:---:|
| outline              |    ✅    |  ✅  |
| clickable            |    ✅    |  ✅  |
| strokeColor          |    ✅    |  ✅  |
| fillColor            |    ✅    |  ✅  |
| holes                |    ✅    |  ✅  |
| strokeWidth          |    ✅    |  ✅  |
| isVisible            |    ✅    |  ✅  |
| zIndex               |    ✅    |  ✅  |
| strokeJointType      |    ✅    |  ❌  |
| strokePattern        |    ✅    |  ❌  |
| onPolygonClick       |    ✅    |  ✅  |
| consumePolygonClicks |    ✅    |  ✅  |

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

