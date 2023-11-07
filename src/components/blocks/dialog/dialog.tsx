import React from 'react';
import { usePopupContext } from '../popup';
import { useId } from '@floating-ui/react';

type DialogProps = {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  rounded?: boolean;
  children?: React.ReactNode;
};

export const Dialog: React.FC<DialogProps> = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { setLabelId } = usePopupContext();
  const id = useId();

  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <div
      {...props}
      className=" z-50 flex flex-col items-center content-center pt-[15px] px-[15px] h-[calc(100%-15px)] md:p-4 lg:pt-[10vh]"
      data-app-dialog-overlay="true"
      ref={ref}
      id={id}
    >
      {props.children}
    </div>
  );
});
Dialog.displayName = 'Dialog';
