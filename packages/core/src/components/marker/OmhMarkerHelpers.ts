import { useMemo } from 'react';

const standardKey = 'marker';
const draggableKey = 'marker-draggable';
const nonDraggableKey = 'marker-non-draggable';

// Apple has a bug where only the initial value of the draggable prop is taken to the consideration.
// By using key prop we force refresh of the component. Note that markerRef?.current?.redraw() cant be used here
// either as the command is not implemented on the native side - another bug.
export const useDraggableFix = (provider: string, draggable?: boolean) => {
  const key = useMemo(() => {
    if (provider === 'Apple') {
      return draggable ? draggableKey : nonDraggableKey;
    }
    return standardKey;
  }, [provider, draggable]);

  return key;
};
