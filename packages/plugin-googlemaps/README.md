
---

## Installation

```bash
yarn add @openmobilehub/maps-plugin-googlemaps
```

## Configuration

:::info[Prerequisites]

Each plugin requires you to follow the `@openmobilehub/maps-core` setup guide. You can find it [here](/docs/core).

:::

### Credentials

1. Create your API key according to the [official documentation](https://developers.google.com/maps/documentation/android-sdk/get-api-key).
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
import {OmhMapsModule} from '@openmobilehub/maps-core';
import {OmhMapsGooglemapsProvider} from '@openmobilehub/maps-plugin-googlemaps';
import {OmhMapsOpenStreetMapProvider} from '@openmobilehub/maps-plugin-openstreetmap';

// You can use different providers for apps with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  gmsProvider: OmhMapsGooglemapsProvider, 
  nonGmsProvider: OmhMapsOpenStreetMapProvider, // <- Note: Google Maps is not available on devices without Google Play Services.
});

const App = () => {
  return <OmhMapView />;
}
```

### Usage Guide

Interacting with the Google Maps provider follows the same pattern as other providers, as they all implement the same interface. For a comprehensive list of available modules, components, and props, refer to the [Quick Start](https://todo.add.link) guide.

## Parity Matrix

:::info

TODO

:::

## License

- See [LICENSE](https://todo.add.link)