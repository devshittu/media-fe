import Link from 'next/link';
import React from 'react';

export const NotFound = () => {
  return (
    <div className="relative text-center py-12 md:py-24 px-4 2xl:pt-36 2xl:pb-60 bg-white rounded-7xl z-20">
      <div className="relative z-40">
        <span className="block mb-9 uppercase tracking-widest text-xs text-gray-300">{`Can't find`}</span>
        <h2 className="mb-6 font-medium font-heading text-9xl md:text-10xl xl:text-xl leading-tight">
          404
        </h2>
        <p className="max-w-md mb-20 xl:mb-24 mx-auto font-heading font-medium text-3xl leading-10">
          {`Wooops. We can’t find that page or something has gone wrong`}.
        </p>
        <Link
          className="inline-flex items-center pb-2 font-bold tracking-tight text-xl leading-6 text-green-600 hover:text-green-700 border-b border-green-600 hover:border-green-700"
          href="#"
        >
          <span className="mr-3">Back to home</span>
          <svg
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 1L15 7H1"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M11 12L15 7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};
