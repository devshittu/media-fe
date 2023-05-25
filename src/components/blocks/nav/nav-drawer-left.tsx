import React, { useContext, useState } from 'react';
import { NavContext, NavDrawerProps } from './index';

export const NavDrawerLeft = ({ title, children }: NavDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { setIsNavOpen } = useContext(NavContext);

  const toggleSidebar = () => {
    const openStatus = !isOpen;
    setIsOpen(openStatus);
    setIsNavOpen(openStatus);
  };

  return (
    <>
      <button
        type="button"
        className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Navigation</span>
        <svg width="24" height="24">
          <path
            d="M5 6h14M5 12h14M5 18h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
      <div
        className={`fixedx inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 z-[51] w-full h-screen overflow-y-hidden ${
          isOpen
            ? 'fixed top-0 bottom-0 left-0 right-0 overflow-y-hidden'
            : 'hidden '
        }`}
        id="headlessui-dialog-overlay-:r4:"
        aria-hidden="true"
        data-headlessui-state="open"
        onClick={toggleSidebar}
      ></div>

      <section
        id="drawer-disable-body-scrolling"
        className={`fixed top-0 left-0 z-[1001] h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-slate-800 ${
          isOpen ? 'transform-none' : '-translate-x-full '
        }`}
        tabIndex={-1}
        aria-labelledby="drawer-disable-body-scrolling-label"
      >
        <h5
          id="drawer-disable-body-scrolling-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          {title ? title : 'Menu'}
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-disable-body-scrolling"
          aria-controls="drawer-disable-body-scrolling"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={toggleSidebar}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        {/* The drawer body */}
        <section className="py-4 overflow-y-auto">
          {children ? children : <p>Drawer body undefined </p>}
        </section>
      </section>
    </>
  );
};
