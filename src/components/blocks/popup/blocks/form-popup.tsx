import React from 'react';
import { PopupProps } from '@/stores/ui';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContainer,
  DialogHeader,
  DialogOverlay,
} from '@/components/blocks/dialog';

import { usePopupContext } from '@/components/blocks/popup';

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
  const { setOpen } = usePopupContext();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    return setOpen(false); //close the popup from the usePopupContext which is the floating-ui/react library.
  };
  // Ensure that children is a single React element
  if (React.Children.count(children) !== 1) {
    throw new Error(
      'FormPopup expects a single child component make sure that children is not conditional which may make it undefined such as {someCondition && <SomeComponent/>.}',
    );
  }

  return (
    <Dialog>
      <DialogOverlay />
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
    </Dialog>
  );
};

// Psth: src/components/blocks/popup/blocks/form-popup.tsx