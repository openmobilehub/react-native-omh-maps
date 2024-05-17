import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import {
  OmhCoordinate,
  OmhLineJoin,
  OmhMapView,
  OmhMapViewRef,
  OmhPolygon,
} from '@omh/react-native-maps-core';

import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import { getRandomArbitrary } from '../../utils/mathHelpers';
import { demoStyles } from '../../styles/demoStyles';
import { rgbToInt } from '../../utils/converters';
import convert from 'color-convert';
import { PanelButton } from '../../components/controls/PanelButton';
import useSnackbar from '../../hooks/useSnackbar';
import useLogger from '../../hooks/useLogger';
import { Constants } from '../../utils/Constants';
import { PanelCheckbox } from '../../components/controls/PanelCheckbox';
import { isFeatureSupported } from '../../utils/SupportUtils';
import { PatternOption } from '../../types/common';
import jointTypeItems = Constants.JointType.jointTypeItems;
import patterns = Constants.Pattern.patterns;

const getSupportedFeatures = (currentMapProvider?: string) => {
  return {
    jointType: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios' ? ['Apple'] : ['GoogleMaps', 'AzureMaps', 'Mapbox']
    ),
    pattern: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios' ? ['Apple'] : ['GoogleMaps', 'AzureMaps']
    ),
    zIndex: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios' ? ['Google'] : ['GoogleMaps']
    ),
    holes: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Google']
        : ['GoogleMaps', 'AzureMaps', 'Mapbox', 'OpenStreetMap']
    ),
  };
};

const getDisabledOptions = (currentMapProvider?: string) => {
  if (!currentMapProvider) {
    return {
      pattern: [],
      jointType: [],
    };
  }

  const isGoogleMaps =
    Platform.OS === 'ios'
      ? currentMapProvider === 'Google'
      : currentMapProvider === 'GoogleMaps';

  return {
    pattern: isGoogleMaps ? [] : [PatternOption.DOTTED, PatternOption.CUSTOM],
    jointType: Platform.OS === 'ios' ? ['miter'] : [],
  };
};

const customizablePolygonOutline: OmhCoordinate[] = [
  { latitude: 27.5, longitude: -27.5 },
  { latitude: 27.5, longitude: 27.5 },
  { latitude: -27.5, longitude: 27.5 },
  { latitude: -27.5, longitude: -27.5 },
];

const referencePolygonOutline: OmhCoordinate[] = [
  { latitude: -20.0, longitude: 25.0 },
  { latitude: -30.0, longitude: 20.0 },
  { latitude: -30.0, longitude: 30.0 },
];

const holesOutlines: OmhCoordinate[][] = [
  [
    { latitude: -20.0, longitude: -10.0 },
    { latitude: -20.0, longitude: 0.0 },
    { latitude: -10.0, longitude: 0.0 },
    { latitude: -10.0, longitude: -10.0 },
  ],
  [
    { latitude: 0.0, longitude: 5.0 },
    { latitude: 0.0, longitude: 10.0 },
    { latitude: 10.0, longitude: 7.5 },
  ],
];

const PolygonMessages = {
  CUSTOMIZABLE_POLYLINE: 'Customizable Polygon Pressed',
  REFERENCE_POLYLINE: 'Reference Polygon pressed',
};

const defaultWidth = 10;

const referencePolygonColor = rgbToInt([204, 204, 204]);

export const PolygonMapScreen = () => {
  const logger = useLogger('PolygonMapScreen');
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const [isReferencePolygonVisible, setIsReferencePolygonVisible] =
    useState(false);
  const [outline, setOutline] = useState(customizablePolygonOutline);
  const [isClickable, setIsClickable] = useState(false);
  const [withHoles, setWithHoles] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(defaultWidth);
  const [strokeColorHue, setStrokeColorHue] = useState(0);
  const [fillColorHue, setFillColorHue] = useState<number | undefined>(
    undefined
  );
  const [isVisible, setIsVisible] = useState(true);
  const [zIndex, setZIndex] = useState(0);
  const [strokeJointType, setStrokeJointType] = useState<OmhLineJoin>(
    Platform.OS === 'ios' ? 'bevel' : 'miter'
  );
  const [strokePatternOption, setStrokePatternOption] = useState<PatternOption>(
    PatternOption.NONE
  );

  const [supportedFeatures, setSupportedFeatures] = useState(
    getSupportedFeatures()
  );
  const [disabledOptions, setDisabledOptions] = useState(getDisabledOptions());

  const strokeColorRGB = useMemo(
    () => rgbToInt(convert.hsv.rgb([strokeColorHue, 100, 100])),
    [strokeColorHue]
  );

  const fillColorRGB = useMemo(
    () =>
      fillColorHue
        ? rgbToInt(convert.hsv.rgb([fillColorHue, 100, 100]))
        : undefined,
    [fillColorHue]
  );

  const holes = useMemo(() => {
    if (withHoles) {
      return holesOutlines;
    }

    return [];
  }, [withHoles]);

  const strokePattern = useMemo(
    () => patterns[strokePatternOption],
    [strokePatternOption]
  );

  const handleRandomizeOutlineButtonPress = () => {
    const getNegativeRandomizedValue = () => {
      return getRandomArbitrary(-40, -20);
    };

    const getRandomizedValue = () => {
      return getRandomArbitrary(20, 40);
    };
    let point1 = {
      latitude: getRandomizedValue(),
      longitude: getNegativeRandomizedValue(),
    };
    let point2 = {
      latitude: getRandomizedValue(),
      longitude: getRandomizedValue(),
    };
    let point3 = {
      latitude: getNegativeRandomizedValue(),
      longitude: getRandomizedValue(),
    };
    let point4 = {
      latitude: getNegativeRandomizedValue(),
      longitude: getNegativeRandomizedValue(),
    };

    setOutline([point1, point2, point3, point4]);
  };

  const patternOptions = useMemo(() => {
    return Object.entries(PatternOption)
      .filter(([_key, label]) => !disabledOptions.pattern.includes(label))
      .map(([key, label]) => ({
        key,
        label,
        value: label,
      }));
  }, [disabledOptions]);

  const jointTypeOptions = useMemo(() => {
    return jointTypeItems
      .filter(item => !disabledOptions.jointType.includes(item.value))
      .map(item => ({
        key: item.value,
        label: item.label,
        value: item.value,
      }));
  }, [disabledOptions]);

  const genOnPolygonClickHandler = useCallback(
    (message: string) => () => {
      logger.log(message);
      showSnackbar(message);
    },
    [showSnackbar, logger]
  );

  const handleMapReady = () => {
    setSupportedFeatures(
      getSupportedFeatures(omhMapRef.current?.getProviderName())
    );
    setDisabledOptions(
      getDisabledOptions(omhMapRef.current?.getProviderName())
    );

    omhMapRef.current?.setCameraCoordinate(
      Constants.Maps.CENTER_COORDINATE,
      Constants.Maps.CENTER_ZOOM_LEVEL
    );
  };

  return (
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView ref={omhMapRef} onMapReady={handleMapReady}>
          <OmhPolygon
            outline={outline}
            clickable={isClickable}
            strokeColor={strokeColorRGB}
            fillColor={fillColorRGB}
            holes={holes}
            strokeWidth={strokeWidth}
            isVisible={isVisible}
            zIndex={zIndex}
            strokeJointType={strokeJointType}
            strokePattern={strokePattern}
            onPolygonClick={genOnPolygonClickHandler(
              PolygonMessages.CUSTOMIZABLE_POLYLINE
            )}
          />
          <OmhPolygon
            isVisible={isReferencePolygonVisible}
            outline={referencePolygonOutline}
            zIndex={2}
            clickable={true}
            strokeColor={referencePolygonColor}
            strokeWidth={10}
            onPolygonClick={genOnPolygonClickHandler(
              PolygonMessages.REFERENCE_POLYLINE
            )}
          />
        </OmhMapView>
      </View>

      <View style={demoStyles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={
            demoStyles.demoControlsScrollViewContentContainer
          }>
          <PanelButton
            onPress={handleRandomizeOutlineButtonPress}
            label="Randomize Outline"
          />
          <PanelCheckbox
            label="Show Reference Polygon (Add/Remove)"
            value={isReferencePolygonVisible}
            onValueChange={setIsReferencePolygonVisible}
          />
          <PanelCheckbox
            label="Visible"
            value={isVisible}
            onValueChange={setIsVisible}
          />
          <PanelCheckbox
            label="Clickable"
            value={isClickable}
            onValueChange={setIsClickable}
          />
          <PanelCheckbox
            enabled={supportedFeatures.holes}
            label="Holes"
            value={withHoles}
            onValueChange={setWithHoles}
          />
          <Slider
            label="Stroke Width"
            onChange={setStrokeWidth}
            defaultValue={defaultWidth}
            step={1}
            minimumValue={0}
            maximumValue={100}
          />
          <Slider
            label="Stroke Color"
            onChange={setStrokeColorHue}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />
          <Slider
            label="Fill Color"
            onChange={setFillColorHue}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />
          <Picker<OmhLineJoin>
            disabled={!supportedFeatures.jointType}
            label="Stroke Joint Type"
            choices={jointTypeOptions}
            onChange={choice => {
              setStrokeJointType(choice);
            }}
            value={strokeJointType}
          />
          <Picker<PatternOption>
            disabled={!supportedFeatures.pattern}
            label="Stroke Pattern"
            choices={patternOptions}
            onChange={setStrokePatternOption}
            value={strokePatternOption}
          />
          <Slider
            disabled={!supportedFeatures.zIndex}
            label="Z Index"
            onChange={setZIndex}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={5}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PolygonMapScreen;
