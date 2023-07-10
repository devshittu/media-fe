import { useEffect, useRef, useState } from 'react';
import { useScrollBehavior } from '@/hooks';
import { rangeLimit } from '@/utils/helpers';

export const useHeaderScroll = (minTop = 53) => {
  const [topPosition, setTopPosition] = useState(0);
  const { isScrolledUp } = useScrollBehavior();

  useEffect(() => {
    function handleScroll() {
      setTopPosition((prevTopPosition) => {
        const newTop = rangeLimit(
          prevTopPosition + (isScrolledUp ? 1 : -1) * 4, // Adjust the scroll speed (4x) as desired
          -Math.abs(minTop),
          0,
        );
        return newTop;
      });
    }

    // Attach the event listener to the mouse wheel scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolledUp, minTop]);

  return {
    topPosition,
  };
};
