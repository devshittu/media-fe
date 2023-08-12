import { Icon } from '@/components/illustrations';
import React from 'react';

export type AnalogSwitchItemProps = {
  title: string;
  isSelected?: boolean;
  onClick: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  ariaLabel: string;
};

export const AnalogSwitchItem = ({
  title,
  isSelected = false,
  onClick,
  icon,
  disabled,
  ariaLabel,
}: AnalogSwitchItemProps) => {
  return (
    <button
      title={title}
      type="button"
      className={`px-3 py-1.5 text-xs font-medium ${
        isSelected
          ? ' text-white bg-slate-900 dark:bg-slate-300 dark:text-slate-900'
          : 'text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700'
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <Icon icon={icon} className="w-4" strokeWidth={2.5} />
    </button>
  );
};
