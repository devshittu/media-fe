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

  return (
    <div
      className={`app-pin-digit focused items-center h-16 w-12 md:h-20 md:w-14 inline-flex relative border-white/50x border-slate-600 dark:border-slate-400 border-2 md:border-4 justify-center after:content-[''] after:shadow-md after:z-20 after:absolute before:content-[''] before:shadow-md before:z-20 before:absolute ${
        focused ? 'focused' : ''
      } ${hidden ? 'hidden' : ''}`}
    >
      <span className="app-pin-digit-value text-5xl m-0 p-0">
        {value || ''}
      </span>
    </div>
  );
};

// Path: src/components/form/pin-input/pin.tsx
