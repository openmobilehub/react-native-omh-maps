
---

## Platforms

|  Platform  |  Supported  |
|:----------:|:-----------:|
|  Android   |      ✅      |
|    iOS     |      ❌      |

## Installation

```bash
yarn add @openmobilehub/maps-plugin-mapbox
```

## Configuration

:::info[Prerequisites]

Each plugin requires you to follow the `@openmobilehub/maps-core` setup guide. You can find it [here](/docs/core).

:::

### Credentials

1. Configure your secret token according to the [official documentation](https://docs.mapbox.com/android/maps/guides/install/#configure-your-secret-token).
2. Create your public token according to the [official documentation](https://docs.mapbox.com/android/maps/guides/install/#configure-credentials) and save it for later use.
3. Add this code in your App: 
```typescript
  // Credentials setup must be done before using the map view.
  OmhMapsPluginMapboxModule.setPublicToken('<YOUR_PUBLIC_TOKEN>');
```

### Maven

Add the following maven setup to your `android/build.gradle` file:

```groovy
// ...
allprojects {
    repositories { repositoryHandler ->
        google()
        mavenCentral()
        // Mapbox Maven repository
        maven {
            url = uri("https://api.mapbox.com/downloads/v2/releases/maven")
            // Do not change the username below. It should always be "mapbox" (not your username).
            credentials.username = "mapbox"
            // Use the secret token stored in gradle.properties as the password
            credentials.password = providers.gradleProperty("MAPBOX_DOWNLOADS_TOKEN").get()
            authentication { basic(BasicAuthentication) }
        }
    }
}
```

### [Optional] Permissions

If you plan to use location services, you need to add the following permissions to your `AndroidManifest.xml` file:

```xml
<manifest ...>
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <application ...>
      ...
   </application>
</manifest>
```

## Usage

Before interacting with any maps plugin, it is necessary to initialize the maps module.

```typescript
import {OmhMapView, OmhMapsModule, OmhMapsAppleMapsIOSProvider} from '@openmobilehub/maps-core';
import {OmhMapsMapboxProvider, OmhMapsPluginMapboxModule} from '@openmobilehub/maps-plugin-mapbox';

// You can use different providers for iOS and Android.
// For Android, you can use different providers for devices with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  gmsProvider: OmhMapsMapboxProvider,
  nonGmsProvider: OmhMapsMapboxProvider,
  iosProvider: OmhMapsAppleMapsIOSProvider,
});

// Credentials setup must be done before using the map view.
OmhMapsPluginMapboxModule.setPublicToken('<YOUR_PUBLIC_TOKEN>');

const App = () => {
  return <OmhMapView />;
}
```

### Usage Guide

Interacting with the Mapbox provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://openmobilehub.github.io/react-native-omh-maps/docs/getting-started) guide.

<details>
  <summary>Using Azure Maps and Mapbox in single application?</summary>
  
  While using both Azure Maps and Mapbox in a single application, you may face issues with duplicated native dependencies. To resolve this, you have to exclude the duplicated dependency. In `app/build.gradle` add the following code:

  ```gradle
  configurations.all {
    exclude group:  "org.maplibre.gl", module: "android-sdk-geojson"
  }
  ```

</details>

## Parity Matrix

The below matrix presents the compatibility matrix, denoting support levels for each of the functionalities.

Legend of support levels:

| Support level       | Symbol |
| ------------------- | :----: |
| Fully supported     |   ✅   |
| Partially supported |   🟨   |
| Not supported       |   ❌   |

### OmhMapView

| Props               | Supported |
|---------------------|:---------:|
| mapStyle            |     ✅     |
| rotateEnabled       |     ✅     |
| zoomEnabled         |     ✅     |
| myLocationEnabled   |     ✅     |
| onMapReady          |     ✅     |
| onMapLoaded         |     ✅     |
| onCameraIdle        |     ✅     |
| onMyLocationClicked |     ✅     |
| onCameraMoveStarted |     🟨     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| onCameraMoveStarted | Described in the OMH Android SDK [Plugin Mapbox documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-mapbox/README/) for `setOnCameraMoveStartedListener` |

| Ref                 | Supported |
|---------------------|:---------:|
| getCameraCoordinate |     ✅     |
| setCameraCoordinate |     ✅     |
| getProviderName     |     ✅     |
| takeSnapshot        |     ✅     |

### OmhMarker

| Props                 | Supported |
|-----------------------|:---------:|
| position              |     ✅     |
| title                 |     ✅     |
| clickable             |     ✅     |
| draggable             |     ✅     |
| anchor                |     🟨     |
| infoWindowAnchor      |     ✅     |
| alpha                 |     ✅     |
| snippet               |     ✅     |
| isVisible             |     ✅     |
| isFlat                |     ✅     |
| rotation              |     ✅     |
| backgroundColor       |     ✅     |
| markerZIndex          |     ❌     |
| icon                  |     ✅     |
| consumeMarkerClicks   |     ✅     |
| onPress               |     ✅     |
| onDragStart           |     ✅     |
| onDrag                |     ✅     |
| onDragEnd             |     ✅     |
| onInfoWindowPress     |     ✅     |
| onInfoWindowLongPress |     ✅     |
| onInfoWindowClose     |     ✅     |
| onInfoWindowOpen      |     ✅     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| anchor | On Mapbox provider, values are discretized as described in the OMH Android SDK [Plugin Mapbox documentation](https://openmobilehub.github.io/android-omh-maps/advanced-docs/plugin-mapbox/README/) for `anchor` |

| Ref            | Supported |
|----------------|:---------:|
| showInfoWindow |     ✅     |
| hideInfoWindow |     ✅     |

For advanced usage of `OmhMarker`, see the [Advanced Usage](https://openmobilehub.github.io/react-native-omh-maps/docs/advanced-usage) section.

### OmhPolyline

| Props                 | Supported |
|-----------------------|:---------:|
| points                |     ✅     |
| clickable             |     ✅     |
| color                 |     ✅     |
| width                 |     ✅     |
| isVisible             |     ✅     |
| zIndex                |     ❌     |
| jointType             |     ✅     |
| pattern               |     ❌     |
| onPolylineClick       |     ✅     |
| consumePolylineClicks |     ✅     |
| spans                 |     ❌     |
| cap                   |     ✅     |
| startCap              |     ❌     |
| endCap                |     ❌     |

### OmhPolygon

| Props                | Supported |
|----------------------|:---------:|
| outline              |     ✅     |
| clickable            |     ✅     |
| strokeColor          |     ✅     |
| fillColor            |     ✅     |
| holes                |     ✅     |
| strokeWidth          |     ✅     |
| isVisible            |     ✅     |
| zIndex               |     ❌     |
| strokeJointType      |     ✅     |
| strokePattern        |     ❌     |
| onPolygonClick       |     ✅     |
| consumePolygonClicks |     ✅     |


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

