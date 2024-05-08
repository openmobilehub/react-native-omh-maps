import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Checkbox, Subheading } from 'react-native-paper';

import {
  OmhInfoWindowConstants,
  OmhInfoWindowViewMode,
  OmhMapView,
  OmhMapViewRef,
  OmhMarker,
  OmhMarkerConstants,
} from '@omh/react-native-maps-core';

import { OmhInfoWindowContents } from '../../../../packages/core/src/components/infoWindow/OmhInfoWindowContents';
import { Anchor } from '../../../../packages/core/src/components/marker/RNOmhMapsMarkerNativeComponent';
import Picker from '../../components/controls/Picker';
import Slider from '../../components/controls/Slider';
import useLogger from '../../hooks/useLogger';
import useSnackbar from '../../hooks/useSnackbar';
import { demoStyles } from '../../styles/demoStyles';
import { Constants } from '../../utils/Constants';
import { MarkerIWTitles } from './MarkerMapScreen';

const disabledMarkerAppearances: Set<OmhInfoWindowViewMode> = new Set(); // TODO: implement this!

export const InfoWindowScreen = () => {
  const logger = useLogger('MarkerMapScreen');
  const { showSnackbar } = useSnackbar();

  const omhMapRef = useRef<OmhMapViewRef | null>(null);

  // IW properties
  const [snippetVisible, setSnippetVisible] = useState(false);
  const [IWAnchor, setIWAnchor] = useState<Anchor>({
    u: OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE.u,
    v: OmhInfoWindowConstants.IW_ANCHOR_CENTER_ABOVE.v,
  });
  const [IWViewMode, setIWViewMode] = useState(
    OmhInfoWindowViewMode.CUSTOM_WINDOW
  );

  // demo behaviour
  const [rerenderIWWhenDragging, setRerenderIWWhenDragging] = useState(true);
  const [toggleIWOnMarkerClick, setToggleIWOnMarkerClick] = useState(true);
  const [hideIWOnClick, setHideIWOnClick] = useState(true);
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [IWContentsKey, setIWContentsKey] = useState<string>('');

  // marker properties
  const [markerVisible, setMarkerVisible] = useState(true);
  const [markerClickable, setMarkerClickable] = useState(true);
  const [markerRotation, setMarkerRotation] = useState(0);
  const [markerAnchor, setMarkerAnchor] = useState<Anchor>({
    u: OmhMarkerConstants.ANCHOR_CENTER.u,
    v: OmhMarkerConstants.ANCHOR_CENTER.v,
  });

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
          }}
          infoWindowViewMode={IWViewMode}>
          <OmhMarker
            title={MarkerIWTitles.CONFIGURABLE_TEST_MARKER}
            position={Constants.Maps.GREENWICH_COORDINATE}
            snippet={
              snippetVisible
                ? 'A sample snippet with long description'
                : undefined
            }
            isVisible={markerVisible}
            clickable={markerClickable}
            rotation={markerRotation}
            anchor={markerAnchor}
            showInfoWindow={showInfoWindow}
            onInfoWindowPress={() => {
              if (hideIWOnClick) {
                setShowInfoWindow(false);
              } else {
                showSnackbar('Info window clicked');
              }
            }}
            onPress={() => {
              if (toggleIWOnMarkerClick) {
                setShowInfoWindow(!showInfoWindow);
              }
            }}
            onDrag={() => {
              setIWContentsKey(_.uniqueId());
            }}
            infoWindowAnchor={IWAnchor}
            draggable>
            <OmhInfoWindowContents key={IWContentsKey}>
              <Text
                style={{
                  backgroundColor: 'magenta',
                  textAlign: 'center',
                  opacity: 0.85,
                  // The Interop Layer doesn't work on either Android or iOS if a legacy view is specifying a custom `ShadowNode`, i.e. in Android by overriding the method `getShadowNodeClass`, `createShadowNodeInstance` etc. Fabric won't call those methods and the widget will most likely be rendered incorrectly (i.e. wrong size, 0 height so unclickable, etc.). You can either work around this by not using custom `ShadowNode` or by converting your library to use TurboModules/Fabric without the Interop Layer.
                  borderWidth: 4,
                  borderStyle: 'dashed',
                  borderColor: 'red',
                }}>
                ASDQJDD
                {/* {'\n'}
                  {'\n'}
                  {'\n'} 87787 1290370947 87324 89372 kjhgiu */}
              </Text>
            </OmhInfoWindowContents>
          </OmhMarker>
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

          <Checkbox.Item
            label="Snippet"
            status={snippetVisible ? 'checked' : 'unchecked'}
            onPress={() => {
              setSnippetVisible(!snippetVisible);
            }}
          />

          <Slider
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

          <Picker<OmhInfoWindowViewMode>
            label="Appearance"
            choices={Object.entries(OmhInfoWindowViewMode)
              .filter(([_key, label]) => !disabledMarkerAppearances.has(label))
              .map(([key, label]) => ({
                key,
                label,
                value: label,
              }))}
            onChange={choice => {
              setIWViewMode(choice);
            }}
            value={IWViewMode}
          />

          <Subheading style={demoStyles.centeredHeading}>
            Demo behaviour
          </Subheading>

          <Checkbox.Item
            label="Re-render info window when dragging"
            status={rerenderIWWhenDragging ? 'checked' : 'unchecked'}
            onPress={() => {
              setRerenderIWWhenDragging(!rerenderIWWhenDragging);
            }}
          />

          <Checkbox.Item
            label="Info win. toggles on marker click"
            status={toggleIWOnMarkerClick ? 'checked' : 'unchecked'}
            onPress={() => {
              setToggleIWOnMarkerClick(!toggleIWOnMarkerClick);
            }}
          />

          <Checkbox.Item
            label="Info win. hides on click"
            status={hideIWOnClick ? 'checked' : 'unchecked'}
            onPress={() => {
              setHideIWOnClick(!hideIWOnClick);
            }}
          />

          <Subheading style={demoStyles.centeredHeading}>
            Imperative usage
          </Subheading>

          <Button
            mode="contained"
            style={styles.button}
            disabled={showInfoWindow}
            onPress={() => {
              setShowInfoWindow(true);
            }}>
            Open info window
          </Button>

          <Button
            mode="contained"
            style={styles.button}
            disabled={!showInfoWindow}
            onPress={() => {
              setShowInfoWindow(false);
            }}>
            Close info window
          </Button>

          <Subheading style={demoStyles.centeredHeading}>
            Marker properties
          </Subheading>

          <Checkbox.Item
            label="Visible"
            status={markerVisible ? 'checked' : 'unchecked'}
            onPress={() => {
              setMarkerVisible(!markerVisible);
            }}
          />

          <Checkbox.Item
            label="Clickable"
            status={markerClickable ? 'checked' : 'unchecked'}
            onPress={() => {
              setMarkerClickable(!markerClickable);
            }}
          />

          <Slider
            label={`Rotation: ${markerRotation.toFixed(0)}°`}
            onChange={zIndex => setMarkerRotation(zIndex)}
            defaultValue={0}
            step={1}
            minimumValue={0}
            maximumValue={360}
          />

          <Slider
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
