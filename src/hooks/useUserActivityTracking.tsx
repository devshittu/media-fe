import { useCallback, useEffect, useRef, useState } from 'react';
import useDebounce from './useDebounce';

const DEBOUNCE_TIME = 1000;
export type UserActivityMetrics = { timeInView: number; enterCount: number };
export type UserActivityTrackingOptions = {
  saveMetrics: (metrics: UserActivityMetrics) => void;
};

export function useUserActivityTracking(options: UserActivityTrackingOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const [timeInView, setTimeInView] = useState(0);
  const [enterCount, setEnterCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasLoggedMetrics, setHasLoggedMetrics] = useState(false);

  const debouncedTimeInView = useDebounce(timeInView, DEBOUNCE_TIME);

  const handleVisibilityChange = useCallback(
    (isIntersecting: boolean) => {
      if (isIntersecting) {
        setEnterCount((prevCount) => prevCount + 1);
        setStartTime(Date.now());
        setHasLoggedMetrics(false); // reset metric logging flag on visibility change
      } else {
        if (startTime) {
          const timeSpent = Date.now() - startTime;
          setTimeInView((prevTime) => prevTime + timeSpent);
        }
      }
    },
    [startTime],
  );

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        handleVisibilityChange(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      // Only log metrics once after the last visibility change event
      if (debouncedTimeInView && !hasLoggedMetrics) {
        options.saveMetrics({ timeInView: debouncedTimeInView, enterCount });
        setHasLoggedMetrics(true); // mark metrics as logged
      }
    };
  }, [
    debouncedTimeInView,
    enterCount,
    handleVisibilityChange,
    options,
    hasLoggedMetrics,
  ]);

  return ref;
}
