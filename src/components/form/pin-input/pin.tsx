import { useState, useEffect } from 'react';

type PinProps = {
  focused: boolean;
  value: string | undefined;
};

export const Pin = ({ focused, value }: PinProps) => {
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      const timeout = setTimeout(() => {
        // setHidden(true);
      }, 500);

      return () => {
        // setHidden(false);
        clearTimeout(timeout);
      };
    }
  }, [value]);

  const digitClasses = `app-pin-digit focused items-center h-20 w-14 inline-flex relative border-white/50x border-2 bg-white-600x rounded justify-center after:content-[''] after:shadow-md after:z-20 after:absolute before:content-[''] before:shadow-md before:z-20 before:absolute ${
    focused ? 'focused' : ''
  } ${hidden ? 'hidden' : ''}`;

  return (
    <div className={digitClasses}>
      <span className="app-pin-digit-value text-5xl m-0 p-0">
        {value || ''}
      </span>
    </div>
  );
};

// Path: src/components/form/pin-input/pin.tsx
