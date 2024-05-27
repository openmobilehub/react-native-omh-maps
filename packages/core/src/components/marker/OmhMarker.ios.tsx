import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { MapMarker, Marker, MarkerPressEvent } from 'react-native-maps';
import { OmhMarkerProps, OmhMarkerRef } from './OmhMarker.types';
import { omhColorToString } from '../../utils/colorHelper';
import {
  CalloutPressEvent,
  MarkerDragEvent,
  MarkerDragStartEndEvent,
} from 'react-native-maps/lib/sharedTypes';
import { anchorToPoint } from '../../utils/anchorHelpers';
import { OmhMapsModule } from '../../modules/core/OmhMapsModule.ios';
import { useDraggableFix } from './OmhMarkerHelpers';
import { OmhMarkerConstants } from './OmhMarkerConstants';

/**
 * The OMH Marker component.
 */
export const OmhMarker = forwardRef<OmhMarkerRef, OmhMarkerProps>(
  (
    {
      position,
      title,
      clickable,
      draggable,
      anchor,
      infoWindowAnchor,
      alpha,
      snippet,
      isVisible = true,
      isFlat,
      rotation,
      backgroundColor,
      icon,
      onPress,
      onDragStart,
      onDrag,
      onDragEnd,
      onInfoWindowPress,
    },
    forwardedRef
  ) => {
    const provider = OmhMapsModule.getSelectedMapProvider();

    const markerRef = useRef<MapMarker | null>(null);

    const key = useDraggableFix(provider.name, draggable);

    useImperativeHandle(forwardedRef, () => ({
      showInfoWindow: () => {
        markerRef.current?.showCallout();
      },
      hideInfoWindow: () => {
        markerRef.current?.hideCallout();
      },
    }));

    const anchorPoint = useMemo(() => {
      return anchorToPoint(anchor);
    }, [anchor]);

    const calloutAnchorPoint = useMemo(() => {
      return anchorToPoint(infoWindowAnchor);
    }, [infoWindowAnchor]);

    const pinColor = useMemo(() => {
      if (icon) return undefined;
      if (backgroundColor) return omhColorToString(backgroundColor);
      // There is an issue in the react-native-maps library.
      // When the icon changes to undefined and color is undefined, the marker does not update.
      // To fix this, we set a default color when the icon is undefined.
      return OmhMarkerConstants.DEFAULT_COLOR;
    }, [backgroundColor, icon]);

    const handleOnPress = useCallback(
      (event: MarkerPressEvent) => {
        onPress?.({
          ...event,
          nativeEvent: {
            ...event.nativeEvent,
            position: event.nativeEvent.coordinate,
          },
        });
      },
      [onPress]
    );

    const handleOnDragStart = useCallback(
      (event: MarkerDragStartEndEvent) => {
        onDragStart?.({
          ...event,
          nativeEvent: {
            ...event.nativeEvent,
            position: event.nativeEvent.coordinate,
          },
        });
      },
      [onDragStart]
    );

    const handleOnDragEnd = useCallback(
      (event: MarkerDragStartEndEvent) => {
        onDragEnd?.({
          ...event,
          nativeEvent: {
            ...event.nativeEvent,
            position: event.nativeEvent.coordinate,
          },
        });
      },
      [onDragEnd]
    );

    const handleOnDrag = useCallback(
      (event: MarkerDragEvent) => {
        onDrag?.({
          ...event,
          nativeEvent: {
            ...event.nativeEvent,
            position: event.nativeEvent.coordinate,
          },
        });
      },
      [onDrag]
    );

    const handleOnCalloutPress = useCallback(
      (event: CalloutPressEvent) => {
        onInfoWindowPress?.({
          ...event,
          nativeEvent: {
            ...event.nativeEvent,
            position: event.nativeEvent.coordinate,
          },
        });
      },
      [onInfoWindowPress]
    );

    return (
      isVisible && (
        <Marker
          key={key}
          coordinate={position}
          title={title}
          description={snippet}
          tappable={clickable}
          draggable={draggable}
          anchor={anchorPoint}
          calloutAnchor={calloutAnchorPoint}
          opacity={alpha}
          pinColor={pinColor}
          flat={isFlat}
          rotation={rotation}
          icon={icon}
          onPress={handleOnPress}
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
          onDrag={handleOnDrag}
          onCalloutPress={handleOnCalloutPress}
          ref={markerRef}
        />
      )
    );
  }
);
