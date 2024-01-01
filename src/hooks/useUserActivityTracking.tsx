import { AnalyticsData, InteractionType } from '@/features/analytics/types';
import { useEffect, useRef } from 'react';

export const useUserActivityTracking = (
  storyId: string,
  addData: (data: AnalyticsData | any) => void,
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
        if (timeSpent >= 2000) {
          // Only add data if timeInView is at least 2 seconds

          const analyticsData = {
            analytics_store_id: '', // This will be generated in the store
            story: storyId,
            interaction_type: InteractionType.STORY_VIEW,
            event: InteractionType.STORY_VIEW,
            timestamp: Date.now(),
            metadata: {
              story_id: storyId,
              time_in_view: timeSpent,
              timestamp: Date.now(),
            },
          };
          addData(analyticsData);
        }
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
