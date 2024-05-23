
---

## Platforms

|  Platform  |  Supported  |
|:----------:|:-----------:|
|  Android   |      ✅      |
|    iOS     |      ❌      |

## Installation

```bash
yarn add @openmobilehub/maps-plugin-azuremaps
```

## Configuration

:::info[Prerequisites]

Each plugin requires you to follow the `@openmobilehub/maps-core` setup guide. You can find it [here](/docs/core).

:::

### Credentials

1. Configure your Azure Maps account and get the subscription key according to the [official documentation](https://learn.microsoft.com/en-us/azure/azure-maps/quick-android-map?pivots=programming-language-kotlin#create-an-azure-maps-account) and save it for later use.
2. Add this code in your App:
```typescript
  // Credentials setup must be done before using the map view.
  OmhMapsPluginAzureMapsModule.setSubscriptionKey('<YOUR_SUBSCRIPTION_KEY>');
```


### Maven

Add the following maven setup to your `android/build.gradle` file:

```groovy
// ...
allprojects {
    repositories { repositoryHandler ->
        google()
        mavenCentral()
        // Azure Maps Maven repository
        maven {
            url = project.uri("https://atlas.microsoft.com/sdk/android")
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
import {OmhMapsAzureMapsProvider, OmhMapsPluginAzureMapsModule} from '@openmobilehub/maps-plugin-azuremaps';

// You can use different providers for iOS and Android.
// For Android, you can use different providers for devices with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  gmsProvider: OmhMapsAzureMapsProvider,
  nonGmsProvider: OmhMapsAzureMapsProvider,
  iosProvider: OmhMapsAppleMapsIOSProvider,
});

// Credentials setup must be done before using the map view.
OmhMapsPluginAzureMapsModule.setSubscriptionKey('<YOUR_SUBSCRIPTION_KEY>');

const App = () => {
  return <OmhMapView />;
}
```

### Usage Guide

Interacting with the Azure Maps provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://todo.add.link) guide.

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
| scaleFactor         |     ✅     |
| mapStyle            |     ❌     |
| rotateEnabled       |     ❌     |
| zoomEnabled         |     ✅     |
| myLocationEnabled   |     ✅     |
| onMapReady          |     ✅     |
| onMapLoaded         |     ✅     |
| onCameraIdle        |     ✅     |
| onMyLocationClicked |     ✅     |
| onCameraMoveStarted |     ✅     |

| Ref                 | Supported |
|---------------------|:---------:|
| getCameraCoordinate |     ✅     |
| setCameraCoordinate |     ✅     |
| getProviderName     |     ✅     |
| takeSnapshot        |     ❌     |

### OmhMarker

| Props                 | Supported |
|-----------------------|:---------:|
| position              |     ✅     |
| title                 |     ✅     |
| clickable             |     ✅     |
| draggable             |     ❌     |
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
| onDragStart           |     ❌     |
| onDrag                |     ❌     |
| onDragEnd             |     ❌     |
| onInfoWindowPress     |     ✅     |
| onInfoWindowLongPress |     ✅     |
| onInfoWindowClose     |     ✅     |
| onInfoWindowOpen      |     ✅     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| anchor | On Azure Maps provider, values are discretized as described in the OMH Android SDK [Plugin AzureMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `anchor` |

| Ref            | Supported |
|----------------|:---------:|
| showInfoWindow |     ✅     |
| hideInfoWindow |     ✅     |

For advanced usage of `OmhMarker`, see the [Advanced Usage](https://legendary-broccoli-93ze846.pages.github.io/docs/advanced-usage) section.

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
| pattern               |     🟨     |
| onPolylineClick       |     ✅     |
| consumePolylineClicks |     ✅     |
| spans                 |     ❌     |
| cap                   |     🟨     |
| startCap              |     ❌     |
| endCap                |     ❌     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| pattern | Described in the OMH Android SDK [Plugin AzureMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `pattern` |
| cap | Described in the OMH Android SDK [Plugin AzureMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `setCap` |

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
| strokePattern        |     🟨     |
| onPolygonClick       |     ✅     |
| consumePolygonClicks |     ✅     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| strokePattern | Described in the OMH Android SDK [Plugin AzureMaps documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-azuremaps/README/) for `strokePattern` |


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

