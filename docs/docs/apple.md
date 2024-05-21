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

## Installation


## Configuration

### Credentials

## Usage

### Usage Guide

## Parity Matrix

The below matrix presents the compatibility matrix, denoting support levels for each of the functionalities.

Legend of support levels:

| Support level       | Symbol |
|---------------------|:------:|
| Fully supported     |   ✅    |
| Partially supported |   🟨   |
| Not supported       |   ❌    |

### OmhMapView

| Props               | Supported |
|---------------------|:---------:|
| scaleFactor         |     ✅     |
| mapStyle            |     ❌     |
| rotateEnabled       |     ❌     |
| zoomEnabled         |     ✅     |
| myLocationEnabled   |    🟨     |
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
| clickable             |    🟨     |
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
| clickable             |     ❌     |
| color                 |     ✅     |
| width                 |     ✅     |
| isVisible             |     ✅     |
| zIndex                |     ❌     |
| jointType             |     ✅     |
| pattern               |     ✅     |
| onPolylineClick       |     ✅     |
| consumePolylineClicks |     ✅     |
| spans                 |     ✅     |
| cap                   |     ✅     |
| startCap              |     ✅     |
| endCap                |     ✅     |

### OmhPolygon

| Props                | Supported |
|----------------------|:---------:|
| outline              |     ✅     |
| clickable            |     ❌     |
| strokeColor          |     ✅     |
| fillColor            |     ✅     |
| holes                |     ✅     |
| strokeWidth          |     ✅     |
| isVisible            |     ✅     |
| zIndex               |     ❌     |
| strokeJointType      |     ✅     |
| strokePattern        |     ✅     |
| onPolygonClick       |     ✅     |
| consumePolygonClicks |     ✅     |


## License

- See [LICENSE](https://todo.add.link)
