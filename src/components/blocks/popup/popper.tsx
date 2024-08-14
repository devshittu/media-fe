'use client';
import React, { useEffect, useState } from 'react';
import { Popup, PopupContent, PopupTrigger } from './';
import { Placement } from '@floating-ui/react';
import { usePopupStore } from '@/stores/ui';
type PopperProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  showOnHover?: boolean;
  placement?: Placement;
  width?: string | number;
};

export const ControlledPopper = ({
  children,
  trigger,
  showOnHover = false,
  placement = 'bottom-end',
  width = 'w-44 md:w-48', // Default width
}: PopperProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popup
      placement={placement || 'bottom-end'}
      onHoverEnabled={showOnHover}
      open={open}
      onOpenChange={setOpen}
    >
      <PopupTrigger asChild onClick={() => setOpen((v) => !v)}>
        {trigger}
      </PopupTrigger>
      <PopupContent
        className={`Popup z-20 ${width} bg-slate-50 dark:bg-slate-800`}
      >
        {children}
      </PopupContent>
    </Popup>
  );
};
type PopperUncontrolledProps = PopperProps & {
  initOpen?: boolean;
};
// export const UncontrolledPopper = ({
//   initOpen = false,
//   children,
//   width = '', // Default width
// }: // showOnHover = false,
// PopperUncontrolledProps) => {
//   const [open, setOpen] = useState(initOpen);

//   useEffect(() => {
//     // const timeout = setTimeout(() => {
//     setOpen(true);
//     // }, 2000);
//     // return () => clearTimeout(timeout);
//   }, []);
//   return (
//     <Popup open={open} onOpenChange={setOpen} modal>
//       <PopupContent className={`Popup ${width}`}>{children}</PopupContent>
//     </Popup>
//   );
// };

export const UncontrolledPopper = ({
  initOpen = false,
  children,
  width = '', // Default width
}: // showOnHover = false,
PopperUncontrolledProps) => {
  const { isOpen, close } = usePopupStore();
  return (
    <Popup open={isOpen} onOpenChange={close} modal>
      <PopupContent className={`Popup ${width}`}>{children}</PopupContent>
    </Popup>
  );
};

//Path: src/components/blocks/popup/popper.tsx
