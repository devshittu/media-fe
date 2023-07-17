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
} from '@floating-ui/react';
import Portal from '@/hoc/Portal';
import Overlay from '../overlay/overlay';

type TourPopperProps = {
  portaled?: boolean;
  strategy?: Strategy;
  placement?: Placement;
  children: React.ReactNode;
  refElement?: string | null;
  isOpen?: boolean;
};

export function TourPopper({
  children,
  isOpen = false,
  portaled,
  refElement,
  strategy = 'absolute',
  placement = 'bottom',
}: TourPopperProps) {
  const [open, setOpen] = useState(isOpen);
  const referenceRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (isOpen) {
      const element = document.querySelector(refElement || '') as HTMLElement;
      if (element) {
        element.style.zIndex = '9999999'; // Set a high zIndex value when the element is open
      }
    }
  }, [isOpen, refElement]);
  useEffect(() => {
    const referenceElement = document.querySelector(
      refElement || '',
    ) as HTMLElement;
    referenceRef.current = referenceElement;
  }, [refElement]);

  const { x, y, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
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
                className="grid place-items-center bg-gray-1000 text-gray-50"
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