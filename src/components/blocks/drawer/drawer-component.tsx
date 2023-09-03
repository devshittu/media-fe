import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { DrawerProps, DrawerSide } from './index';
import { Icon, XIcon } from '@/components/illustrations';
import { useKeyPress } from '@/hooks';
import Portal from '@/hoc/Portal';
import Overlay from '../overlay/overlay';
import { NavContext } from '../nav';

export const DrawerComponent = ({
  id,
  isActive = false,
  title,
  side,
  titleIcon,
  showAppLogo = false,
  children,
  onClose,
  showOverlay = true,
  lockScroll = false,
}: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  const { setIsNavOpen, setLockScroll } = useContext(NavContext);

  const escapePressed = useKeyPress('Escape');

  const sideClasses = () => {
    let classes = '';
    switch (side) {
      case DrawerSide.LEFT:
        classes += `fixed top-0 left-0 z-30 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-slate-800 ${
          isOpen ? 'transform-none' : '-translate-x-full '
        }`;
        break;
      case DrawerSide.RIGHT:
        classes += `fixed top-0 right-0 z-[1001] h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-slate-800 ${
          isOpen ? 'transform-none' : '-translate-x-full '
        }`;
        break;
      case DrawerSide.TOP:
        classes += `fixed top-0 left-0 right-0 z-[1001] w-full p-4 transition-transform -translate-y-full bg-white dark:bg-slate-800 ${
          isOpen ? 'transform-none' : '-translate-y-full '
        }`;
        break;
      case DrawerSide.BOTTOM:
      default:
        classes += `fixed bottom-0 left-0 right-0 z-30 w-full p-4 overflow-y-auto transition-transform duration-300 transform-gpu bg-white dark:bg-slate-800 ${
          isOpen ? 'translate-y-0 ' : 'translate-y-full '
        }`;
        break;
    }
    return classes;
  };

  // useEffect(() => {
  //   if (isOpen && lockScroll) {
  //     document.documentElement.style.overflow = 'hidden';
  //   }
  //   return () => {
  //     document.documentElement.style.overflow = '';
  //   };
  // }, [isOpen, lockScroll]);

  const openDrawer = () => {
    setIsOpen(true);
    setLockScroll(lockScroll);
    setIsNavOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setLockScroll(false);
    setIsNavOpen(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isActive) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (isMounted) {
      setTimeout(() => {
        openDrawer();
      }, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  useEffect(() => {
    if (escapePressed) {
      closeDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapePressed]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Portal wrapperId="drawer-wrapper">
        {/* Overlay background */}
        {showOverlay && (
          <Overlay
            id={id}
            isActive={isOpen}
            closeOnClick
            onClick={closeDrawer}
          />
        )}
        {/* The drawer body */}

        <section
          id={`${id}-body`}
          className={sideClasses()}
          tabIndex={-1}
          aria-labelledby={`drawer-${side}-label`}
        >
          <header
            className={`transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h5
              id="drawer-bottom-label"
              className={`inline-flex items-center mb-4 ${
                showAppLogo ? 'text-xl uppercase ' : 'text-base'
              } font-semibold text-slate-800 dark:text-slate-200 `}
            >
              {titleIcon && (
                <Icon
                  icon={titleIcon as ReactElement}
                  className={` ${
                    showAppLogo ? 'w-8 h-8 mr-4' : 'w-6 h-6 mr-2'
                  }`}
                  strokeWidth={2.5}
                />
              )}
              {title ? title : ''}
            </h5>
            <button
              type="button"
              data-drawer-hide="drawer-bottom-example"
              aria-controls={`${id}-body`}
              className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
              onClick={closeDrawer}
            >
              <span className="sr-only">Close menu</span>
              <XIcon
                className="w-5 h-5 text-slate-900 dark:text-slate-100"
                strokeWidth={2.5}
              />
            </button>
          </header>
          <section className="max-w-lgx mb-6 text-smx text-slate-500 dark:text-slate-400">
            {children ? children : <p>Drawer body undefined</p>}
          </section>
          <footer></footer>
        </section>
      </Portal>
    </>
  );
};

//Path: src/components/blocks/drawer/drawer-component.tsx
