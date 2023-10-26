import React from 'react';
import { usePopup } from './usePopup';

type ContextType =
  | (ReturnType<typeof usePopup> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;

export const PopupContext = React.createContext<ContextType>(null);

export const usePopupContext = () => {
  const context = React.useContext(PopupContext);

  if (context == null) {
    throw new Error('Popup components must be wrapped in <Popup />');
  }

  return context;
};

// Path: src/components/blocks/popup/hooks/usePopupContext.ts
