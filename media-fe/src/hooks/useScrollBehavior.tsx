import React, { useCallback, useEffect, useState } from 'react';

export const useScrollBehavior = () => {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [y, setY] = useState<number>(
    typeof window !== 'undefined'
      ? window.scrollY ||
          window.pageYOffset ||
          document.documentElement.scrollTop
      : 0,
  );
  const [screenHeight, setScreenHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 0,
  );
  const [initialScrollPosition, setInitialScrollPosition] = useState<number>(0);

  const handleNavigation = useCallback(
    (e: Event) => {
      const windowScrollY = (e.currentTarget as Window).scrollY;
      if (y > windowScrollY) {
        setIsScrolledUp(true);
      } else if (y < windowScrollY) {
        setIsScrolledUp(false);
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

  useEffect(() => {
    if (!isScrolledUp) {
      setInitialScrollPosition(y);
    }
  }, [y, isScrolledUp]);

  return { isScrolledUp, yPosition: y, screenHeight, initialScrollPosition };
};
