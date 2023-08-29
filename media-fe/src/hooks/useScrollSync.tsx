import { useEffect, useState, useRef } from 'react';
import { useScrollSpeed } from '@/hooks';
import { rangeLimit } from '@/utils/helpers';
import throttle from 'lodash.throttle';

type useScrollSyncType = {
  contentHeight?: number;
  minTop?: number;
};

export const useScrollSync = ({
  contentHeight,
  minTop = 53,
}: useScrollSyncType) => {
  const [topPosition, setTopPosition] = useState(0);
  const scrollSpeed = useScrollSpeed({ delay: 40 }) || 0;
  const animationFrame = useRef<number | null>(null);

  const handleScroll = throttle(() => {
    // Cancel the previous frame
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    // Schedule the next frame
    animationFrame.current = requestAnimationFrame(() => {
      setTopPosition((prevTopPosition) => {
        const newTop = rangeLimit(prevTopPosition - scrollSpeed, -minTop, 0);
        return newTop;
      });
    });
  });
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [minTop, scrollSpeed, handleScroll]);

  return {
    topPosition,
  };
};
