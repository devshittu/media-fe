import React, { forwardRef } from 'react';

type LabelType = string | { checked: string; unchecked: string };

interface ToggleSwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'size'
  > {
  id: string;

  leftLabel?: LabelType;
  rightLabel?: LabelType;
  size?: 'small' | 'base' | 'large';
  checked?: boolean;
  onValueChange?: (value: boolean) => void;
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  (
    {
      id,
      leftLabel = '',
      rightLabel = '',
      size = 'base',
      checked,
      onValueChange,
      ...restProps
    }: ToggleSwitchProps,
    ref,
  ) => {
    const getLabel = (label: LabelType, isChecked: boolean) => {
      if (typeof label === 'string') return label;
      return isChecked ? label.checked : label.unchecked;
    };

    const labelClasses =
      `block  uppercase tracking-wide text-slate-900 text-sm font-bold dark:text-slate-300
    ${
      size === 'large'
        ? 'md:text-xl'
        : size === 'base'
        ? 'md:text-base'
        : 'sm:text-sm'
    }`
        .trim()
        .replace(/\s+/g, ' ');
    return (
      <label
        htmlFor={id}
        className="inline-flex items-center space-x-4 cursor-pointer dark:text-slate-100"
      >
        {/* {leftLabel && (<h4 className={`${labelClasses}`}>{leftLabel}</h4>)} */}
        {leftLabel && (
          <h4 className={`${labelClasses}`}>
            {getLabel(leftLabel, !!checked)}
          </h4>
        )}
        <span className="relative">
          <input
            id={id}
            type="checkbox"
            className="hidden peer"
            ref={ref}
            checked={checked}
            onChange={(e) => {
              const isChecked = e.target.checked;
              if (onValueChange) {
                onValueChange(isChecked);
              }
            }}
            {...restProps}
          />
          <div className="w-10 h-6 rounded-full shadow-inner  bg-slate-600 peer-checked:bg-cyan-600 dark:bg-slate-400 peer-checked:dark:bg-cyan-400"></div>
          <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-slate-200 dark:bg-slate-800"></div>
        </span>
        {/* {rightLabel && (<h4 className={`${labelClasses}`}>{rightLabel}</h4>)} */}
        {rightLabel && (
          <h4 className={`${labelClasses}`}>
            {getLabel(rightLabel, !!checked)}
          </h4>
        )}
      </label>
    );
  },
);

ToggleSwitch.displayName = 'Toggle Switch';

// Path: src/components/form/toggle-switch.tsx
