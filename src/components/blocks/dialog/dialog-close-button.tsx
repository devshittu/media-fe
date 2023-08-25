import { Icon, XIcon } from '@/components/illustrations';
import React from 'react';

type DialogCloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClose?: () => void;
};

export const DialogCloseButton = React.forwardRef<
  HTMLButtonElement,
  DialogCloseButtonProps
>(({ onClose, ...props }, ref) => (
  <button
    onClick={onClose}
    className="p-0 bg-transparent opacity-40 hover:opacity-70"
    ref={ref}
    {...props}
  >
    <Icon icon={<XIcon />} className="w-6" />
  </button>
));

DialogCloseButton.displayName = 'Close Button';

//Path: src/components/blocks/dialog/dialog-close-button.tsx
