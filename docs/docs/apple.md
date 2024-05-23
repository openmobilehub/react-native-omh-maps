---
id: 'apple'
title: 'Apple'
sidebar_label: 'Apple'
---

## Platforms

|  Platform  | Supported  |
|:----------:|:----------:|
|  Android   |     ❌      |
|    iOS     |     ✅      |


## Configuration

:::info[Prerequisites]

Each plugin requires you to follow the `@openmobilehub/maps-core` setup guide. You can find it [here](/docs/core).

:::

## Usage

Before interacting with any maps plugin, it is necessary to initialize the maps module.

```typescript
import {OmhMapView, OmhMapsModule, OmhMapsAppleMapsIOSProvider} from '@openmobilehub/maps-core';
import {OmhMapsOpenStreetMapProvider} from '@openmobilehub/maps-plugin-openstreetmap';

// You can use different providers for iOS and Android.
// For Android, you can use different providers for devices with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  iosProvider: OmhMapsAppleMapsIOSProvider,
  gmsProvider: OmhMapsOpenStreetMapProvider,
  nonGmsProvider: OmhMapsOpenStreetMapProvider,
});

const App = () => {
  return <OmhMapView />;
}
```

### Usage Guide

Interacting with the Apple Maps provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://todo.add.link) guide.


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
| myLocationEnabled   |     🟨     |
| onMapReady          |     ✅     |
| onMapLoaded         |     ❌     |
| onCameraIdle        |     ✅     |
| onMyLocationClicked |     ✅     |
| onCameraMoveStarted |     ✅     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| myLocationEnabled | On iOS Apple Maps provider, the property only controls the display of user's current location; on this provider, 'move to current location' button is not supported |

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
| clickable             |     🟨     |
| draggable             |     ✅     |
| anchor                |     ❌     |
| infoWindowAnchor      |     ❌     |
| alpha                 |     ❌     |
| snippet               |     ✅     |
| isVisible             |     ✅     |
| isFlat                |     ❌     |
| rotation              |     ❌     |
| backgroundColor       |     ✅     |
| markerZIndex          |     ✅     |
| icon                  |     ❌     |
| consumeMarkerClicks   |     ❌     |
| onPress               |     ✅     |
| onDragStart           |     ✅     |
| onDrag                |     ✅     |
| onDragEnd             |     ✅     |
| onInfoWindowPress     |     ✅     |
| onInfoWindowLongPress |     ❌     |
| onInfoWindowClose     |     ❌     |
| onInfoWindowOpen      |     ❌     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| clickable | On iOS Apple Maps provider, marker is always clickable; property value is ignored. |

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
| pattern | iOS Apple Maps provider only supports alternating dashes and gaps that form the dash pattern. |
| cap |  iOS Apple Maps provider supports BUTT, SQUARE and ROUND caps. Does not support CUSTOM. |

### OmhPolygon

| Props                | Supported |
|----------------------|:---------:|
| outline              |     ✅     |
| clickable            |     ✅     |
| strokeColor          |     ✅     |
| fillColor            |     ✅     |
| holes                |     ❌     |
| strokeWidth          |     ✅     |
| isVisible            |     ✅     |
| zIndex               |     ❌     |
| strokeJointType      |     🟨     |
| strokePattern        |     🟨     |
| onPolygonClick       |     ✅     |
| consumePolygonClicks |     ✅     |

Comments for partially supported properties:
| Property | Comments |
| --------------------- | -------- |
| strokeJointType | iOS Apple Maps provider supports ROUND and BEVEL. Does not support MITER. |
| strokePattern | iOS Apple Maps provider only supports alternating dashes and gaps that form the dash pattern. |

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

