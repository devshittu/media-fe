import { useEffect, useState } from 'react';
import { useScrollSpeed } from '@/hooks';
import { rangeLimit } from '@/utils/helpers';

export const useScrollSync = (minTop = 53) => {
  const [topPosition, setTopPosition] = useState(0);
  const scrollSpeed = useScrollSpeed({ delay: 40 }) || 0; // Initialize with a default value of 0

  useEffect(() => {
    function handleScroll() {
      setTopPosition((prevTopPosition) => {
        // Adjust the behavior based on the scroll speed and direction
        const newTop = rangeLimit(prevTopPosition - scrollSpeed, -minTop, 0);
        return newTop;
      });
    }

    // Attach the event listener to the scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [minTop, scrollSpeed]);

  return {
    topPosition,
  };
};
