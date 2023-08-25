import { useEffect, useState, useRef } from 'react';
import { useScrollSpeed } from '@/hooks';
import { rangeLimit } from '@/utils/helpers';

export const useScrollSync = (minTop = 53) => {
  const [topPosition, setTopPosition] = useState(0);
  const scrollSpeed = useScrollSpeed({ delay: 40 }) || 0;
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    function handleScroll() {
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
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [minTop, scrollSpeed]);

  return {
    topPosition,
  };
};
