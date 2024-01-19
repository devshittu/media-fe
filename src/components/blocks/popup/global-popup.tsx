import React from 'react';
import { usePopupStore } from '@/stores/ui/popup';
import { UncontrolledPopper } from './popper';

export const GlobalPopup = () => {
  const { content, isOpen, close: closePopup } = usePopupStore();

  if (!isOpen || !content) return null;

  return (
    <UncontrolledPopper initOpen={isOpen}>
      {React.cloneElement(content, { onClose: closePopup, isOpen })}
    </UncontrolledPopper>
  );
};

// Path: src/components/blocks/popup/global-popup.tsx
