'use client';
import { useEffect, useRef, useState } from 'react';
import { AppLogoIcon, Icon, TwitterIcon } from '../illustrations';

export const LoadingSplash: React.FC = () => {
  // const [pathLength, setPathLength] = useState(0);
  // const pathRef = useRef<SVGPathElement>(null);

  // useEffect(() => {
  //   if (pathRef.current) {
  //     // setPathLength(pathRef.current.getTotalLength());
  //     const length = pathRef.current.getTotalLength();
  //     console.log(`The length of the SVG path is: ${length}`);
  //   }
  // }, []);
  return (
    <>
      <div className="flex h-screenx h-96 justify-center items-center relative">
        {/* <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className=""
          role="img"
          aria-hidden="true"
          stroke-width="2"
        >
          <path
            ref={pathRef}
            d="M3 1h7v12H3zM3 17h7v6H3zM14 1h7v6h-7zM14 11h7v12h-7z"
          ></path>
        </svg> */}
        <IconBlockScale />
        <IconGrow />
      </div>
    </>
  );
};

export const IconBlockScale = () => (
  <div
    className={`icon block w-44 h-44 p-4  bg-cyan-200 dark:bg-cyan-700 text-cyan-500 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}
  >
    <div className={`flex justify-center items-center h-full`}>
      <Icon
        icon={
          <AppLogoIcon
            className="w-12 h-12 overflow-visible animate-loader-dash stroke-current"
            style={{
              strokeDasharray: '0 129',
            }}
          />
        }
      />
    </div>
  </div>
);
export const IconGrow = () => (
  <div
    className={` icon block w-44 h-44 p-4 bg-cyan-200 dark:bg-cyan-700 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   
        icon_grow z-0 animate-loader-grow
        `}
  />
);
