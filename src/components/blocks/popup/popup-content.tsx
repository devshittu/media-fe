'use client';
import React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
} from '@floating-ui/react';
import { usePopupContext } from './hooks/usePopupContext';
export const PopupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ style, ...props }, propRef) => {
  const { context: floatingContext, modal, ...context } = usePopupContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  const renderContent = (
    <FloatingFocusManager context={floatingContext} modal={modal}>
      <div
        ref={ref}
        style={!modal ? { ...context.floatingStyles, ...style } : {}} //TODO: !Fix here based on modal
        aria-labelledby={context.labelId}
        aria-describedby={context.descriptionId}
        {...context.getFloatingProps(props)}
      >
        {props.children}
      </div>
    </FloatingFocusManager>
  );

  return (
    <FloatingPortal>
      {modal ? (
        <div style={{ zIndex: 99, position: 'absolute' }}>
          <FloatingOverlay lockScroll>{renderContent}</FloatingOverlay>
        </div>
      ) : (
        renderContent
      )}
    </FloatingPortal>
  );
});
PopupContent.displayName = 'PopupContent';

// Path: src/components/blocks/popup/popup-content.tsx
