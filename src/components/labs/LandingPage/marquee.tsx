import React, { useState } from 'react';
import { MarqueeProps } from './types';

export const Marquee = ({
  children,
  items = [],
  play = true,
  speed = 'normal',
  reverse = false,
  hoverToPause = false,
}: MarqueeProps) => {
  const getSpeedClass = () => {
    switch (speed) {
      case 'slowest':
        return 'animate-[scroll_200s_linear_infinite]';
      case 'slower':
        return 'animate-[scroll_44s_linear_infinite]';
      case 'slow':
        return 'animate-[scroll_33s_linear_infinite]';
      case 'normal':
        return 'animate-[scroll_22s_linear_infinite]';
      case 'fast':
        return 'animate-[scroll_11s_linear_infinite]';
      default:
        return 'animate-[scroll_22s_linear_infinite]';
    }
  };

  return (
    <section className=" w-full">
      <div className="marquee flex gap-4x relative select-none overflow-hidden my-2x group max-w-fit">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            aria-hidden={index === 1 ? 'true' : 'false'}
            className={`${
              hoverToPause ? ` group-hover:paused ` : ''
            } motion-reduce:paused shrink-0 flex justify-around items-center gap-4 my-2 mx-2 min-w-full  ${
              play ? ` ${getSpeedClass()} ${reverse ? `reverse ` : ''} ` : ''
            }`}
          >
            {children ? (
              children
            ) : (
              <>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-[0_0_auto] bg-slate-800 px-8 py-4 text-center transition duration-700 transform dark:bg-slate-900 rounded shadow-sm hover:scale-125 md:shadow-md hover:shadow-md`}
                  >
                    {item.title}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Path: src/components/labs/LandingPage/Marquee.tsx
