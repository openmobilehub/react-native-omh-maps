
---

## Installation

```bash
yarn add @openmobilehub/maps-core
```

### Android

No additional steps are required.

### iOS

Install peer dependencies:

```bash
yarn add react-native-maps @react-native-community/geolocation
```

Install pods:

```bash
cd ios && pod install
```
or
```bash
bundle install
bundle exec pod install --project-directory=ios
```

### [Optional] Reduce native application sizes by adjusting autolinking

React Native by default will autolink native dependencies. If you want to prevent this behavior, you can add the following to your `react-native.config.js` (create the file if it doesn't exist):

```javascript
module.exports = {
  dependencies: {
    '@openmobilehub/maps-core': {
      platforms: {
        ios: null,
      },
    },
    '@react-native-community/geolocation': {
      platforms: {
        android: null,
      },
    },
    'react-native-maps': {
      platforms: {
        android: null,
      },
    },
  },
};
```

## Usage

### OmhMapsModule

To render the OmhMapView, you need to first initialize the module by setting up the map providers:

```ts
import {OmhMapsModule} from '@openmobilehub/maps-core';

OmhMapsModule.initialize({
  iosProvider: <PROVIDER_FOR_IOS_DEVICES>,
  gmsProvider: <PROVIDER_FOR_ANDROID_GMS_DEVICES>,
  nonGmsProvider: <PROVIDER_FOR_ANDROID_NON_GMS_DEVICES>,
});
```

Android providers can be imported from the plugin packages and iOS providers from core package, e.g.:

```ts
import {OmhMapsModule, OmhMapsAppleMapsIOSProvider} from '@openmobilehub/maps-core';
import {OmhMapsGoogleMapsProvider} from '@openmobilehub/maps-plugin-googlemaps';
import {OmhMapsOpenStreetMapProvider} from '@openmobilehub/maps-plugin-openstreetmap';

OmhMapsModule.initialize({
  iosProvider: OmhMapsAppleMapsIOSProvider,
  gmsProvider: OmhMapsGoogleMapsProvider,
  nonGmsProvider: OmhMapsOpenStreetMapProvider,
});
```

:::info

Make sure that you follow each provider's setup guide before initializing the module.

:::

Apart from that you can also get an list of all available providers for given OS:

```ts
import {OmhMapsModule} from '@openmobilehub/maps-core';

const providers = OmhMapsModule.getAvailableMapProviders();
```

and get the default provider:

```ts
import {OmhMapsModule} from '@openmobilehub/maps-core';

const provider = OmhMapsModule.getDefaultMapProvider();
```

[API Reference](https://legendary-broccoli-93ze846.pages.github.io/docs/api/modules/openmobilehub_maps_core)

---

### OmhMapsLocationModule

The `OmhMapsLocationModule` provides methods to interact with the device's location services. It can be used to request the current location and get the last known location.

```ts
import {OmhMapsLocationModule} from '@openmobilehub/maps-core';

const currentLocation = await OmhMapsLocationModule.getCurrentLocation();
const lastLocation = await OmhMapsLocationModule.getLastLocation();
```

:::warning

Before using the `OmhMapsLocationModule`, make sure to request the necessary permissions.
Otherwise, the module will throw an [OmhLocationError](https://legendary-broccoli-93ze846.pages.github.io/docs/api/classes/openmobilehub_maps_core.OmhLocationError).
It's recommended to use the [react-native-permissions](https://github.com/zoontek/react-native-permissions) library.

:::

[API Reference](https://legendary-broccoli-93ze846.pages.github.io/docs/api/modules/openmobilehub_maps_core/#omhmapslocationmodule)

---

### OmhMap

Once you have the module initialized, you can use the `OmhMapView` component to render the map:

```tsx
import {OmhMapView} from '@openmobilehub/maps-core';

const App = () => {
  return <OmhMapView />;
}
```

[Api Reference](https://legendary-broccoli-93ze846.pages.github.io/docs/api/modules/openmobilehub_maps_core#omhmapview)

---

### OmhMarker

The `OmhMarker` component can be used to render a marker on the map:

```tsx
import {OmhMapView, OmhMarker} from '@openmobilehub/maps-core';

const coordinate = {latitude: 52.23, longitude: 21.01};

const App = () => {
  return (
    <OmhMapView>
      <OmhMarker coordinate={coordinate} />
    </OmhMapView>
  );
}
```

---

[Api Reference](https://legendary-broccoli-93ze846.pages.github.io/docs/api/modules/openmobilehub_maps_core#omhmarker)

### OmhPolyline

The `OmhPolyline` component can be used to render a polyline on the map:

```tsx
import {OmhMapView, OmhPolyline} from '@openmobilehub/maps-core';

const points= [{latitude: 52.23, longitude: 21.01}, {latitude: 52.24, longitude: 21.02}];

const App = () => {
  return (
    <OmhMapView>
      <OmhPolyline points={points} />
    </OmhMapView>
  );
}
```

---

[Api Reference](https://legendary-broccoli-93ze846.pages.github.io/docs/api/modules/openmobilehub_maps_core#omhpolyline)

### OmhPolygon

The `OmhPolygon` component can be used to render a polygon on the map:

```tsx
import {OmhMapView, OmhPolygon} from '@openmobilehub/maps-core';

const outline = [{latitude: 52.23, longitude: 21.01}, {latitude: 52.24, longitude: 21.02}, {latitude: 52.25, longitude: 21.03}];

const App = () => {
  return (
    <OmhMapView>
      <OmhPolygon outline={outline} />
    </OmhMapView>
  );
}
```

[Api Reference](https://legendary-broccoli-93ze846.pages.github.io/docs/api/modules/openmobilehub_maps_core#omhpolygon)

## License

- See [LICENSE](https://todo.add.link) file.
