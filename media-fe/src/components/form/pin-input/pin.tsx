import { useState, useEffect } from 'react';

type PinProps = {
  focused?: boolean;
  value: string | undefined;
};

export const Pin = ({ focused, value }: PinProps) => {
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      const timeout = setTimeout(() => {
        setHidden(true);
      }, 300);

      return () => {
        setHidden(false);
        clearTimeout(timeout);
      };
    }
  }, [value]);
  const apd = ` h-16 w-12 md:h-20 md:w-14  pointer-events-auto items-center bg-slate-500/10 border-slate-600 dark:border-slate-400 border-2 md:border-4 shadow-md inline-flex text-[3em] h-20 justify-center relative transition-all duration-250`;
  const apdBefore = `before:absolute before:bg-slate-800 before:dark:bg-slate-200 before:h-[3px] before:w-[70%] before:bottom-0 before:left-[15%] before:opacity-0 before:transform-[translateY(0px)] before:shadow-md before:z-2 transition-opacity duration-250 transition-transform`;
  const apdAfter = `after:bg-slate-800 after:dark:bg-slate-200 after:rounded-full after:h-5 after:w-5 after:opacity-0 after:scale-25 after:shadow-md after:absolute after:transition-all after:duration-250 after:z-2`;
  const apdBeforeAfter = `${apdBefore}      ${apdAfter}`;
  const apdFocusedBefore = `before:animate-blink before:duration-2000 before:ease-in-out before:infinite before:opacity-100 before:transform before:-translate-y-2.5 `;
  const apdFocusedAfter = `after:transform-[scale(0.25)]`;
  const apdFocused = `${apdFocusedBefore} ${apdFocusedAfter}`;
  const apdHiddenBefore = ` before:absolute before:transition-all before:duration-250 before:z-2`;
  const apdHiddenAfter = `after:opacity-100 after:transform-[scale(1)]`;
  const apdHidden = `${apdHiddenBefore} ${apdHiddenAfter}`;
  const appDigitPinClasses = `${apd} ${apdBeforeAfter} ${
    focused ? apdFocused : ''
  }  ${hidden ? `${apdHidden}  group is-hidden ` : ''}`;
  return (
    <div className={`${appDigitPinClasses}`}>
      <span className="app-pin-digit-value text-5xl m-0 p-0 transition-all duration-250 group-[.is-hidden]:opacity-0">
        {value || ''}
      </span>
    </div>
  );
};

// Path: src/components/form/pin-input/pin.tsx
