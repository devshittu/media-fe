import { useEffect, useState, useRef, RefObject } from 'react';

export type UserActivityOptions = {
  saveMetrics: (metrics: any) => void;
  storyId: string;
};

export type ActivityMetrics = {
  [storyId: string]: {
    enterCount: number;
    timeInView: number;
  };
};

// Simple throttle function
function throttle(func: Function, delay: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

export function useUserActivityTracking(
  options: UserActivityOptions,
): RefObject<HTMLDivElement> {
  const activityRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<ActivityMetrics>({});
  const batchedMetrics = useRef<ActivityMetrics>({});

  useEffect(() => {
    let startTime: number | null = null;

    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        startTime = Date.now();
      } else if (startTime) {
        const timeSpent = Date.now() - startTime;
        const prevTime =
          batchedMetrics.current[options.storyId]?.timeInView || 0;
        const prevEnterCount =
          batchedMetrics.current[options.storyId]?.enterCount || 0;

        batchedMetrics.current = {
          ...batchedMetrics.current,
          [options.storyId]: {
            timeInView: prevTime + timeSpent,
            enterCount: prevEnterCount + 1,
          },
        };

        startTime = null;
      }
    };

    const throttledVisibilityChange = throttle(handleVisibilityChange, 500); // Throttle to once every 500ms

    const observer = new IntersectionObserver(throttledVisibilityChange, {
      threshold: 0.75,
    });

    const currentRef = activityRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [activityRef, options.storyId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(batchedMetrics.current).length) {
        setMetrics((prev) => ({
          ...prev,
          ...batchedMetrics.current,
        }));
        batchedMetrics.current = {};
      }
    }, 5000); // Batch updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (metrics[options.storyId]) {
      options.saveMetrics({ [options.storyId]: metrics[options.storyId] });
    }
  }, [metrics, options]);

  return activityRef;
}

//Path: src/hooks/useUserActivityTracking.tsx
