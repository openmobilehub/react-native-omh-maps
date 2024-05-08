import convert from 'color-convert';
import _ from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PixelRatio, ScrollView, View } from 'react-native';
import { Checkbox, Subheading } from 'react-native-paper';

import {
  MarkerDragEndEvent,
  MarkerDragEvent,
  MarkerDragStartEvent,
  OmhMapView,
  OmhMapViewRef,
  OmhMarker,
  OmhMarkerConstants,
} from '@omh/react-native-maps-core';
import { OmhMapsAzureMapsProvider } from '@omh/react-native-maps-plugin-azuremaps';
import { OmhMapsGooglemapsProvider } from '@omh/react-native-maps-plugin-googlemaps';
import { OmhMapsOpenStreetMapProvider } from '@omh/react-native-maps-plugin-openstreetmap';

import { Anchor } from '../../../../packages/core/src/components/marker/RNOmhMapsMarkerNativeComponent';
import soccerBallIcon from '../../assets/img/soccer_ball.bmp';
import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import useChosenMapProvider from '../../hooks/useChosenMapProvider';
import useLogger from '../../hooks/useLogger';
import useSnackbar from '../../hooks/useSnackbar';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';
import { formatPosition, rgbToInt } from '../../utils/converters';

export const MarkerIWTitles = {
  CONFIGURABLE_TEST_MARKER: 'Configurable test marker',
  STATIC_ICON_MARKER_NON_DRAGGABLE: 'Static icon marker (non-draggable)',
  STATIC_COLORED_MARKER_DRAGGABLE: 'Static colored marker (draggable)',
};

enum DemoMarkerAppearance {
  DEFAULT = 'Default',
  LOCAL_ASSET_ICON = 'Local asset icon',
  NETWORK_ASSET = 'Network asset icon',
  CUSTOM_COLOR = 'Custom color',
}

export const MarkerMapScreen = () => {
  const logger = useLogger('MarkerMapScreen');
  const mapProvider = useChosenMapProvider();
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
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

  // disable some marker appearances based on provider availability
  const disabledMarkerAppearances = useMemo(() => {
    let blacklist = new Set<DemoMarkerAppearance>();

    if (mapProvider.path === OmhMapsOpenStreetMapProvider.path) {
      blacklist.add(DemoMarkerAppearance.CUSTOM_COLOR);
    }

    return blacklist;
  }, [mapProvider.path]);

  // zIndex is only supported by Google Maps provider
  const zIndexSupported = useMemo(
    () => mapProvider.path === OmhMapsGooglemapsProvider.path,
    [mapProvider.path]
  );

  // markers' draggability is not supported by Azure Maps provider;
  // the checkbox var needs to be set to false as well, thus useEffect is used
  useEffect(() => {
    if (mapProvider.path === OmhMapsAzureMapsProvider.path) {
      setCustomizableMarkerDraggable(false);
    }
  }, [mapProvider.path]);

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

            omhMapRef.current?.setCameraCoordinate(
              Constants.Maps.GREENWICH_COORDINATE,
              15.0
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
                        width: PixelRatio.getPixelSizeForLayoutSize(24),
                        height: PixelRatio.getPixelSizeForLayoutSize(24),
                      }
                    : undefined
              }
            />
          )}

          <OmhMarker
            title={MarkerIWTitles.STATIC_ICON_MARKER_NON_DRAGGABLE}
            position={{
              latitude: Constants.Maps.GREENWICH_COORDINATE.latitude + 0.0016,
              longitude: Constants.Maps.GREENWICH_COORDINATE.longitude + 0.002,
            }}
            onPress={genMarkerOnPressHandler(
              MarkerIWTitles.STATIC_ICON_MARKER_NON_DRAGGABLE
            )}
            markerZIndex={1.9}
            icon={soccerBallIcon}
          />

          <OmhMarker
            title={MarkerIWTitles.STATIC_COLORED_MARKER_DRAGGABLE}
            position={{
              latitude: Constants.Maps.GREENWICH_COORDINATE.latitude + 0.0016,
              longitude: Constants.Maps.GREENWICH_COORDINATE.longitude - 0.002,
            }}
            backgroundColor={0x005918}
            draggable={true}
            onPress={genMarkerOnPressHandler(
              MarkerIWTitles.STATIC_COLORED_MARKER_DRAGGABLE
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

          <Checkbox.Item
            label="Visible"
            status={customizableMarkerVisible ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerVisible(!customizableMarkerVisible);
            }}
          />

          <Checkbox.Item
            label="Flat"
            status={customizableMarkerFlat ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerFlat(!customizableMarkerFlat);
            }}
          />

          <Checkbox.Item
            label="Clickable"
            status={customizableMarkerClickable ? 'checked' : 'unchecked'}
            onPress={() => {
              setCustomizableMarkerClickable(!customizableMarkerClickable);
            }}
          />

          <Checkbox.Item
            disabled={mapProvider.path === OmhMapsAzureMapsProvider.path}
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
            label={`Rotation: ${customizableMarkerRotation.toFixed(0)}°`}
            onChange={zIndex => setCustomizableMarkerRotation(zIndex)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />

          <Slider
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
              .filter(([_key, label]) => !disabledMarkerAppearances.has(label))
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
            disabled={!zIndexSupported}
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
