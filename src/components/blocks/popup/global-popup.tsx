import React from 'react';
import { usePopup } from '@/stores/popup/popup';
import { UncontrolledPopper } from './popper';

export const GlobalPopup = () => {
  const { content, isOpen, closePopup } = usePopup();

  if (!isOpen || !content) return null;

  return (
    <UncontrolledPopper initOpen={isOpen}>
      {React.cloneElement(content, { onClose: closePopup })}
    </UncontrolledPopper>
  );
};
