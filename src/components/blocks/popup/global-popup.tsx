import React from 'react';
import { usePopup } from '@/stores/ui/popup';
import { UncontrolledPopper } from './popper';

export const GlobalPopup = () => {
  const { content, isOpen, close: closePopup } = usePopup();

  if (!isOpen || !content) return null;

  return (
    <UncontrolledPopper initOpen={isOpen}>
      {React.cloneElement(content, { onClose: closePopup })}
    </UncontrolledPopper>
  );
};

// Path: src/components/blocks/popup/global-popup.tsx
