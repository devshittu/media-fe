import { useEffect, useRef } from 'react';
import { AnalyticsData } from '@/stores/analytics/analytics'; // Import your AnalyticsData type

export const useUserActivityTracking = (
  storyId: string,
  addData: (data: AnalyticsData) => void,
) => {
  const activityRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null); // Initialize useRef

  useEffect(() => {
    const currentActivityRef = activityRef.current;
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Assign to the .current property of the ref
        startTimeRef.current = Date.now();
      } else if (startTimeRef.current !== null) {
        const timeSpent = Date.now() - startTimeRef.current;
        addData({
          event: 'storyViewed',
          timestamp: Date.now(),
          storyId,
          timeInView: timeSpent,
        });
        startTimeRef.current = null; // Reset startTimeRef
      }
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.75,
    });

    if (currentActivityRef) {
      observer.observe(currentActivityRef);
    }

    return () => {
      if (currentActivityRef) {
        observer.unobserve(currentActivityRef);
      }
    };
  }, [storyId, addData]);

  return activityRef;
};

//Path: src/hooks/useUserActivityTracking.tsx

//Path: src/hooks/useUserActivityTracking.tsx
