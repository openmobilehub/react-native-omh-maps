import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Subheading } from 'react-native-paper';

import {
  MarkerDragEndEvent,
  MarkerDragEvent,
  MarkerDragStartEvent,
  OmhInfoWindowConstants,
  OmhMapView,
  OmhMapViewRef,
  OmhMarker,
  OmhMarkerConstants,
} from '@omh/react-native-maps-core';

import { Anchor } from '../../../../packages/core/src/components/marker/RNOmhMapsMarkerNativeComponent';
import { PanelCheckbox } from '../../components/controls/PanelCheckbox';
import Slider from '../../components/controls/Slider';
import useLogger from '../../hooks/useLogger';
import useSnackbar from '../../hooks/useSnackbar';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';
import { formatPosition } from '../../utils/converters';
import { MarkerIWTitles } from './MarkerMapScreen';
import {
  iOSProvidersWithout,
  isFeatureSupported,
} from '../../utils/SupportUtils';
import ANDROID_SUPPORTED_PROVIDERS = Constants.Demo.ANDROID_SUPPORTED_PROVIDERS;

const getSupportedFeatures = (currentMapProvider?: string) => {
  return {
    infoWindowAnchor: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? iOSProvidersWithout(['Apple'])
        : ANDROID_SUPPORTED_PROVIDERS
    ),
    clickable: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? iOSProvidersWithout(['Apple'])
        : ANDROID_SUPPORTED_PROVIDERS
    ),
    rotation: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? iOSProvidersWithout(['Apple'])
        : ANDROID_SUPPORTED_PROVIDERS
    ),
    anchor: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? iOSProvidersWithout(['Apple'])
        : ANDROID_SUPPORTED_PROVIDERS
    ),
    calloutCallbacks: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? iOSProvidersWithout(['Google', 'Apple'])
        : ANDROID_SUPPORTED_PROVIDERS
    ),
  };
};

export const InfoWindowScreen = () => {
  const logger = useLogger('InfoWindowScreen');
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const [supportedFeatures, setSupportedFeatures] = useState(
    getSupportedFeatures()
  );
  // IW properties
  const [snippetVisible, setSnippetVisible] = useState(false);
  const [IWAnchor, setIWAnchor] = useState<Anchor>({
    u: OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE.u,
    v: OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE.v,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: Constants.Maps.GREENWICH_COORDINATE.latitude,
    longitude: Constants.Maps.GREENWICH_COORDINATE.longitude,
  });

  // demo behaviour
  const [toggleIWOnMarkerClick, setToggleIWOnMarkerClick] = useState(true);
  const [hideIWOnClick, setHideIWOnClick] = useState(
    supportedFeatures.calloutCallbacks
  );
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  // marker properties
  const [markerVisible, setMarkerVisible] = useState(true);
  const [markerClickable, setMarkerClickable] = useState(true);
  const [markerRotation, setMarkerRotation] = useState(0);
  const [markerAnchor, setMarkerAnchor] = useState<Anchor>({
    u: OmhMarkerConstants.ANCHOR_CENTER.u,
    v: OmhMarkerConstants.ANCHOR_CENTER.v,
  });

  const onCustomizableMarkerDragStart = useCallback(
    (event: MarkerDragStartEvent) => {
      const {
          position: { latitude, longitude },
        } = event.nativeEvent,
        message = `Marker has started being dragged from: ${formatPosition({ latitude, longitude })}`;

      logger.log(message);

      showSnackbar(message);
    },
    [logger, showSnackbar]
  );

  const onCustomizableMarkerDrag = useCallback(
    (event: MarkerDragEvent) => {
      const {
        position: { latitude, longitude },
      } = event.nativeEvent;

      logger.log(
        `Marker has been dragged to: ${formatPosition({ latitude, longitude })}`
      );
    },
    [logger]
  );

  const onCustomizableMarkerDragEnd = useCallback(
    (event: MarkerDragEndEvent) => {
      const {
          position: { latitude, longitude },
        } = event.nativeEvent,
        message = `Customizable has finished being dragged at: ${formatPosition({ latitude, longitude })}`;

      logger.log(message);

      showSnackbar(message);

      setMarkerPosition({ latitude, longitude });
    },
    [logger, showSnackbar]
  );

  useEffect(() => {
    setHideIWOnClick(supportedFeatures.calloutCallbacks);
  }, [supportedFeatures.calloutCallbacks]);

  return (
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView
          ref={omhMapRef}
          onMapLoaded={() => {
            logger.log('OmhMapView has been loaded');
          }}
          onMapReady={() => {
            logger.log("OmhMapView's OmhMap has become ready");

            const providerName = omhMapRef.current?.getProviderName();

            setSupportedFeatures(getSupportedFeatures(providerName));

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              15.0
            );
          }}>
          <OmhMarker
            title={MarkerIWTitles.CONFIGURABLE_TEST_MARKER}
            position={markerPosition}
            snippet={
              snippetVisible
                ? 'A sample snippet with long description'
                : undefined
            }
            draggable
            onDragStart={onCustomizableMarkerDragStart}
            onDrag={onCustomizableMarkerDrag}
            onDragEnd={onCustomizableMarkerDragEnd}
            isVisible={markerVisible}
            clickable={markerClickable}
            rotation={markerRotation}
            anchor={markerAnchor}
            showInfoWindow={showInfoWindow}
            onInfoWindowPress={() => {
              if (hideIWOnClick) {
                setShowInfoWindow(false);
              } else {
                showSnackbar('Info window pressed');
              }
            }}
            onInfoWindowLongPress={() => {
              showSnackbar('Info window long-pressed');
            }}
            onInfoWindowOpen={() => {
              showSnackbar('Info window has been opened');
              setShowInfoWindow(true); // this handles synchronizing the state variable with actual IW state
            }}
            onInfoWindowClose={() => {
              showSnackbar('Info window has been closed');
              setShowInfoWindow(false); // this handles synchronizing the state variable with actual IW state
            }}
            onPress={() => {
              if (toggleIWOnMarkerClick) {
                setShowInfoWindow(!showInfoWindow);
              }
            }}
            infoWindowAnchor={IWAnchor}
            consumeMarkerClicks
          />
        </OmhMapView>
      </View>

      <View style={demoStyles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={
            demoStyles.demoControlsScrollViewContentContainer
          }>
          <Subheading style={demoStyles.centeredHeading}>
            Info window properties
          </Subheading>

          <PanelCheckbox
            label="Snippet"
            value={snippetVisible}
            onValueChange={setSnippetVisible}
          />

          <Slider
            disabled={!supportedFeatures.infoWindowAnchor}
            label={`Info window anchor U: ${(IWAnchor.u * 100).toFixed(0)}%`}
            onChange={u =>
              setIWAnchor({
                ...IWAnchor,
                u,
              })
            }
            defaultValue={OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE.u}
            step={0.01}
            minimumValue={OmhInfoWindowConstants.IW_ANCHOR_LEFT_ABOVE.u}
            maximumValue={OmhInfoWindowConstants.IW_ANCHOR_RIGHT_ABOVE.u}
          />

          <Slider
            disabled={!supportedFeatures.infoWindowAnchor}
            label={`Info window anchor V: ${(IWAnchor.v * 100).toFixed(0)}%`}
            onChange={v =>
              setIWAnchor({
                ...IWAnchor,
                v,
              })
            }
            defaultValue={OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE.v}
            step={0.01}
            minimumValue={OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE.v}
            maximumValue={OmhInfoWindowConstants.IW_ANCHOR_CENTER_BELOW.v}
          />

          <Subheading style={demoStyles.centeredHeading}>
            Demo behaviour
          </Subheading>

          <PanelCheckbox
            enabled={supportedFeatures.calloutCallbacks}
            label="Info win. toggles on marker click"
            value={toggleIWOnMarkerClick}
            onValueChange={setToggleIWOnMarkerClick}
          />

          <PanelCheckbox
            enabled={supportedFeatures.calloutCallbacks}
            label="Info win. hides on click"
            value={hideIWOnClick}
            onValueChange={setHideIWOnClick}
          />

          <Subheading style={demoStyles.centeredHeading}>
            Imperative usage
          </Subheading>

          <Button
            mode="contained"
            style={styles.button}
            disabled={!(!showInfoWindow || !supportedFeatures.calloutCallbacks)}
            onPress={() => {
              setShowInfoWindow(true);
            }}>
            Open info window
          </Button>

          <Button
            mode="contained"
            style={styles.button}
            disabled={!(showInfoWindow || !supportedFeatures.calloutCallbacks)}
            onPress={() => {
              setShowInfoWindow(false);
            }}>
            Close info window
          </Button>

          <Subheading style={demoStyles.centeredHeading}>
            Marker properties
          </Subheading>

          <PanelCheckbox
            label="Visible"
            value={markerVisible}
            onValueChange={setMarkerVisible}
          />

          <PanelCheckbox
            enabled={supportedFeatures.clickable}
            label="Clickable"
            value={markerClickable}
            onValueChange={setMarkerClickable}
          />

          <Slider
            disabled={!supportedFeatures.rotation}
            label={`Rotation: ${markerRotation.toFixed(0)}°`}
            onChange={zIndex => setMarkerRotation(zIndex)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />

          <Slider
            disabled={!supportedFeatures.anchor}
            label={`Anchor U: ${(markerAnchor.u * 100).toFixed(0)}%`}
            onChange={u =>
              setMarkerAnchor({
                ...markerAnchor,
                u,
              })
            }
            defaultValue={OmhMarkerConstants.ANCHOR_CENTER.u}
            step={0.01}
            minimumValue={OmhMarkerConstants.ANCHOR_RIGHT.u}
            maximumValue={OmhMarkerConstants.ANCHOR_LEFT.u}
          />

          <Slider
            disabled={!supportedFeatures.anchor}
            label={`Anchor V: ${(markerAnchor.v * 100).toFixed(0)}%`}
            onChange={v =>
              setMarkerAnchor({
                ...markerAnchor,
                v,
              })
            }
            defaultValue={OmhMarkerConstants.ANCHOR_CENTER.v}
            step={0.01}
            minimumValue={OmhMarkerConstants.ANCHOR_BOTTOM.v}
            maximumValue={OmhMarkerConstants.ANCHOR_TOP.v}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
  },
});

export default InfoWindowScreen;
