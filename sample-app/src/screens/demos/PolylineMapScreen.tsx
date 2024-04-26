import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Checkbox, Subheading } from 'react-native-paper';

import {
  OmhCoordinate,
  OmhMapView,
  OmhPolyline,
  OmhPolylineConstants,
} from '@omh/react-native-maps-core';

import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import { Cap } from '../../../../packages/core/src/components/polyline/RNOmhMapsPolylineNativeComponent';
import { getRandomArbitrary } from '../../utils/mathHelpers';
import { demoStyles } from '../../styles/demoStyles';
import ControlParagraph from '../../components/controls/ControlParagraph';
import { rgbToInt } from '../../utils/converters';
import convert from 'color-convert';
import { OmhMapsGooglemapsProvider } from '@omh/react-native-maps-plugin-googlemaps';
import useChosenMapProvider from '../../hooks/useChosenMapProvider';
import { PanelButton } from '../../components/PanelButton';
import CAP_TYPE_CUSTOM = OmhPolylineConstants.CAP_TYPE_CUSTOM;
import { OmhMapsOpenStreetMapProvider } from '@omh/react-native-maps-plugin-openstreetmap';

const defaultPoints: OmhCoordinate[] = [
  { latitude: 0.0, longitude: 0.0 },
  { latitude: 30.0, longitude: 10.0 },
  { latitude: 20.0, longitude: 20.0 },
  { latitude: 20.0, longitude: 20.0 },
  { latitude: 20.0, longitude: 30.0 },
  { latitude: 10.0, longitude: 30.0 },
  { latitude: -10.0, longitude: 40.0 },
  { latitude: 15.0, longitude: 60.0 },
];

const defaultWidth = 10;

type CapItem = {
  label: string;
  value: Cap;
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
  // TODO dn: custom
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

export const PolylineMapScreen = () => {
  const mapProvider = useChosenMapProvider();

  const [mountCustomizablePolyline, setMountCustomizablePolyline] =
    useState(true);
  const [points, setPoints] = useState(defaultPoints);
  const [isClickable, setIsClickable] = useState(false);
  const [width, setWidth] = useState(defaultWidth);
  const [colorHue, setColorHue] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [zIndex, setZIndex] = useState(0);
  const [cap, setCap] = useState(capItems[0]!!.value);
  const [startCap, setStartCap] = useState(capItems[0]!!.value);
  const [endCap, setEndCap] = useState(capItems[0]!!.value);
  const [jointType, setJointType] = useState(jointTypeItems[0]!!.value);

  const colorRGB = useMemo(
    () => rgbToInt(convert.hsv.rgb([colorHue, 100, 100])),
    [colorHue]
  );

  const onRandomisePoints = () => {
    let randomisedPoints = Array.from({ length: 8 }, (_, i) => {
      let baseLongitude = i * 5;
      let minLongitude = baseLongitude - 5;
      let maxLongitude = baseLongitude + 5;
      return {
        latitude: getRandomArbitrary(-30, 30),
        longitude: getRandomArbitrary(minLongitude, maxLongitude),
      };
    });

    setPoints(randomisedPoints);
  };

  const zIndexSupported = useMemo(
    () => mapProvider.path === OmhMapsGooglemapsProvider.path,
    [mapProvider.path]
  );

  const jointTypeSupported = useMemo(
    () => mapProvider.path !== OmhMapsOpenStreetMapProvider.path,
    [mapProvider.path]
  );

  const startEndCapSupported = useMemo(
    () => mapProvider.path === OmhMapsGooglemapsProvider.path,
    [mapProvider.path]
  );

  const disabledCapTypes = useMemo(() => {
    let blacklist = new Set<string>();

    if (mapProvider.path !== OmhMapsGooglemapsProvider.path) {
      blacklist.add(CAP_TYPE_CUSTOM);
    }

    return blacklist;
  }, [mapProvider.path]);

  const capItemToChoice = (item: CapItem) => {
    return {
      key: item.value.type,
      label: item.label,
      value: item.value,
    };
  };

  const capItemChoices = capItems
    .filter(item => !disabledCapTypes.has(item.value.type))
    .map(item => capItemToChoice(item));

  return (
    <View style={demoStyles.rootContainer}>
      <View style={demoStyles.mapContainer}>
        <OmhMapView width="100%" height="100%">
          {mountCustomizablePolyline && (
            <OmhPolyline
              points={points}
              clickable={isClickable}
              color={colorRGB}
              width={width}
              isVisible={isVisible}
              polylineZIndex={zIndex}
              cap={cap}
              startCap={startCap}
              endCap={endCap}
              jointType={jointType}
            />
          )}
        </OmhMapView>
      </View>

      <View style={demoStyles.demoControlsScrollViewContainer}>
        <ScrollView
          contentContainerStyle={
            demoStyles.demoControlsScrollViewContentContainer
          }>
          <Subheading style={demoStyles.centeredHeading}>
            Polyline properties
          </Subheading>

          <PanelButton onPress={onRandomisePoints} label="Randomize Points" />

          <Checkbox.Item
            label="Visible"
            status={isVisible ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsVisible(!isVisible);
            }}
          />

          <Checkbox.Item
            label="Clickable"
            status={isClickable ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsClickable(!isClickable);
            }}
          />

          <Slider
            label={`Width: ${width}`}
            onChange={H => setWidth(H)}
            defaultValue={defaultWidth}
            step={1}
            minimumValue={0}
            maximumValue={100}
          />

          <Slider
            label={`Color hue: ${colorHue.toFixed(0)}`}
            onChange={H => setColorHue(H)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />

          <Picker<Cap>
            label="Cap"
            choices={capItemChoices}
            onChange={choice => {
              setCap(choice);
            }}
            value={cap}
          />

          <Picker<Cap>
            disabled={!startEndCapSupported}
            label="Start Cap"
            choices={capItemChoices}
            onChange={choice => {
              setStartCap(choice);
            }}
            value={cap}
          />

          <Picker<Cap>
            disabled={!startEndCapSupported}
            label="End Cap"
            choices={capItemChoices}
            onChange={choice => {
              setEndCap(choice);
            }}
            value={cap}
          />

          <ControlParagraph>Z Index</ControlParagraph>
          <Slider
            disabled={!zIndexSupported}
            label={`Z Index: ${zIndex.toFixed(0)}`}
            onChange={z => setZIndex(z)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={5}
          />

          <Picker<number>
            disabled={!jointTypeSupported}
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

          <Subheading style={demoStyles.centeredHeading}>
            Demo behaviour
          </Subheading>

          <Checkbox.Item
            label="Mount customizable <OmhPolyline/>"
            status={mountCustomizablePolyline ? 'checked' : 'unchecked'}
            onPress={() => {
              setMountCustomizablePolyline(!mountCustomizablePolyline);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PolylineMapScreen;
