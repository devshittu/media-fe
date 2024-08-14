'use client';
import React from 'react';

type DialogOverlayProps = React.HTMLProps<HTMLDivElement> & {};

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogOverlayProps
>((props, ref) => (
  <div
    className="fixed top-0 right-0 bottom-0 left-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80  pointer-events-auto z-[-1]"
    data-app-dialog-backdrop="true"
    ref={ref}
    {...props}
  ></div>
));
DialogOverlay.displayName = 'Dialog Overlay';
