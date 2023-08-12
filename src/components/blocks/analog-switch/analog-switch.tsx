import { Icon } from '@/components/illustrations';
import React from 'react';

export type AnalogSwitchProps = {
  children: React.ReactNode;
  className?: string;
};

export const AnalogSwitch = ({ children, className }: AnalogSwitchProps) => {
  return (
    <div
      className={`grid max-w-full grid-cols-3 gap-1 p-1 mx-auto my-2 bg-slate-100 dark:bg-slate-950 ${className}`}
      role="group"
    >
      {children}
    </div>
  );
};
