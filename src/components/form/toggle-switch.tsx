import React, { forwardRef } from 'react';

interface ToggleSwitchProps {
  id: string;
  leftLabel?: string;
  rightLabel?: string;
  checked?: number; // This should be a number (1 or 0)
  onChange?: (value: number) => void; // Ensure this accepts a number
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  (
    {
      id,
      leftLabel = 'Left',
      rightLabel = 'Right',
      checked,
      onChange,
    }: ToggleSwitchProps,
    ref,
  ) => {
    return (
      <label
        htmlFor={id}
        className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
      >
        <span>{leftLabel}</span>
        <span className="relative">
          {/* <input id={id} type="checkbox" className="hidden peer" ref={ref} /> */}
          <input
            id={id}
            type="checkbox"
            className="hidden peer"
            ref={ref}
            checked={checked === 1}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.checked ? 1 : 0);
              }
            }}
          />
          <div className="w-10 h-6 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-cyan-400"></div>
          <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800"></div>
        </span>
        <span>{rightLabel}</span>
      </label>
    );
  },
);

ToggleSwitch.displayName = 'Toggle Switch';
