import { useEffect, useState } from 'react';

type ScrollSpeedSettings = {
  delay?: number; // in milliseconds (higher means lower fidelity)
};

const useScrollSpeed = (settings?: ScrollSpeedSettings) => {
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    let lastPos: number | null = null;
    let newPos: number;
    let timer: ReturnType<typeof setTimeout>;
    let delta: number;
    const delay: number = settings?.delay || 50;

    function clear() {
      lastPos = null;
      delta = 0;
    }

    function calculateScrollSpeed() {
      newPos = window.scrollY;
      if (lastPos !== null) {
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      setScrollSpeed(delta);
    }

    window.addEventListener('scroll', calculateScrollSpeed);

    return () => {
      window.removeEventListener('scroll', calculateScrollSpeed);
    };
  }, [settings?.delay]);

  return scrollSpeed;
};

export default useScrollSpeed;
