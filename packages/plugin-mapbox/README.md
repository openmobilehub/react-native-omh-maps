
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

Interacting with the Mapbox provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://todo.add.link) guide.

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
| onCameraMoveStarted | Described in the OMH Android SDK [Plugin Mapbox documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-mapbox/README/) for `setOnCameraMoveStartedListener` |

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
| anchor | On Mapbox provider, values are discretized as described in the OMH Android SDK [Plugin Mapbox documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-mapbox/README/) for `anchor` |

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

- See [LICENSE](https://todo.add.link)
