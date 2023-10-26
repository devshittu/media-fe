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
import { Button } from '@/components/button';
import { usePopupContext } from '@/components/blocks/popup';
import { AlertTriangleIcon, Icon } from '@/components/illustrations';

export const PromptPopup = ({
  title,
  subtitle,
  children,
  onOk,
  onClose,
}: PopupProps & {
  children?: React.ReactElement;
  title?: string | null;
  subtitle?: string | null;
  onOk: () => void;
}) => {
  const { setOpen } = usePopupContext();

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    return setOpen(false); //close the popup from the usePopupContext which is the floating-ui/react library.
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    return setOpen(false); //close the popup from the usePopupContext which is the floating-ui/react library.
  };

  // Ensure that children is a single React element
    if (React.Children.count(children) !== 1) {
      throw new Error(
        'PromptPopup expects a single child component make sure that children is not conditional which may make it undefined such as {someCondition && <SomeComponent/>.}',
      );
    }

  return (
    <Dialog>
      <DialogOverlay />
      <DialogContainer width="medium">
        <DialogHeader>
          <>
            <div className="flex justify-between items-start">
              <nav className="flex items-center space-x-2 md:space-x-4">
                <Icon
                  icon={<AlertTriangleIcon />}
                  className="stroke-[2.5] w-10 h-10 text-amber-500"
                />
              </nav>
              <DialogCloseButton onClose={handleClose} />
            </div>
          </>
        </DialogHeader>
        <DialogBody>
          {children ? (
            React.cloneElement(children || <></>, { onCancel: handleClose })
          ) : (
            <div className="flex justify-between items-start">
              <nav className="flex flex-col items-start space-y-2 md:space-y-4">
                <h1 className="sm:text-2xl text-xl tracking-normal md:tracking-wide leading-6 md:leading-8 font-extrabold m-0 text-slate-900 dark:text-slate-100">
                  {title || `Are you sure?`}
                </h1>
                <p className=" text-base md:text-lg leading-5 m-0 mt-1 whitespace-pre-wrap text-slate-900">
                  {subtitle || 'Please double-check before moving on.'}
                </p>
              </nav>
            </div>
          )}
          <>
            <br />

            <div className="flex space-x-3">
              <Button
                type="primary"
                //   loading={!!isLoading}
                //   disabled={isLoading}
                nativeType="submit"
                // className="justify-center font-semibold mt-4 w-full md:h-12"
                onClick={handleOk}
              >
                <span className="opacity-100 transition-opacity font-extrabold text-xl">
                  Proceed
                </span>
              </Button>
              &nbsp;&nbsp;
              <Button
                nativeType="submit"
                outlined
                type={`adaptive`}
                onClick={handleClose}
              >
                <span className="opacity-100 transition-opacity font-extrabold text-xl">
                  Cancel
                </span>
              </Button>
            </div>
          </>
        </DialogBody>
      </DialogContainer>
    </Dialog>
  );
};

// Path: src/components/blocks/popup/blocks/prompt-popup.tsx