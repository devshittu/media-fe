import { useEffect, useState, useRef, RefObject } from 'react';

export type UserActivityOptions = {
  saveMetrics: (metrics: any) => void;
  storyId: string; // assuming storyId is a string, change type if needed
};

export type ActivityMetrics = {
  [storyId: string]: {
    enterCount: number;
    timeInView: number;
  };
};

export function useUserActivityTracking(
  options: UserActivityOptions,
): RefObject<HTMLDivElement> {
  const activityRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<ActivityMetrics>({});

  useEffect(() => {
    let startTime: number | null = null;

    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        // Start the timer if item becomes visible
        startTime = Date.now();
      } else if (startTime) {
        // If item becomes invisible, calculate the time spent
        const timeSpent = Date.now() - startTime;

        setMetrics((prevMetrics) => {
          const prevTime = prevMetrics[options.storyId]?.timeInView || 0;
          const prevEnterCount = prevMetrics[options.storyId]?.enterCount || 0;
          return {
            ...prevMetrics,
            [options.storyId]: {
              timeInView: prevTime + timeSpent,
              enterCount: prevEnterCount + 1,
            },
          };
        });

        startTime = null;
      }
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.75, // Adjust this value as needed
    });

    const currentRef = activityRef.current; // Store the current ref value in a constant

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
    if (metrics[options.storyId]) {
      // Call your saveMetrics or any other function with the updated metrics
      options.saveMetrics({ [options.storyId]: metrics[options.storyId] });
    }
  }, [metrics, options]);

  return activityRef;
}
//Path: src/hooks/useUserActivityTracking.tsx
