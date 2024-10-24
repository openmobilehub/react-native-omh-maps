# OMH Maps Sample Application

The Sample App showcases the capabilities of the OMH Maps plugins, featuring all available providers for the specific operating system.

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.


## Step 1 Setup

#### Clone the repo and install all required dependencies

```bash
git clone https://github.com/openmobilehub/react-native-omh-maps.git
cd apps/sample-app
# using yarn
yarn install
```

#### Create secrets files:

:::info[Prerequisites]

Most of the providers require some API Keys to be created before when one wants to use the Sample App. 
Please refer to our [Getting Started docs](https://openmobilehub.github.io/react-native-omh-maps/docs/getting-started) on how one can create them for given provider.  

:::

  
Create a new file in `apps/sample-app/ios` called: `Secrets.xcconfig` and add Google Maps API key like this:

```
GOOGLE_MAPS_API_KEY = YOUR_GOOGLE_MAPS_API_KEY
```

Create a new file in `sample-app/android` called `local.properties` and add API keys for Google Maps, Mapbox, Azure Maps like this:

```
GOOGLE_MAPS_API_KEY = YOUR_GOOGLE_MAPS_API_KEY
MAPBOX_PUBLIC_TOKEN = YOUR_MAPBOX_MAPS_PUBLIC_API_KEY
MAPBOX_DOWNLOADS_TOKEN = YOUR_MAPBOX_MAPS_API_SECRET_KEY
AZURE_MAPS_SUBSCRIPTION_KEY = YOUR_AZURE_MAPS_API_KEY
```

_Note: To run iOS application, there are two additional steps:_

```bash
cd sample-app/
bundle install
bundle exec pod install --project-directory=./ios
```

## Step 2: Start your Application

- Let Metro Bundler run in its _own_ terminal. 
```bash
#start Metro
yarn start
```

- Run the app:
Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using Yarn
yarn android
```

### For iOS

```bash
# using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run OMH Maps Sample App. :partying_face:
