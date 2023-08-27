import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children?: ReactNode;
  wrapperId?: string;
}

const Portal = ({
  children,
  wrapperId = 'app-portal-wrapper',
}: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  const createWrapperAndAppendToBody = (wrapperId: string) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  };
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.

  return wrapperElement !== null
    ? createPortal(children, wrapperElement)
    : null;
};

export default Portal;

// Path: HOC/portal.ts
