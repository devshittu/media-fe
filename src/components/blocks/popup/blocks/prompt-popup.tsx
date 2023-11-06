import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContainer,
  DialogHeader,
  DialogOverlay,
} from '@/components/blocks/dialog';
import { Button } from '@/components/button';
import { AlertTriangleIcon, Icon } from '@/components/illustrations';
import { Prompt, usePrompts } from '@/stores/ui/prompts';
import { Popup } from '../popup';
import { usePopupContext } from '../hooks';
import { ToastType } from '../../toast';
import { PopupProps } from '@/stores/ui';
import { AttentionType } from '@/types';

// export const PromptPop = () => {
//   const { prompt, dismissPrompt } = usePrompts();
  // if (!prompt) return null;
//   return (
//     <>
//     {/* <Popup> */}
//     <PromptPopup key={prompt.id} prompt={prompt} onDismiss={dismissPrompt} />
//     {/* </Popup> */}
//     </>
//   );
// };

type PromptComponentProps = PopupProps & {
  // prompt: Omit<Prompt, 'duration'>;

  type?: AttentionType;
  title?: string;
  duration?: number;
  message?: string;
  onOk: () => void;
  onOkComplete?: () => void;
  // onCancel?: () => void;
};

export const PromptPopup = ({
  // prompt,

  title,
  message,
  onOk,
  onClose,
  onOkComplete,
  type = AttentionType.WARNING,
}: PromptComponentProps) => {
  const { setOpen } = usePopupContext();

  // const { onOkComplete, onOk, onCancel } = prompt;

  const handleOk = async () => {
    try {
      await onOk?.(); // Execute the onOk function
    } finally {
      onClose?.(); // Close the prompt
      setOpen(false);
      onOkComplete?.(); // Execute the onOkComplete callback
    }
  };
  const handleClose = () => {
    onClose?.();
    setOpen(false);
    // onDismiss(prompt.id);
  };

  return (
    <Dialog>
      <DialogOverlay />
      <DialogContainer width="medium">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <Icon
              icon={<AlertTriangleIcon />}
              className="stroke-[2.5] w-10 h-10 text-amber-500"
            />
            <DialogCloseButton onClose={handleClose} />
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-start space-y-2 md:space-y-4">
            <h1 className="sm:text-2xl text-xl tracking-normal md:tracking-wide leading-6 md:leading-8 font-extrabold m-0 text-slate-900 dark:text-slate-100">
              {title || `Are you sure?`}
            </h1>
            <p className="text-base md:text-lg leading-5 m-0 mt-1 whitespace-pre-wrap text-slate-900 dark:text-slate-200">
              {message || 'Please double-check before moving on.'}
            </p>
          </div>
          <div className="flex space-x-3 mt-4">
            <Button type="primary" onClick={handleOk}>
              <span className="font-extrabold text-xl">Proceed</span>
            </Button>
            <Button outlined type="adaptive" onClick={handleClose}>
              <span className="font-extrabold text-xl">Cancel</span>
            </Button>
          </div>
        </DialogBody>
      </DialogContainer>
    </Dialog>
  );
};

// Path: src/components/blocks/popup/blocks/prompt-popup.tsx
