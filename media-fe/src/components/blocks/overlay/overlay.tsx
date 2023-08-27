import React from 'react';

type OverlayProps = {
  id: string;
  isActive: boolean;
  closeOnClick?: boolean;
  onClick?: () => void;
};

const Overlay = ({ id, isActive, onClick, closeOnClick }: OverlayProps) => {
  const handleClick = () => {
    if (closeOnClick && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 w-full h-screen overflow-y-hidden ${
        isActive ? 'block' : 'hidden '
      } transition-opacity duration-100 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      id={`${id}-overlay`}
      aria-labelledby={`${id}-label`}
      aria-hidden="true"
      onClick={handleClick}
      data-drawer-state={`${isActive ? 'open' : 'close'}`}
    ></div>
  );
};

export default Overlay;
