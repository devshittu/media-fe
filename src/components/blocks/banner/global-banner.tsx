import React from 'react';
import { useBanner } from '@/stores/ui/banner';

export const GlobalBanner = () => {
  const { isOpen: open, content, close } = useBanner();

  const handleDismiss = () => {
    close();
  };

  // Ensure that `content` is a valid React element before cloning
  if (!open || !React.isValidElement(content)) return null;

  return React.cloneElement(content, { onClose: handleDismiss });
};

// Path: src/components/blocks/banner/global-banner.tsx
