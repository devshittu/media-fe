import { useEffect, useState } from 'react';
import { Popup, PopupContent, PopupTrigger } from './';

export const ControlledPopper = ({ children }: PopperProps) => {
  return (
    <Popup>
      <PopupTrigger>
        {/* <Button type={'primary'}> */}
        My trigger
      </PopupTrigger>
      {/* <PopupTrigger>My trigger</PopupTrigger> */}
      <PopupContent className="Popup">
        {/* <DialogFlow steps={steps} onFinish={handleFinish} /> */}
        {children}
      </PopupContent>
    </Popup>
  );
};

type PopperProps = {
  children: React.ReactNode;
};
type PopperControlledProps = PopperProps & {
  initOpen?: boolean;
};
export const UncontrolledPopper = ({
  initOpen = false,
  children,
}: PopperControlledProps) => {
  const [open, setOpen] = useState(initOpen);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Popup open={open} onOpenChange={setOpen}>
      <PopupContent className="Popup">{children}</PopupContent>
    </Popup>
  );
};
