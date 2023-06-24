import React, { useContext, useEffect, useState } from 'react';
import { DrawerProps, NavContext, NavDrawerProps } from './index';
import {
  Icon,
  MoreHorizontalIcon,
  ShareIcon,
  XIcon,
} from '@/components/illustrations';
import { useKeyPress } from '@/hooks';
import Portal from '@/hoc/Portal';

export const DrawerComponent = ({
  id,
  isActive = false,
  title,
  titleIcon,
  children,
  onClose,
}: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const { setIsNavOpen } = useContext(NavContext);

  const escapePressed = useKeyPress('Escape');

  const openDrawer = () => {
    setIsOpen(true);
    setIsNavOpen(true);
    // document.documentElement.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setIsNavOpen(false);
    if (onClose) {
      onClose();
    }
    // document.documentElement.style.overflow = '';
  };

  //   const toggleSidebar = () => {
  //     const openStatus = !isOpen;
  //     setIsOpen(openStatus);
  //     setIsNavOpen(openStatus);
  //   };

  useEffect(() => {
    if (isActive) {
      openDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (escapePressed) {
      closeDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapePressed]);

  return (
    <>
      <Portal wrapperId="drawer-wrapper">
        {/* Overlay background */}
        <div
          className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 w-full h-screen overflow-y-hidden ${
            isOpen ? 'fixed' : 'hidden '
          }`}
          id={`${id}-drawer-overlay`}
          aria-labelledby={`${id}-label`}
          aria-hidden="true"
          onClick={closeDrawer}
          data-drawer-state={`${isOpen ? 'open' : 'close'}`}
        ></div>

        {/* The drawer body */}
        <section
          id={id}
          className={`fixed bottom-0 left-0 right-0 z-30 w-full p-4 overflow-y-auto transition-transform bg-white dark:bg-slate-800 ${
            isOpen ? 'transform-none' : 'translate-y-full '
          }`}
          tabIndex={-1}
          aria-labelledby="drawer-bottom-label"
        >
          <header>
            <h5
              id="drawer-bottom-label"
              className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
            >
              <ShareIcon className="w-5 h-5 mr-2" strokeWidth={2.5} />
              {titleIcon && titleIcon}
              {title ? title : 'Undefined Title'}
            </h5>
            <button
              type="button"
              data-drawer-hide="drawer-bottom-example"
              aria-controls="drawer-bottom-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeDrawer}
            >
              <span className="sr-only">Close menu</span>
              <XIcon
                className="w-5 h-5 text-slate-900 dark:text-slate-100"
                strokeWidth={2.5}
              />
            </button>
          </header>
          <section className="max-w-lg mb-6 text-sm text-slate-500 dark:text-slate-400">
            {children ? children : <p>Drawer body undefined</p>}
          </section>
          <footer></footer>
        </section>
      </Portal>
    </>
  );
};

//Path: src/components/blocks/nav/nav-drawer-bottom-component.tsx
