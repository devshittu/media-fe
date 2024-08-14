'use client';
import * as React from 'react';
import { useId } from '@floating-ui/react';
import { Dialog } from '../dialog';
import { usePopupContext } from './hooks/usePopupContext';

export const PopupHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>((props, ref) => {
  const { setLabelId } = usePopupContext();
  const id = useId();

  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h2 {...props} ref={ref} id={id}>
      {props.children}
    </h2>
  );
});
PopupHeading.displayName = 'PopupHeading';

export const PopupDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLProps<HTMLParagraphElement>
>((props, ref) => {
  const { setDescriptionId } = usePopupContext();
  const id = useId();

  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <p {...props} ref={ref} id={id}>
      {props.children}
    </p>
  );
});
PopupDescription.displayName = 'Popup Description';

export const PopupClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { setOpen } = usePopupContext();
  return (
    <button type="button" {...props} ref={ref} onClick={() => setOpen(false)} />
  );
});
PopupClose.displayName = 'PopupClose';

//Path: src/components/blocks/popup/popup.tsx
