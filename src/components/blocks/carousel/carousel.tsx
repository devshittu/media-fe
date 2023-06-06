import Image from 'next/image';
import React, { useState } from 'react';
import { CarouselProps } from './types';

const Carousel = ({ items }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <>
      <div className="text-slate-400 font-medium text-sm mb-8 mt-6x mx-3x px-2x">
        <div
          id="animation-carousel"
          className="relative w-full"
          data-carousel="static"
        >
          {/* <!-- Carousel wrapper --> */}
          <div className="relative h-40 overflow-hidden rounded-lg md:h-56">
            {items.map((item, index) => (
              <>
                <div
                  key={index + item.media}
                  id={index + item.media}
                  className={`hiddenx duration-200 ease-linear ${
                    index === activeIndex ? 'translate-x-0' : 'translate-x-full'
                  }`}
                  data-carousel-item
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
                      height="00"
                      className="h-full w-full object-cover "
                      src={item.media}
                      alt=""
                    />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/30 backdrop-blur-md bg-opacity-50 text-white">
                  <p className="text-lg font-medium">{item.caption}</p>
                </div>
              </>
            ))}
            {/* <!-- Slider controls --> */}
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
              onClick={handlePrev}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
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
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
              onClick={handleNext}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
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
      </div>
    </>
  );
};

export default Carousel;
