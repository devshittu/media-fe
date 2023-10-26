import { Placement } from '@floating-ui/react';

export type PopupOptions = {
  initialOpen?: boolean;
  onHoverEnabled?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

// Path: src/components/blocks/popup/types.ts
