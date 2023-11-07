import React from 'react';
import { usePopupContext } from './hooks/usePopupContext';
import { useMergeRefs } from '@floating-ui/react';
interface PopupTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const PopupTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & PopupTriggerProps
>((props, propRef) => {
  const { children, asChild = false, ...rest } = props;
  const context = usePopupContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...rest,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      name="context-popup-toggle"
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(rest)}
    >
      {children}
    </button>
  );
});
PopupTrigger.displayName = 'PopupTrigger';

// Path: src/components/blocks/popup/popup-trigger.tsx
