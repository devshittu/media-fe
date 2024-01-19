import React, { useEffect, useState } from 'react';
import { PopupProps, usePopupStore } from '@/stores/ui';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContainer,
  DialogHeader,
  DialogOverlay,
} from '@/components/blocks/dialog';

import { usePopupContext } from '@/components/blocks/popup';
import {
  AnimateAndPresenceComponent,
  CustomMotionComponent,
} from '@/components/animations';

export const FormPopup = ({
  title,
  subtitle,
  children,
  onClose,
}: PopupProps & {
  children: React.ReactElement;
  title: string | null;
  subtitle: string | null;
}) => {
  const { setOpen, open } = usePopupContext();

  const { isOpen, isClosing, close } = usePopupStore();
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | number; // Declare the variable with the correct type

    if (isClosing) {
      // When isClosing is true, it takes precedence
      timeoutId = setTimeout(() => setShouldRender(false), 300); // Duration of exit animation
    } else {
      // In all other cases, isOpen dictates the rendering
      setShouldRender(isOpen);
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts or the dependencies change
    };
  }, [isOpen, isClosing]);

  const handleClose = () => {
    onClose?.();
    close();
    // Trigger the closing process
  };

  // Ensure that children is a single React element
  if (React.Children.count(children) !== 1) {
    throw new Error(
      'FormPopup expects a single child component make sure that children is not conditional which may make it undefined such as {someCondition && <SomeComponent/>.}',
    );
  }

  return (
    <Dialog>
      <AnimateAndPresenceComponent
        id="form-popup-overlay"
        preset="fadeInScaleUp"
        key={'form-popup-overlay'}
        isPresent={shouldRender}
      >
        <DialogOverlay />
      </AnimateAndPresenceComponent>
      <AnimateAndPresenceComponent
        id="form-popup"
        preset="fadeInScaleUp"
        key={'form-popup'}
        isPresent={shouldRender}
      >
        <DialogContainer width="medium">
          <DialogHeader>
            <>
              <div className="flex justify-between items-start">
                <nav className="flex flex-col items-start space-y-2 md:space-y-4">
                  <h1 className="text-2xl tracking-normal md:tracking-wide leading-6 md:leading-8 font-bold m-0 text-slate-900 dark:text-slate-100">
                    {title}
                  </h1>
                  <p className="font-mono text-sm md:text-base leading-5 font-bold m-0 mt-1 text-cyan-500 whitespace-pre-wrap">
                    {subtitle}
                  </p>
                </nav>
                <DialogCloseButton onClose={handleClose} />
              </div>
            </>
          </DialogHeader>
          <DialogBody>
            {/* Clone children and pass the onClose prop */}
            {React.cloneElement(children, { onCancel: handleClose })}
          </DialogBody>
        </DialogContainer>
      </AnimateAndPresenceComponent>
    </Dialog>
  );
};

// Path: src/components/blocks/popup/blocks/form-popup.tsx
