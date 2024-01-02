import { useEffect, useRef, useState } from 'react';
import { Icon, TwitterIcon } from '../illustrations';

export const LoadingSplash: React.FC = () => {
//   const [pathLength, setPathLength] = useState(0);
//   const pathRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     if (pathRef.current) {
//       // setPathLength(pathRef.current.getTotalLength());
//       const length = pathRef.current.getTotalLength();
//       console.log(`The length of the SVG path is: ${length}`);
//     }
//   }, []);
  return (
    <>
      <div className="flex h-screenx h-96 justify-center items-center relative">
        {/* 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            ref={pathRef}
            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
          ></path>
        </svg> */}
        <div
          className={`icon block w-44 h-44 p-4 bg-cyan-200 text-cyan-500 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}
        >
          <div className={`flex justify-center items-center h-full`}>
            <Icon
              icon={
                <TwitterIcon
                  className="w-12 h-12 overflow-visible animate-loader-dash stroke-current"
                  style={{
                    strokeDasharray: '0 90',
                  }}
                />
              }
            />
          </div>
        </div>
        <div
          className={` icon block w-44 h-44 p-4 bg-cyan-200 dark:bg-cyan-200 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   
        icon_grow z-0 animate-loader-grow
        `}
        />
      </div>
    </>
  );
};
