
---

## Platforms

|  Platform  |  Supported  |
|:----------:|:-----------:|
|  Android   |      ✅      |
|    iOS     |      ❌      |

## Installation

```bash
yarn add @openmobilehub/maps-plugin-openstreetmap
```

## Configuration

:::info[Prerequisites]

Each plugin requires you to follow the `@openmobilehub/maps-core` setup guide. You can find it [here](https://todo.add.link).

:::

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
import {OmhMapsOpenStreetMapProvider} from '@openmobilehub/maps-plugin-openstreetmap';

// You can use different providers for iOS and Android.
// For Android, you can use different providers for devices with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  gmsProvider: OmhMapsOpenStreetMapProvider,
  nonGmsProvider: OmhMapsOpenStreetMapProvider,
  iosProvider: OmhMapsAppleMapsIOSProvider,
});

const App = () => {
  return <OmhMapView />;
}
```

### Usage Guide

Interacting with the Openstreetmap provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://todo.add.link) guide.

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
| onCameraMoveStarted | Described in the OMH Android SDK [Plugin OpenStreetMap documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-openstreetmap/README/) for `setOnCameraMoveStartedListener` |

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
| anchor                |     ✅     |
| infoWindowAnchor      |     ✅     |
| alpha                 |     ✅     |
| snippet               |     ✅     |
| isVisible             |     ✅     |
| isFlat                |     ✅     |
| rotation              |     ✅     |
| backgroundColor       |     ❌     |
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
| jointType             |     ❌     |
| pattern               |     ❌     |
| onPolylineClick       |     ✅     |
| consumePolylineClicks |     ✅     |
| spans                 |     ❌     |
| cap                   |     🟨     |
| startCap              |     ❌     |
| endCap                |     ❌     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| cap | Described in the OMH Android SDK [Plugin OpenStreetMap documentation](https://www.openmobilehub.com/android-omh-maps/advanced-docs/plugin-openstreetmap/README/) for `setCap` |

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
| strokeJointType      |     ❌     |
| strokePattern        |     ❌     |
| onPolygonClick       |     ✅     |
| consumePolygonClicks |     ✅     |


## License

- See [LICENSE](https://todo.add.link)
