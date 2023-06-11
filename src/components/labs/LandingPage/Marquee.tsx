import React, { useState } from 'react';
export type MarqueeItem = {
  id: string;
  title: string;
  description?: string;
  media?: string;
  children?: React.ReactNode;
};

export type MarqueeProps = {
  items?: MarqueeItem[];
  play?: boolean;
  children?: React.ReactNode;
  className?: string;
  hoverToPause?: boolean;
  loop?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  scaleItems?: boolean;
  reverse?: boolean;
};

const Marquee = ({
  children,
  items = [],
  play = true,
  speed = 'normal',
  reverse = false,
  hoverToPause = false,
}: MarqueeProps) => {
  const getSpeedClass = () => {
    switch (speed) {
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
    <section>
      <div className="marquee flex gap-4 relative select-none overflow-hidden my-2 group">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className={`${
              hoverToPause ? ` group-hover:paused ` : ''
            } motion-reduce:paused shrink-0 flex justify-around items-center gap-4 min-h-fit my-10 min-w-full  ${
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

export default Marquee;

// Path: src/components/labs/LandingPage/Marquee.tsx
