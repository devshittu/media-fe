import { useEffect, useRef } from 'react';

export const useElementAvailable = (
  id: string,
  callback: () => void,
  delay = 500,
) => {
  const timeoutRef = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkElement = () => {
      const element = document.getElementById(id);
      if (element) {
        callback();
      } else {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current as NodeJS.Timeout);
        }

        // Set a new timeout
        timeoutRef.current = setTimeout(checkElement, delay);
      }
    };

    checkElement();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current as NodeJS.Timeout);
      }
    };
  }, [id, callback, delay]);
};

// Path: src/hooks/useElementAvailable.ts

// import { useEffect, useRef } from 'react';
// import { useAnimation } from 'framer-motion';

// export const useElementAvailable = (
//   id: string,
//   shouldAnimate: boolean,
//   delay = 500,
// ) => {
//   const timeoutRef = useRef<number | NodeJS.Timeout | null>(null);
//   const controls = useAnimation();

//   useEffect(() => {
//     const checkElementAndAnimate = () => {
//       const element = document.getElementById(id);
//       if (element && shouldAnimate) {
//         // Perform the animation
//         controls.start({ y: 1148 }).then(() => {
//           controls.start({ y: 0 });
//         });
//       } else {
//         // Clear any existing timeout
//         if (timeoutRef.current) {
//           clearTimeout(timeoutRef.current as NodeJS.Timeout);
//         }

//         // Set a new timeout
//         timeoutRef.current = setTimeout(checkElementAndAnimate, delay);
//       }
//     };

//     checkElementAndAnimate();

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current as NodeJS.Timeout);
//       }
//     };
//   }, [id, shouldAnimate, delay, controls]);
// };
