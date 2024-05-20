---
sidebar_position: 1
---

# `OmhMarker` Advanced Usage

## Consuming touch events

In some cases, it may be desired to consume the touch events that occur on a marker to suppress the default behaviour of the provider's implementation and either perform only some custom action, or even prevent any behaviour at all.

For this case, it is only required that the `consumeMarkerClicks` property is set to `true`, e.g.:

```javascript
<OmhMarker consumeMarkerClicks />
```

## Making markers draggable

Markers can be made draggable by setting the `draggable` property to `true`, yet since the marker is a controlled component with respect to the `position` property, it is required to handle the `onDragEnd` event to update the marker's position state variable, e.g.:

```javascript
function MyComponent() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  return (
    <OmhMarker
      draggable
      position={position}
      onDragEnd={event => {
        setPosition(event.nativeEvent.position);
      }}
    />
  );
}
```

:::warning

Neglecting to update the position after a drag event is ended may result in the marker being shown at a position on the map up until the marker updates its underlying native component's position according to the value passed as its `position` property.

:::

For convenience and full flexibility, each of the drag events (`onDragStart`, `onDrag`, `onDragEnd`) provide the `position` property in the `nativeEvent` object, which contains the current position of the marker; for performance reasons, in a typical use case it is not required to update the position of the marker in `onDrag`, which may be invoked frequently.

## Known limitations

Custom info window views are not supported by the React Native OMH Maps library.
