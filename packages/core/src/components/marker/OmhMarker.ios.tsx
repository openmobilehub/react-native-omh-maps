import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Marker, MarkerPressEvent } from 'react-native-maps';
import { OmhMarkerProps } from './OmhMarker.types';
import { omhColorToString } from '../../utils/colorHelper';
import {
  MarkerDragEvent,
  MarkerDragStartEndEvent,
} from 'react-native-maps/lib/sharedTypes';
import { anchorToPoint } from '../../utils/anchorHelpers';
import { MapMarker } from 'react-native-maps/lib/MapMarker';

/**
 * The OMH Marker component.
 */
export const OmhMarker = ({
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
  markerZIndex,
  icon,
  onPress,
  onDragStart,
  onDrag,
  onDragEnd,
  showInfoWindow,
}: OmhMarkerProps) => {
  const markerRef = useRef<MapMarker | null>(null);

  useEffect(() => {
    if (showInfoWindow === undefined) {
      return;
    }
    if (showInfoWindow) {
      markerRef.current?.showCallout();
    } else {
      markerRef.current?.hideCallout();
    }
  }, [showInfoWindow, markerRef]);

  const anchorPoint = useMemo(() => {
    return anchorToPoint(anchor);
  }, [anchor]);

  const calloutAnchorPoint = useMemo(() => {
    return anchorToPoint(infoWindowAnchor);
  }, [infoWindowAnchor]);

  const pinColor = useMemo(() => {
    if (!backgroundColor) return undefined;
    return omhColorToString(backgroundColor);
  }, [backgroundColor]);

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

  return (
    isVisible && (
      <Marker
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
        zIndex={markerZIndex}
        icon={icon}
        onPress={handleOnPress}
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
        onDrag={handleOnDrag}
        ref={markerRef}
      />
    )
  );
};
