import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { CarouselProps } from './types';


const Carousel = ({ items, options = {} }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const next = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  useEffect(() => {
    if (options.autoplay) {
      const interval = setInterval(next, options.autoplaySpeed || 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [options.autoplay, options.autoplaySpeed, next]);

    return (
      <div
        id="animation-carousel"
        className="relative w-full"
        data-carousel="static"
      >
        {/* <!-- Carousel wrapper --> */}
        <div className="relative h-48 overflow-hidden rounded-lg md:h-56">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <div
                id={item.id}
                className={`duration-200 ease-linear absolute inset-0 transition-transform transform ${
                  index === activeIndex
                    ? 'translate-x-0 z-[5]'
                    : ' -translate-x-full z-[4]'
                }`}
                data-carousel-item={
                  index === activeIndex ? 'active' : 'inactive'
                }
              >
                {item.media.includes('.mp4') ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  >
                    <source src={item.media} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    width="500"
                    height="300"
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
                    src={item.media}
                    alt=""
                    loading="eager"
                  />
                )}
              </div>
              <div className="absolute bottom-0 left-0 z-[10] w-full p-4 bg-black/30 backdrop-blur-md bg-opacity-50 text-white">
                <p className="text-lg font-medium">{item.caption}</p>
              </div>
            </React.Fragment>
          ))}

          {/* <!-- Slider controls --> */}
          <button
            type="button"
            className="absolute top-0 left-0 z-[6] flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
            onClick={prev}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-slate-800/30 group-hover:bg-white/50 dark:group-hover:bg-slate-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-slate-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-slate-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-[6] flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
            onClick={next}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-slate-800/30 group-hover:bg-white/50 dark:group-hover:bg-slate-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-slate-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-slate-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    );
  }

const CarouselModule = {
  Carousel,
};

export default CarouselModule;
