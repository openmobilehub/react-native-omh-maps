import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  OmhCoordinate,
  OmhLineJoin,
  OmhMapView,
  OmhMapViewRef,
  OmhPatternItem,
  OmhPolygon,
} from '@omh/react-native-maps-core';

import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import { getRandomArbitrary } from '../../utils/mathHelpers';
import { demoStyles } from '../../styles/demoStyles';
import { rgbToInt } from '../../utils/converters';
import convert from 'color-convert';
import { PanelButton } from '../../components/PanelButton';
import useSnackbar from '../../hooks/useSnackbar';
import useLogger from '../../hooks/useLogger';
import { Constants } from '../../utils/Constants';
import { PanelCheckbox } from '../../components/controls/PanelCheckbox';
import { isFeatureSupported } from '../../utils/SupportUtils';

enum PatternOption {
  NONE = 'None',
  DOTTED = 'Dotted',
  DASHED = 'Dashed',
  CUSTOM = 'Custom',
}

type PatternItem = {
  label: PatternOption;
  value: OmhPatternItem[] | undefined;
};

const getSupportedFeatures = (currentMapProvider?: string) => {
  return {
    jointType: isFeatureSupported(currentMapProvider, [
      'GoogleMaps',
      'AzureMaps',
      'Mapbox',
    ]),
    pattern: isFeatureSupported(currentMapProvider, [
      'GoogleMaps',
      'AzureMaps',
    ]),
    zIndex: isFeatureSupported(currentMapProvider, ['GoogleMaps']),
  };
};

const getDisabledOptions = (currentMapProvider?: string) => {
  if (!currentMapProvider) {
    return {
      pattern: [],
    };
  }

  const isGoogleMaps = currentMapProvider === 'GoogleMaps';

  return {
    pattern: isGoogleMaps ? [] : [PatternOption.DOTTED, PatternOption.CUSTOM],
  };
};

const patternItemToChoice = (item: PatternItem) => {
  return {
    key: item.label,
    label: item.label,
    value: item.value,
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

type JointTypeItem = {
  label: string;
  value: OmhLineJoin;
};

const jointTypeItems: JointTypeItem[] = [
  {
    label: 'Miter',
    value: 'miter',
  },
  {
    label: 'Round',
    value: 'round',
  },
  {
    label: 'Bevel',
    value: 'bevel',
  },
];

const dottedPattern: OmhPatternItem[] = [
  {
    variant: 'dot',
  },
  {
    variant: 'gap',
    length: 10.0,
  },
];

const dashedPattern: OmhPatternItem[] = [
  {
    variant: 'dash',
    length: 10.0,
  },
  {
    variant: 'gap',
    length: 10.0,
  },
];

const customPattern: OmhPatternItem[] = [
  {
    variant: 'dash',
    length: 10.0,
  },
  {
    variant: 'gap',
    length: 2.0,
  },
  {
    variant: 'dash',
    length: 10.0,
  },
  {
    variant: 'gap',
    length: 5.0,
  },
  {
    variant: 'dot',
  },
  {
    variant: 'gap',
    length: 5.0,
  },
  {
    variant: 'dot',
  },
];

const patternItems: PatternItem[] = [
  {
    label: PatternOption.NONE,
    value: undefined,
  },
  {
    label: PatternOption.DOTTED,
    value: dottedPattern,
  },
  {
    label: PatternOption.DASHED,
    value: dashedPattern,
  },
  {
    label: PatternOption.CUSTOM,
    value: customPattern,
  },
];

const referencePolygonColor = rgbToInt([204, 204, 204]);

export const PolygonMapScreen = () => {
  const logger = useLogger('PolygonMapScreen');
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const [outline, setOutline] = useState(customizablePolygonOutline);
  const [isClickable, setIsClickable] = useState(false);
  const [withHoles, setWithHoles] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(defaultWidth);
  const [strokeColorHue, setStrokeColorHue] = useState(0);
  const [fillColorHue, setFillColorHue] = useState(100);
  const [isVisible, setIsVisible] = useState(true);
  const [zIndex, setZIndex] = useState(0);
  const [strokeJointType, setStrokeJointType] = useState<OmhLineJoin>(
    jointTypeItems[0]!!.value
  );
  const [strokePattern, setStrokePattern] = useState<
    OmhPatternItem[] | undefined
  >(undefined);

  const [supportedFeatures, setSupportedFeatures] = useState(
    getSupportedFeatures()
  );
  const [disabledOptions, setDisabledOptions] = useState(getDisabledOptions());

  const strokeColorRGB = useMemo(
    () => rgbToInt(convert.hsv.rgb([strokeColorHue, 100, 100])),
    [strokeColorHue]
  );

  const fillColorRGB = useMemo(
    () => rgbToInt(convert.hsv.rgb([fillColorHue, 100, 100])),
    [fillColorHue]
  );

  const holes = useMemo(() => {
    if (withHoles) {
      return holesOutlines;
    }

    return [];
  }, [withHoles]);

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
    return patternItems
      .filter(item => !disabledOptions.pattern.includes(item.label))
      .map(patternItemToChoice);
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
            defaultValue={100}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />
          <Picker<OmhLineJoin>
            disabled={!supportedFeatures.jointType}
            label="Stroke Joint Type"
            choices={jointTypeItems.map(item => ({
              key: item.value.toString(),
              label: item.label,
              value: item.value,
            }))}
            onChange={choice => {
              setStrokeJointType(choice);
            }}
            value={strokeJointType}
          />
          <Picker<OmhPatternItem[] | undefined>
            disabled={!supportedFeatures.pattern}
            label="Stroke Pattern"
            choices={patternOptions}
            onChange={setStrokePattern}
            value={strokePattern}
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
