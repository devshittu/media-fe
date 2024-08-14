'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  Strategy,
  Placement,
  ReferenceType,
  FloatingOverlay,
  arrow,
  FloatingArrow,
} from '@floating-ui/react';
import Portal from '@/hoc/Portal';
import Overlay from '../overlay/overlay';

export enum TourPopperType {
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

type TourPopperProps = {
  portaled?: boolean;
  strategy?: Strategy;
  placement?: Placement;
  children: React.ReactNode;
  refElement?: string | null;
  isOpen?: boolean;
  type?: TourPopperType;
  onClose?: () => void;
};

export function TourPopper({
  children,
  isOpen = false,
  portaled,
  onClose,
  refElement,
  type = TourPopperType.WARNING,
  strategy = 'absolute',
  placement = 'bottom',
}: TourPopperProps) {
  const [open, setOpen] = useState(isOpen);
  const referenceRef = useRef<HTMLElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null); //useRef<HTMLElement | SVGSVGElement | null>(null);

  const getTourTypeClasses = (): { classes: string; arrowClasses: string } => {
    let classes = ``;
    let arrowClasses = ``;
    switch (type) {
      case TourPopperType.WARNING:
        classes += `bg-amber-300`;
        arrowClasses += `fill-amber-300`;
        break;
      case TourPopperType.INFO:
        classes += `bg-sky-300`;
        arrowClasses += `fill-sky-300`;
        break;
      case TourPopperType.ERROR:
        classes += `bg-rose-300`;
        arrowClasses += `fill-rose-300`;
        break;
      case TourPopperType.SUCCESS:
        classes += `bg-emerald-300`;
        arrowClasses += `fill-emerald-300`;
        break;
    }

    return { classes, arrowClasses };
  };
  const { classes, arrowClasses } = getTourTypeClasses();
  useEffect(() => {
    const referenceElement = document.querySelector(
      refElement || '',
    ) as HTMLElement;
    referenceRef.current = referenceElement;
  }, [refElement]);

  const { x, y, refs, context } = useFloating({
    open,
    // onOpenChange: setOpen,
    onOpenChange(isOpen, event) {
      setOpen(isOpen);
      if (!isOpen) {
        if (onClose) onClose();
      }
    },
    elements: {
      reference: referenceRef.current as ReferenceType,
    },
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
      arrow({ element: referenceRef.current }),
    ],
    whileElementsMounted: autoUpdate,
    strategy,
    placement,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);
  const headingId = useId();
  const popoverWrapperJsx = (
    <>
      {open && (
        <>
          {/* TODO: <Overlay isActive={isOpen} id='som'/> */}
          <FloatingOverlay lockScroll style={{ zIndex: 99 }}>
            <FloatingFocusManager context={context} modal={false}>
              <div
                className={`grid place-items-center ${
                  classes ? classes : 'bg-slate-100 text-slate-50'
                } `}
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  // transform: `translate3d(${Math.round(x || 0)}px, ${Math.round(
                  //   y || 0
                  // )}px, 0)`,
                }}
                aria-labelledby={headingId}
                {...getFloatingProps()}
              >
                {children ?? 'Floating'}
                {/* TODO: reflect same color on all from the sequence. */}
                <FloatingArrow
                  width={20}
                  className={`${
                    arrowClasses ? arrowClasses : 'fill-black-300'
                  } ml-4`}
                  context={context}
                  ref={arrowRef}
                />
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </>
      )}
    </>
  );

  return (
    <>
      {portaled && typeof document !== 'undefined' ? (
        <Portal wrapperId="floating-root">{popoverWrapperJsx}</Portal>
      ) : (
        popoverWrapperJsx
      )}
    </>
  );
}

export default TourPopper;

//Path: src/components/blocks/tour/tour-popper.tsx
