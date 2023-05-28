import React, { useCallback, useEffect, useState } from 'react';

export const useScrollBehavior = () => {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [y, setY] = useState<number>(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );
  const [screenHeight, setScreenHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 0,
  );

  const handleNavigation = useCallback(
    (e: Event) => {
      const windowScrollY = (e.currentTarget as Window).scrollY;
      if (y > windowScrollY) {
        console.log('scrolling up');
        setIsScrolledUp(true);
      } else if (y < windowScrollY) {
        setIsScrolledUp(false);
        console.log('scrolling down');
      }
      setY(windowScrollY);
    },
    [y],
  );

  useEffect(() => {
    setY(typeof window !== 'undefined' ? window.scrollY : 0);
    setScreenHeight(typeof window !== 'undefined' ? window.innerHeight : 0);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return { isScrolledUp, yPosition: y, screenHeight };
};
