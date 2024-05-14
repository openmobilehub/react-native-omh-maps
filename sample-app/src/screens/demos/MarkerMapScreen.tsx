import convert from 'color-convert';
import _ from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PixelRatio, Platform, ScrollView, View } from 'react-native';
import { Checkbox, Subheading } from 'react-native-paper';

import {
  OmhMapView,
  OmhMapViewRef,
  OmhMarkerConstants,
  OmhMarker,
  MarkerDragEndEvent,
  MarkerDragEvent,
  MarkerDragStartEvent,
} from '@omh/react-native-maps-core';
import { Anchor } from '../../../../packages/core/src/components/marker/RNOmhMapsMarkerNativeComponent';
import soccerBallIcon from '../../assets/img/soccer_ball.bmp';
import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import useLogger from '../../hooks/useLogger';
import useSnackbar from '../../hooks/useSnackbar';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';
import { formatPosition, rgbToInt } from '../../utils/converters';
import { isFeatureSupported } from '../../utils/SupportUtils';

const MarkerIWTitles = {
  CONFIGURABLE_TEST_MARKER: 'Configurable test marker',
  STATIC_ICON_MARKER_NON_DRAGGABLE: 'Static icon marker (non-draggable)',
  STATIC_COLORED_MARKER_DRAGGABLE: 'Static colored marker (draggable)',
  STATIC_COLORED_MARKER_NON_DRAGGABLE: 'Static colored marker (non-draggable)',
};

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
      Platform.OS === 'ios' ? ['Google', 'Apple'] : ['GoogleMaps']
    ),
    draggable: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Google']
        : ['GoogleMaps', 'OpenStreetMap', 'Mapbox']
    ),
    alpha: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Google']
        : ['GoogleMaps', 'OpenStreetMap', 'Mapbox', 'AzureMaps']
    ),
    clickable: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Google']
        : ['GoogleMaps', 'OpenStreetMap', 'Mapbox', 'AzureMaps']
    ),
    flat: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Google']
        : ['GoogleMaps', 'OpenStreetMap', 'Mapbox', 'AzureMaps']
    ),
    rotation: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Google']
        : ['GoogleMaps', 'OpenStreetMap', 'Mapbox', 'AzureMaps']
    ),
    anchor: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Google']
        : ['GoogleMaps', 'OpenStreetMap', 'Mapbox', 'AzureMaps']
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
  const [supportedFeatures, setSupportedFeatures] = useState(
    getSupportedFeatures()
  );
  const [disabledOptions, setDisabledOptions] = useState(getDisabledOptions());

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
    useState<Anchor>({
      u: OmhMarkerConstants.ANCHOR_CENTER.u,
      v: OmhMarkerConstants.ANCHOR_CENTER.v,
    });
  const [customizableMarkerAlpha, setCustomizableMarkerAlpha] = useState(1);
  const [customizableMarkerColorHue, setCustomizableMarkerColorHue] =
    useState(0);
  const [customizableMarkerAppearance, setCustomizableMarkerAppearance] =
    useState(DemoMarkerAppearance.DEFAULT);

  const genMarkerOnPressHandler = useCallback(
    (title: string) => () => {
      const message = `${_.capitalize(title)} clicked`;
      logger.log(message);

      showSnackbar(message);
    },
    [showSnackbar, logger]
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

  const showStaticIconMarker = useMemo(
    () =>
      !disabledOptions.markerAppearance.includes(
        DemoMarkerAppearance.LOCAL_ASSET_ICON
      ),
    [disabledOptions.markerAppearance]
  );

  const staticColoredMarkerTitle = useMemo(
    () =>
      supportedFeatures.draggable
        ? MarkerIWTitles.STATIC_COLORED_MARKER_DRAGGABLE
        : MarkerIWTitles.STATIC_COLORED_MARKER_NON_DRAGGABLE,
    [supportedFeatures.draggable]
  );

  useEffect(() => {
    if (!supportedFeatures.draggable) {
      setCustomizableMarkerDraggable(false);
    }
  }, [supportedFeatures.draggable]);

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
                        width: PixelRatio.getPixelSizeForLayoutSize(38),
                        height: PixelRatio.getPixelSizeForLayoutSize(38),
                      }
                    : undefined
              }
            />
          )}

          {showStaticIconMarker && (
            <OmhMarker
              title={MarkerIWTitles.STATIC_ICON_MARKER_NON_DRAGGABLE}
              position={{
                latitude: Constants.Maps.GREENWICH_COORDINATE.latitude + 0.0016,
                longitude:
                  Constants.Maps.GREENWICH_COORDINATE.longitude + 0.002,
              }}
              onPress={genMarkerOnPressHandler(
                MarkerIWTitles.STATIC_ICON_MARKER_NON_DRAGGABLE
              )}
              markerZIndex={1.9}
              icon={soccerBallIcon}
            />
          )}

          <OmhMarker
            title={staticColoredMarkerTitle}
            position={{
              latitude: Constants.Maps.GREENWICH_COORDINATE.latitude + 0.0016,
              longitude: Constants.Maps.GREENWICH_COORDINATE.longitude - 0.002,
            }}
            backgroundColor={0x005918}
            draggable={true}
            onPress={genMarkerOnPressHandler(staticColoredMarkerTitle)}
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

          <Checkbox.Item
            label="Visible"
            status={customizableMarkerVisible ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerVisible(!customizableMarkerVisible);
            }}
          />

          <Checkbox.Item
            disabled={!supportedFeatures.flat}
            label="Flat"
            status={customizableMarkerFlat ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerFlat(!customizableMarkerFlat);
            }}
          />

          <Checkbox.Item
            disabled={!supportedFeatures.clickable}
            label="Clickable"
            status={customizableMarkerClickable ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerClickable(!customizableMarkerClickable);
            }}
          />

          <Checkbox.Item
            disabled={!supportedFeatures.draggable}
            label="Draggable"
            status={customizableMarkerDraggable ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerDraggable(!customizableMarkerDraggable);
            }}
          />

          <Checkbox.Item
            label="Snippet"
            status={customizableMarkerSnippet ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerSnippet(!customizableMarkerSnippet);
            }}
          />

          <Slider
            disabled={!supportedFeatures.rotation}
            label={`Rotation: ${customizableMarkerRotation.toFixed(0)}°`}
            onChange={zIndex => setCustomizableMarkerRotation(zIndex)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />

          <Slider
            disabled={!supportedFeatures.anchor}
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
            disabled={!supportedFeatures.anchor}
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
            disabled={!supportedFeatures.alpha}
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
            disabled={!supportedFeatures.zIndex}
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

          <Checkbox.Item
            label="Mount customizable <OmhMarker/>"
            status={mountCustomizableMarker ? 'checked' : 'unchecked'}
            onPress={() => {
              setMountCustomizableMarker(!mountCustomizableMarker);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default MarkerMapScreen;
