import { useEffect, useState } from 'react';
import { Popup, PopupContent, PopupTrigger } from './';
type PopperProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  showOnHover?: boolean;
};

export const ControlledPopper = ({
  children,
  trigger,
  showOnHover = false,
}: PopperProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popup
      placement="bottom-end"
      onHoverEnabled={showOnHover}
      open={open}
      onOpenChange={setOpen}
    >
      <PopupTrigger asChild onClick={() => setOpen((v) => !v)}>
        {trigger}
      </PopupTrigger>
      <PopupContent className="Popup  z-20 w-44 md:w-48 bg-slate-50 dark:bg-slate-800">
        {children}
      </PopupContent>
    </Popup>
  );
};
type PopperUncontrolledProps = PopperProps & {
  initOpen?: boolean;
};
export const UncontrolledPopper = ({
  initOpen = false,
  children,
}: // showOnHover = false,
PopperUncontrolledProps) => {
  const [open, setOpen] = useState(initOpen);

  useEffect(() => {
    // const timeout = setTimeout(() => {
    setOpen(true);
    // }, 2000);
    // return () => clearTimeout(timeout);
  }, []);
  return (
    <Popup open={open} onOpenChange={setOpen} modal>
      <PopupContent className="Popup">{children}</PopupContent>
    </Popup>
  );
};

//Path: src/components/blocks/popup/popper.tsx
