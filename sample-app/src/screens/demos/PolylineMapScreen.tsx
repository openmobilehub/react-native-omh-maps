import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  OmhCap,
  OmhCoordinate,
  OmhMapView,
  OmhMapViewRef,
  OmhPolyline,
  OmhPolylineConstants,
} from '@omh/react-native-maps-core';

import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import { Pattern } from '../../../../packages/core/src/components/polyline/RNOmhMapsPolylineNativeComponent';
import { getRandomArbitrary } from '../../utils/mathHelpers';
import { demoStyles } from '../../styles/demoStyles';
import { rgbToInt } from '../../utils/converters';
import convert from 'color-convert';
import { PanelButton } from '../../components/PanelButton';
import useSnackbar from '../../hooks/useSnackbar';
import useLogger from '../../hooks/useLogger';
import { Constants } from '../../utils/Constants';
import soccerBallIcon from '../../assets/img/soccer_ball.bmp';
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
  value: Pattern[] | undefined;
};

const getSupportedFeatures = (currentMapProvider?: string) => {
  return {
    startCap: isFeatureSupported(currentMapProvider, ['GoogleMaps']),
    endCap: isFeatureSupported(currentMapProvider, ['GoogleMaps']),
    jointType: isFeatureSupported(currentMapProvider, [
      'GoogleMaps',
      'OpenStreetMap',
      'Mapbox',
    ]),
    pattern: isFeatureSupported(currentMapProvider, [
      'GoogleMaps',
      'AzureMaps',
    ]),
    zIndex: isFeatureSupported(currentMapProvider, ['GoogleMaps']),
    span: isFeatureSupported(currentMapProvider, ['GoogleMaps']),
  };
};

const getDisabledOptions = (currentMapProvider?: string) => {
  if (!currentMapProvider) {
    return {
      cap: [],
      pattern: [],
    };
  }

  const isGoogleMaps = currentMapProvider === 'GoogleMaps';

  return {
    cap: isGoogleMaps ? [] : [OmhPolylineConstants.CAP_TYPE_CUSTOM],
    pattern: isGoogleMaps ? [] : [PatternOption.DOTTED, PatternOption.CUSTOM],
  };
};

const capItemToChoice = (item: CapItem) => {
  return {
    key: item.value.type,
    label: item.label,
    value: item.value,
  };
};

const patternItemToChoice = (item: PatternItem) => {
  return {
    key: item.label,
    label: item.label,
    value: item.value,
  };
};

const customizablePolylinePoints: OmhCoordinate[] = [
  { latitude: 0.0, longitude: 0.0 },
  { latitude: 30.0, longitude: 10.0 },
  { latitude: 20.0, longitude: 20.0 },
  { latitude: 20.0, longitude: 20.0 },
  { latitude: 20.0, longitude: 30.0 },
  { latitude: 10.0, longitude: 30.0 },
  { latitude: -10.0, longitude: 40.0 },
  { latitude: 15.0, longitude: 60.0 },
];

const referencePolylinePoints: OmhCoordinate[] = [
  { latitude: 50.0, longitude: 25.0 },
  { latitude: -50.0, longitude: 25.0 },
];

const PolylineMessages = {
  CUSTOMIZABLE_POLYLINE: 'Customizable Polyline Pressed',
  REFERENCE_POLYLINE: 'Reference Polyline pressed',
};

const defaultWidth = 10;

type CapItem = {
  label: string;
  value: OmhCap;
};

type JointTypeItem = {
  label: string;
  value: number;
};

const capItems: CapItem[] = [
  {
    label: 'Butt',
    value: {
      type: OmhPolylineConstants.CAP_TYPE_BUTT,
    },
  },
  {
    label: 'Round',
    value: {
      type: OmhPolylineConstants.CAP_TYPE_ROUND,
    },
  },
  {
    label: 'Square',
    value: {
      type: OmhPolylineConstants.CAP_TYPE_SQUARE,
    },
  },
  {
    label: 'Custom',
    value: {
      type: OmhPolylineConstants.CAP_TYPE_CUSTOM,
      icon: soccerBallIcon,
      refWidth: 75.0,
    },
  },
];

const jointTypeItems: JointTypeItem[] = [
  {
    label: 'Miter',
    value: OmhPolylineConstants.JOINT_TYPE_MITER,
  },
  {
    label: 'Round',
    value: OmhPolylineConstants.JOINT_TYPE_ROUND,
  },
  {
    label: 'Bevel',
    value: OmhPolylineConstants.JOINT_TYPE_BEVEL,
  },
];

const dottedPattern: Pattern[] = [
  {
    type: OmhPolylineConstants.PATTERN_TYPE_DOT,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_GAP,
    length: 10.0,
  },
];

const dashedPattern: Pattern[] = [
  {
    type: OmhPolylineConstants.PATTERN_TYPE_DASH,
    length: 10.0,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_GAP,
    length: 10.0,
  },
];

const customPattern: Pattern[] = [
  {
    type: OmhPolylineConstants.PATTERN_TYPE_DASH,
    length: 10.0,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_GAP,
    length: 2.0,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_DASH,
    length: 10.0,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_GAP,
    length: 5.0,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_DOT,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_GAP,
    length: 5.0,
  },
  {
    type: OmhPolylineConstants.PATTERN_TYPE_DOT,
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

const referencePolylineColor = rgbToInt([204, 204, 204]);

export const PolylineMapScreen = () => {
  const logger = useLogger('PolylineMapScreen');
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const [points, setPoints] = useState(customizablePolylinePoints);
  const [isClickable, setIsClickable] = useState(false);
  const [width, setWidth] = useState(defaultWidth);
  const [colorHue, setColorHue] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [zIndex, setZIndex] = useState(0);
  const [cap, setCap] = useState(capItems[0]!!.value);
  const [startCap, setStartCap] = useState(capItems[0]!!.value);
  const [endCap, setEndCap] = useState(capItems[0]!!.value);
  const [shouldUseCommonCap, setShouldUseCommonCap] = useState(true);
  const [jointType, setJointType] = useState(jointTypeItems[0]!!.value);
  const [pattern, setPattern] = useState<Pattern[] | undefined>(undefined);
  const [withSpan, setWithSpan] = useState(false);
  const [spanSegments, setSpanSegments] = useState(1);
  const [spanColorHue, setSpanColorHue] = useState(180);
  const [spanWithGradient, setSpanWithGradient] = useState(false);
  const [spanGradientFromColorHue, setSpanGradientFromColorHue] = useState(90);
  const [spanGradientToColorHue, setSpanGradientToColorHue] = useState(270);
  const [spanPattern, setSpanPattern] = useState(false);

  const [supportedFeatures, setSupportedFeatures] = useState(
    getSupportedFeatures()
  );
  const [disabledOptions, setDisabledOptions] = useState(getDisabledOptions());

  const colorRGB = useMemo(
    () => rgbToInt(convert.hsv.rgb([colorHue, 100, 100])),
    [colorHue]
  );

  const handleRandomizePointsButtonPress = () => {
    let randomizedPoints = Array.from({ length: 8 }, (_, i) => {
      let baseLongitude = i * 5;
      let minLongitude = baseLongitude - 5;
      let maxLongitude = baseLongitude + 5;
      return {
        latitude: getRandomArbitrary(-30, 30),
        longitude: getRandomArbitrary(minLongitude, maxLongitude),
      };
    });

    setPoints(randomizedPoints);
  };

  const capOptions = useMemo(() => {
    return capItems
      .filter(item => !disabledOptions.cap.includes(item.value.type))
      .map(capItemToChoice);
  }, [disabledOptions]);

  const patternOptions = useMemo(() => {
    return patternItems
      .filter(item => !disabledOptions.pattern.includes(item.label))
      .map(patternItemToChoice);
  }, [disabledOptions]);

  const genOnPolylineClickHandler = useCallback(
    (message: string) => () => {
      logger.log(message);
      showSnackbar(message);
    },
    [showSnackbar, logger]
  );

  const capProps = useMemo(() => {
    if (shouldUseCommonCap) {
      return { cap };
    }

    return {
      startCap,
      endCap,
    };
  }, [shouldUseCommonCap, cap, startCap, endCap]);

  const spans = useMemo(() => {
    if (!withSpan) {
      return undefined;
    }

    const defaultSpan = {
      type: 'monochromatic' as const,
      segments: 1,
      color: colorRGB,
    };

    const span = spanWithGradient
      ? {
          type: 'gradient' as const,
          segments: spanSegments,
          fromColor: rgbToInt(
            convert.hsv.rgb([spanGradientFromColorHue, 100, 100])
          ),
          toColor: rgbToInt(
            convert.hsv.rgb([spanGradientToColorHue, 100, 100])
          ),
          stamp: spanPattern ? soccerBallIcon : undefined,
        }
      : {
          type: 'monochromatic' as const,
          segments: spanSegments,
          color: rgbToInt(convert.hsv.rgb([spanColorHue, 100, 100])),
          stamp: spanPattern ? soccerBallIcon : undefined,
        };

    return [span, defaultSpan];
  }, [
    withSpan,
    spanSegments,
    spanColorHue,
    spanWithGradient,
    spanGradientFromColorHue,
    spanGradientToColorHue,
    spanPattern,
    colorRGB,
  ]);

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
        <OmhMapView
          ref={omhMapRef}
          width="100%"
          height="100%"
          onMapReady={handleMapReady}>
          <OmhPolyline
            points={points}
            clickable={isClickable}
            color={colorRGB}
            width={width}
            isVisible={isVisible}
            polylineZIndex={zIndex}
            jointType={jointType}
            pattern={pattern}
            spans={spans}
            onPolylineClick={genOnPolylineClickHandler(
              PolylineMessages.CUSTOMIZABLE_POLYLINE
            )}
            {...capProps}
          />
          <OmhPolyline
            points={referencePolylinePoints}
            polylineZIndex={2}
            clickable={true}
            color={referencePolylineColor}
            width={10}
            onPolylineClick={genOnPolylineClickHandler(
              PolylineMessages.REFERENCE_POLYLINE
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
            onPress={handleRandomizePointsButtonPress}
            label="Randomize Points"
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
          <Slider
            label="Width"
            onChange={setWidth}
            defaultValue={defaultWidth}
            step={1}
            minimumValue={0}
            maximumValue={100}
          />
          <Slider
            label="Color"
            onChange={setColorHue}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />
          <Picker<OmhCap>
            label="Cap"
            choices={capOptions}
            onChange={choice => {
              setCap(choice);
              setShouldUseCommonCap(true);
            }}
            value={cap}
          />
          <Picker<OmhCap>
            disabled={!supportedFeatures.startCap}
            label="Start Cap"
            choices={capOptions}
            onChange={choice => {
              setStartCap(choice);
              setShouldUseCommonCap(false);
            }}
            value={startCap}
          />
          <Picker<OmhCap>
            disabled={!supportedFeatures.endCap}
            label="End Cap"
            choices={capOptions}
            onChange={choice => {
              setEndCap(choice);
              setShouldUseCommonCap(false);
            }}
            value={endCap}
          />
          <Picker<number>
            disabled={!supportedFeatures.jointType}
            label="Joint Type"
            choices={jointTypeItems.map(item => ({
              key: item.value.toString(),
              label: item.label,
              value: item.value,
            }))}
            onChange={choice => {
              setJointType(choice);
            }}
            value={jointType}
          />
          <Picker<Pattern[] | undefined>
            disabled={!supportedFeatures.pattern}
            label="Pattern"
            choices={patternOptions}
            onChange={setPattern}
            value={pattern}
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
          <PanelCheckbox
            enabled={supportedFeatures.span}
            label="Span"
            value={withSpan}
            onValueChange={setWithSpan}
          />
          {withSpan && (
            <>
              <Slider
                label="Segments"
                onChange={setSpanSegments}
                defaultValue={1}
                step={1}
                minimumValue={1}
                maximumValue={7}
              />
              <Slider
                label="Span Color"
                onChange={setSpanColorHue}
                defaultValue={180}
                step={1}
                minimumValue={0}
                maximumValue={360}
              />
              <PanelCheckbox
                label="Gradient"
                value={spanWithGradient}
                onValueChange={setSpanWithGradient}
              />
              {spanWithGradient && (
                <>
                  <Slider
                    label="From Color"
                    onChange={setSpanGradientFromColorHue}
                    defaultValue={90}
                    step={1}
                    minimumValue={0}
                    maximumValue={360}
                  />
                  <Slider
                    label="To Color"
                    onChange={setSpanGradientToColorHue}
                    defaultValue={270}
                    step={1}
                    minimumValue={0}
                    maximumValue={360}
                  />
                </>
              )}
              <PanelCheckbox
                label="Span Pattern"
                value={spanPattern}
                onValueChange={setSpanPattern}
              />
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PolylineMapScreen;
