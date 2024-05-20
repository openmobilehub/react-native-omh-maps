/**
 * Helper function to reset the interval held by the passed in ref object
 * if the reference's current value is not null.
 *
 * @param intervalRef the reference object to the interval.
 */
export function maybeResetInterval(
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
) {
  if (intervalRef.current !== null) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
}
