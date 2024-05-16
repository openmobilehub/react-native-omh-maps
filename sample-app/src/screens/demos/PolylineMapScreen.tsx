import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import {
  OmhCap,
  OmhCoordinate,
  OmhLineJoin,
  OmhMapView,
  OmhMapViewRef,
  OmhPolyline,
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
import soccerBallIcon from '../../assets/img/soccer_ball.bmp';
import { PanelCheckbox } from '../../components/controls/PanelCheckbox';
import { isFeatureSupported } from '../../utils/SupportUtils';
import { PatternOption } from '../../types/common';
import jointTypeItems = Constants.JointType.jointTypeItems;
import patterns = Constants.Pattern.patterns;

enum CapType {
  CUSTOM = 'Custom',
  BUTT = 'Butt',
  ROUND = 'Round',
  SQUARE = 'Square',
}

const getSupportedFeatures = (currentMapProvider?: string) => {
  return {
    cap: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios'
        ? ['Apple']
        : ['GoogleMaps', 'AzureMaps', 'Mapbox', 'OpenStreetMap']
    ),
    startCap: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios' ? [] : ['GoogleMaps']
    ),
    endCap: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios' ? [] : ['GoogleMaps']
    ),
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
    span: isFeatureSupported(
      currentMapProvider,
      Platform.OS === 'ios' ? [] : ['GoogleMaps']
    ),
  };
};

const getDisabledOptions = (currentMapProvider?: string) => {
  if (!currentMapProvider) {
    return {
      cap: [],
      pattern: [],
    };
  }

  const isGoogleMaps =
    currentMapProvider === 'GoogleMaps' || currentMapProvider === 'Google';

  if (Platform.OS === 'android') {
    return {
      cap: isGoogleMaps ? [] : [CapType.CUSTOM],
      pattern: isGoogleMaps ? [] : [PatternOption.DOTTED, PatternOption.CUSTOM],
    };
  } else {
    return {
      cap: [CapType.CUSTOM],
      pattern: [PatternOption.DOTTED, PatternOption.CUSTOM],
    };
  }
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

const capItems: Record<CapType, OmhCap> = {
  [CapType.BUTT]: {
    type: 'butt',
  },
  [CapType.ROUND]: {
    type: 'round',
  },
  [CapType.SQUARE]: {
    type: 'square',
  },
  [CapType.CUSTOM]: {
    type: 'custom',
    icon: soccerBallIcon,
    refWidth: 75.0,
  },
};

const referencePolylineColor = rgbToInt([204, 204, 204]);

export const PolylineMapScreen = () => {
  const logger = useLogger('PolylineMapScreen');
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);
  const [isReferencePolylineVisible, setIsReferencePolylineVisible] =
    useState(false);
  const [points, setPoints] = useState(customizablePolylinePoints);
  const [isClickable, setIsClickable] = useState(false);
  const [width, setWidth] = useState(defaultWidth);
  const [colorHue, setColorHue] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [zIndex, setZIndex] = useState(0);
  const [capType, setCapType] = useState(CapType.BUTT);
  const [startCapType, setStartCapType] = useState(CapType.BUTT);
  const [endCapType, setEndCapType] = useState(CapType.BUTT);
  const [shouldUseCommonCap, setShouldUseCommonCap] = useState(true);
  const [jointType, setJointType] = useState<OmhLineJoin>(
    jointTypeItems[0]!!.value
  );
  const [patternOption, setPatternOption] = useState<PatternOption>(
    PatternOption.NONE
  );
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
    return Object.entries(CapType)
      .filter(([_, item]) => !disabledOptions.cap.includes(item))
      .map(([key, label]) => ({ key, label, value: label }));
  }, [disabledOptions]);

  const patternOptions = useMemo(() => {
    return Object.entries(PatternOption)
      .filter(([_key, label]) => !disabledOptions.pattern.includes(label))
      .map(([key, label]) => ({
        key,
        label,
        value: label,
      }));
  }, [disabledOptions]);

  const pattern = useMemo(() => patterns[patternOption], [patternOption]);

  const cap = useMemo(() => {
    return capItems[capType];
  }, [capType]);

  const startCap = useMemo(() => {
    return capItems[startCapType];
  }, [startCapType]);

  const endCap = useMemo(() => {
    return capItems[endCapType];
  }, [endCapType]);

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
        <OmhMapView ref={omhMapRef} onMapReady={handleMapReady}>
          <OmhPolyline
            points={points}
            clickable={isClickable}
            color={colorRGB}
            width={width}
            isVisible={isVisible}
            zIndex={zIndex}
            jointType={jointType}
            pattern={pattern}
            spans={spans}
            onPolylineClick={genOnPolylineClickHandler(
              PolylineMessages.CUSTOMIZABLE_POLYLINE
            )}
            {...capProps}
          />
          <OmhPolyline
            isVisible={isReferencePolylineVisible}
            points={referencePolylinePoints}
            zIndex={2}
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
            label="Show Reference Polyline (Add/Remove)"
            value={isReferencePolylineVisible}
            onValueChange={setIsReferencePolylineVisible}
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
            minimumValue={1}
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
          <Picker<CapType>
            disabled={!supportedFeatures.cap}
            label="Cap"
            choices={capOptions}
            onChange={choice => {
              setCapType(choice);
              setShouldUseCommonCap(true);
            }}
            value={capType}
          />
          <Picker<CapType>
            disabled={!supportedFeatures.startCap}
            label="Start Cap"
            choices={capOptions}
            onChange={choice => {
              setStartCapType(choice);
              setShouldUseCommonCap(
                choice === endCapType && choice === capType
              );
            }}
            value={startCapType}
          />
          <Picker<CapType>
            disabled={!supportedFeatures.endCap}
            label="End Cap"
            choices={capOptions}
            onChange={choice => {
              setEndCapType(choice);
              setShouldUseCommonCap(
                choice === startCapType && choice === capType
              );
            }}
            value={endCapType}
          />
          <Picker<OmhLineJoin>
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
          <Picker<PatternOption>
            disabled={!supportedFeatures.pattern}
            label="Pattern"
            choices={patternOptions}
            onChange={setPatternOption}
            value={patternOption}
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
