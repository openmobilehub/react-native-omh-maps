import convert from 'color-convert';
import _ from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { Subheading } from 'react-native-paper';

import {
  MarkerDragEndEvent,
  MarkerDragEvent,
  MarkerDragStartEvent,
  OmhAnchor,
  OmhMapView,
  OmhMapViewRef,
  OmhMarker,
  OmhMarkerConstants,
  OmhMarkerRef,
} from '@openmobilehub/maps-core';

import soccerBallIcon from '../../assets/img/soccer_ball.bmp';
import { PanelCheckbox } from '../../components/controls/PanelCheckbox';
import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import useLogger from '../../hooks/useLogger';
import useSnackbar from '../../hooks/useSnackbar';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';
import {
  androidProvidersWithout,
  iOSProvidersWithout,
  isFeatureSupported,
} from '../../utils/SupportUtils';
import { formatPosition, rgbToInt } from '../../utils/converters';

import IOS_SUPPORTED_PROVIDERS = Constants.Demo.IOS_SUPPORTED_PROVIDERS;
import ANDROID_SUPPORTED_PROVIDERS = Constants.Demo.ANDROID_SUPPORTED_PROVIDERS;

export enum MarkerIWTitles {
  CONFIGURABLE_TEST_MARKER = 'Configurable test marker',
  STATIC_ICON_MARKER_NON_DRAGGABLE = 'Static icon marker (non-draggable)',
  STATIC_MARKER_NON_DRAGGABLE = 'Static marker (non-draggable)',
  STATIC_COLORED_MARKER_DRAGGABLE = 'Static colored marker (draggable)',
  STATIC_COLORED_MARKER_NON_DRAGGABLE = 'Static colored marker (non-draggable)',
}

enum DemoMarkerAppearance {
  DEFAULT = 'Default',
  LOCAL_ASSET_ICON = 'Local asset icon',
  NETWORK_ASSET = 'Network asset icon',
  CUSTOM_COLOR = 'Custom color',
}

const getSupportedFeatures = (currentMapProvider?: string) => {
  return {
    zIndex: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? IOS_SUPPORTED_PROVIDERS
        : androidProvidersWithout(['OpenStreetMap', 'Mapbox', 'AzureMaps'])
    ),
    draggable: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? IOS_SUPPORTED_PROVIDERS
        : androidProvidersWithout(['AzureMaps'])
    ),
    alpha: isFeatureSupported(
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
    flat: isFeatureSupported(
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
    toggling: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? // On iOS, by default, the info window is always open on press and
          // this behaviour cannot be changed
          iOSProvidersWithout(['Google', 'Apple'])
        : ANDROID_SUPPORTED_PROVIDERS
    ),
  };
};

const getDisabledOptions = (currentMapProvider?: string) => {
  if (!currentMapProvider) {
    return {
      markerAppearance: [],
    };
  }

  const androidDisabledOptions =
    currentMapProvider === 'OpenStreetMap'
      ? [DemoMarkerAppearance.CUSTOM_COLOR]
      : [];
  const iosDisabledOptions =
    currentMapProvider === 'Apple'
      ? [
          DemoMarkerAppearance.LOCAL_ASSET_ICON,
          DemoMarkerAppearance.NETWORK_ASSET,
        ]
      : [];

  return {
    markerAppearance:
      Platform.OS === 'ios' ? iosDisabledOptions : androidDisabledOptions,
  };
};

export const MarkerMapScreen = () => {
  const logger = useLogger('MarkerMapScreen');
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const [supportedFeatures, setSupportedFeatures] = useState<ReturnType<
    typeof getSupportedFeatures
  > | null>(null);
  const [disabledOptions, setDisabledOptions] = useState(getDisabledOptions());

  const configurableMarkerRef = useRef<OmhMarkerRef | null>(null);
  const iconMarkerRef = useRef<OmhMarkerRef | null>(null);
  const coloredMarkerRef = useRef<OmhMarkerRef | null>(null);

  const markersRefs = useMemo(() => {
    return {
      [MarkerIWTitles.CONFIGURABLE_TEST_MARKER]: configurableMarkerRef,
      [MarkerIWTitles.STATIC_ICON_MARKER_NON_DRAGGABLE]: iconMarkerRef,
      [MarkerIWTitles.STATIC_MARKER_NON_DRAGGABLE]: iconMarkerRef,
      [MarkerIWTitles.STATIC_COLORED_MARKER_DRAGGABLE]: coloredMarkerRef,
      [MarkerIWTitles.STATIC_COLORED_MARKER_NON_DRAGGABLE]: coloredMarkerRef,
    };
  }, [configurableMarkerRef, iconMarkerRef, coloredMarkerRef]);

  const [mountCustomizableMarker, setMountCustomizableMarker] = useState(true);
  const [customizableMarkerVisible, setCustomizableMarkerVisible] =
    useState(true);
  const [customizableMarkerFlat, setCustomizableMarkerFlat] = useState(false);
  const [customizableMarkerClickable, setCustomizableMarkerClickable] =
    useState(true);
  const [customizableMarkerDraggable, setCustomizableMarkerDraggable] =
    useState(true);
  const [customizableMarkerSnippet, setCustomizableMarkerSnippet] =
    useState(false);
  const [customizableMarkerZIndex, setCustomizableMarkerZIndex] = useState(0);
  const [customizableMarkerPosition, setCustomizableMarkerPosition] = useState({
    latitude: Constants.Maps.GREENWICH_COORDINATE.latitude - 0.001,
    longitude: Constants.Maps.GREENWICH_COORDINATE.longitude,
  });
  const [customizableMarkerRotation, setCustomizableMarkerRotation] =
    useState(0);
  const [customizableMarkerAnchor, setCustomizableMarkerAnchor] =
    useState<OmhAnchor>({
      u: OmhMarkerConstants.ANCHOR_CENTER.u,
      v: OmhMarkerConstants.ANCHOR_CENTER.v,
    });
  const [customizableMarkerAlpha, setCustomizableMarkerAlpha] = useState(1);
  const [customizableMarkerColorHue, setCustomizableMarkerColorHue] =
    useState(0);
  const [customizableMarkerAppearance, setCustomizableMarkerAppearance] =
    useState(DemoMarkerAppearance.DEFAULT);
  const [showInfoWindow, setShowInfoWindow] = useState({
    [MarkerIWTitles.CONFIGURABLE_TEST_MARKER]: false,
    [MarkerIWTitles.STATIC_ICON_MARKER_NON_DRAGGABLE]: false,
    [MarkerIWTitles.STATIC_MARKER_NON_DRAGGABLE]: false,
    [MarkerIWTitles.STATIC_COLORED_MARKER_DRAGGABLE]: false,
    [MarkerIWTitles.STATIC_COLORED_MARKER_NON_DRAGGABLE]: false,
  } as Record<MarkerIWTitles, boolean>);

  const genMarkerOnPressHandler = useCallback(
    (title: MarkerIWTitles) => () => {
      const message = `${_.capitalize(title)} clicked`;
      logger.log(message);

      showSnackbar(message);

      if (supportedFeatures?.toggling) {
        if (showInfoWindow[title]) {
          markersRefs[title]?.current?.hideInfoWindow();
        } else {
          markersRefs[title]?.current?.showInfoWindow();
        }
      }

      setShowInfoWindow({
        ...showInfoWindow,
        [title]: !showInfoWindow[title],
      });
    },
    [
      logger,
      showSnackbar,
      supportedFeatures?.toggling,
      showInfoWindow,
      markersRefs,
    ]
  );
  const genMarkerOnIWPressHandler = useCallback(
    (title: MarkerIWTitles) => () => {
      const message = `${_.capitalize(title)} info window clicked`;
      logger.log(message);

      showSnackbar(message);

      markersRefs[title]?.current?.hideInfoWindow();

      setShowInfoWindow({
        ...showInfoWindow,
        [title]: false,
      });
    },
    [logger, showSnackbar, markersRefs, showInfoWindow]
  );

  const genMarkerOnIWCloseHandler = useCallback(
    (title: MarkerIWTitles) => () => {
      setShowInfoWindow({
        ...showInfoWindow,
        [title]: false,
      });
    },
    [showInfoWindow]
  );

  const onCustomizableMarkerDragStart = useCallback(
    (event: MarkerDragStartEvent) => {
      const {
          position: { latitude, longitude },
        } = event.nativeEvent,
        message = `Customizable marker has started being dragged from: ${formatPosition({ latitude, longitude })}`;

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
        `Customizable marker has been dragged to: ${formatPosition({ latitude, longitude })}`
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

      setCustomizableMarkerPosition({ latitude, longitude });
    },
    [logger, showSnackbar]
  );

  const customizableMarkerColorRGB = useMemo(
    () => rgbToInt(convert.hsv.rgb([customizableMarkerColorHue, 100, 100])),
    [customizableMarkerColorHue]
  );

  const showStaticIcon = useMemo(
    () =>
      !disabledOptions.markerAppearance.includes(
        DemoMarkerAppearance.LOCAL_ASSET_ICON
      ),
    [disabledOptions.markerAppearance]
  );

  const staticIconMarkerTitle = useMemo(
    () =>
      showStaticIcon
        ? MarkerIWTitles.STATIC_ICON_MARKER_NON_DRAGGABLE
        : MarkerIWTitles.STATIC_MARKER_NON_DRAGGABLE,
    [showStaticIcon]
  );

  const staticColoredMarkerTitle = useMemo(
    () =>
      supportedFeatures?.draggable
        ? MarkerIWTitles.STATIC_COLORED_MARKER_DRAGGABLE
        : MarkerIWTitles.STATIC_COLORED_MARKER_NON_DRAGGABLE,
    [supportedFeatures?.draggable]
  );

  useEffect(() => {
    if (supportedFeatures?.draggable === false) {
      setCustomizableMarkerDraggable(false);
    }
  }, [supportedFeatures?.draggable]);

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
            setDisabledOptions(getDisabledOptions(providerName));

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              Platform.OS === 'ios' && providerName === 'Apple' ? 14.0 : 15.0
            );
          }}>
          {mountCustomizableMarker && (
            <OmhMarker
              ref={configurableMarkerRef}
              title={MarkerIWTitles.CONFIGURABLE_TEST_MARKER}
              position={customizableMarkerPosition}
              draggable={customizableMarkerDraggable}
              isFlat={customizableMarkerFlat}
              clickable={customizableMarkerClickable}
              isVisible={customizableMarkerVisible}
              snippet={
                customizableMarkerSnippet
                  ? 'A sample snippet with long description'
                  : undefined
              }
              onPress={genMarkerOnPressHandler(
                MarkerIWTitles.CONFIGURABLE_TEST_MARKER
              )}
              onInfoWindowPress={genMarkerOnIWPressHandler(
                MarkerIWTitles.CONFIGURABLE_TEST_MARKER
              )}
              onInfoWindowClose={genMarkerOnIWCloseHandler(
                MarkerIWTitles.CONFIGURABLE_TEST_MARKER
              )}
              onDragStart={onCustomizableMarkerDragStart}
              onDrag={onCustomizableMarkerDrag}
              onDragEnd={onCustomizableMarkerDragEnd}
              markerZIndex={customizableMarkerZIndex}
              rotation={customizableMarkerRotation}
              anchor={customizableMarkerAnchor}
              alpha={customizableMarkerAlpha}
              backgroundColor={
                customizableMarkerAppearance ===
                DemoMarkerAppearance.CUSTOM_COLOR
                  ? customizableMarkerColorRGB
                  : undefined
              }
              icon={
                customizableMarkerAppearance ===
                DemoMarkerAppearance.LOCAL_ASSET_ICON
                  ? soccerBallIcon
                  : customizableMarkerAppearance ===
                      DemoMarkerAppearance.NETWORK_ASSET
                    ? {
                        uri: 'https://www.openmobilehub.com/images/logo/omh_logo.png',
                        width: 75,
                        height: 75,
                      }
                    : undefined
              }
            />
          )}

          <OmhMarker
            ref={iconMarkerRef}
            title={staticIconMarkerTitle}
            position={{
              latitude: Constants.Maps.GREENWICH_COORDINATE.latitude + 0.0016,
              longitude: Constants.Maps.GREENWICH_COORDINATE.longitude + 0.002,
            }}
            onPress={genMarkerOnPressHandler(staticIconMarkerTitle)}
            onInfoWindowPress={genMarkerOnIWPressHandler(staticIconMarkerTitle)}
            onInfoWindowClose={genMarkerOnIWCloseHandler(staticIconMarkerTitle)}
            markerZIndex={1.9}
            icon={showStaticIcon ? soccerBallIcon : undefined}
            backgroundColor={!showStaticIcon ? 0x0000ff : undefined}
          />

          <OmhMarker
            ref={coloredMarkerRef}
            title={staticColoredMarkerTitle}
            position={{
              latitude: Constants.Maps.GREENWICH_COORDINATE.latitude + 0.0016,
              longitude: Constants.Maps.GREENWICH_COORDINATE.longitude - 0.002,
            }}
            backgroundColor={0x005918}
            draggable={true}
            onPress={genMarkerOnPressHandler(staticColoredMarkerTitle)}
            onInfoWindowPress={genMarkerOnIWPressHandler(
              staticColoredMarkerTitle
            )}
            onInfoWindowClose={genMarkerOnIWCloseHandler(
              staticColoredMarkerTitle
            )}
            markerZIndex={2.9}
          />
        </OmhMapView>
      </View>

      <View style={demoStyles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={
            demoStyles.demoControlsScrollViewContentContainer
          }>
          <Subheading style={demoStyles.centeredHeading}>
            Marker properties
          </Subheading>

          <PanelCheckbox
            label="Visible"
            value={customizableMarkerVisible}
            onValueChange={setCustomizableMarkerVisible}
          />

          <PanelCheckbox
            enabled={supportedFeatures?.flat}
            label="Flat"
            value={customizableMarkerFlat}
            onValueChange={setCustomizableMarkerFlat}
          />

          <PanelCheckbox
            enabled={supportedFeatures?.clickable}
            label="Clickable"
            value={customizableMarkerClickable}
            onValueChange={setCustomizableMarkerClickable}
          />

          <PanelCheckbox
            enabled={supportedFeatures?.draggable}
            label="Draggable"
            value={customizableMarkerDraggable}
            onValueChange={setCustomizableMarkerDraggable}
          />

          <PanelCheckbox
            label="Snippet"
            value={customizableMarkerSnippet}
            onValueChange={setCustomizableMarkerSnippet}
          />

          <Slider
            disabled={!supportedFeatures?.rotation}
            label={`Rotation: ${customizableMarkerRotation.toFixed(0)}°`}
            onChange={zIndex => setCustomizableMarkerRotation(zIndex)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />

          <Slider
            disabled={!supportedFeatures?.anchor}
            label={`Anchor U: ${(customizableMarkerAnchor.u * 100).toFixed(0)}%`}
            onChange={u =>
              setCustomizableMarkerAnchor({
                ...customizableMarkerAnchor,
                u,
              })
            }
            defaultValue={OmhMarkerConstants.ANCHOR_CENTER.u}
            step={0.01}
            minimumValue={OmhMarkerConstants.ANCHOR_RIGHT.u}
            maximumValue={OmhMarkerConstants.ANCHOR_LEFT.u}
          />

          <Slider
            disabled={!supportedFeatures?.anchor}
            label={`Anchor V: ${(customizableMarkerAnchor.v * 100).toFixed(0)}%`}
            onChange={v =>
              setCustomizableMarkerAnchor({
                ...customizableMarkerAnchor,
                v,
              })
            }
            defaultValue={OmhMarkerConstants.ANCHOR_CENTER.v}
            step={0.01}
            minimumValue={OmhMarkerConstants.ANCHOR_BOTTOM.v}
            maximumValue={OmhMarkerConstants.ANCHOR_TOP.v}
          />

          <Slider
            disabled={!supportedFeatures?.alpha}
            label={`Alpha: ${(customizableMarkerAlpha * 100).toFixed(0)}%`}
            onChange={alpha => setCustomizableMarkerAlpha(alpha)}
            defaultValue={1}
            step={0.01}
            minimumValue={0}
            maximumValue={1}
          />

          <Picker<DemoMarkerAppearance>
            label="Appearance"
            choices={Object.entries(DemoMarkerAppearance)
              .filter(
                ([_key, label]) =>
                  !disabledOptions.markerAppearance.includes(label)
              )
              .map(([key, label]) => ({
                key,
                label,
                value: label,
              }))}
            onChange={choice => {
              setCustomizableMarkerAppearance(choice);
            }}
            value={customizableMarkerAppearance}
          />

          <Slider
            disabled={
              customizableMarkerAppearance !== DemoMarkerAppearance.CUSTOM_COLOR
            }
            label={`Color hue: ${customizableMarkerColorHue.toFixed(0)}`}
            onChange={H => setCustomizableMarkerColorHue(H)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />

          <Slider
            disabled={!supportedFeatures?.zIndex}
            label={`Z Index: ${customizableMarkerZIndex.toFixed(0)}`}
            onChange={zIndex => setCustomizableMarkerZIndex(zIndex)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={5}
          />

          <Subheading style={demoStyles.centeredHeading}>
            Demo behaviour
          </Subheading>

          <PanelCheckbox
            label="Mount customizable <OmhMarker/>"
            value={mountCustomizableMarker}
            onValueChange={setMountCustomizableMarker}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default MarkerMapScreen;
