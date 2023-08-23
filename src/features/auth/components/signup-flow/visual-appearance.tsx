import { useStepValidation } from '@/components/blocks/wizard/hooks';
import { StepProps } from '@/components/blocks/wizard/types';
import { ThemeSelection } from '@/components/form/theme-selection';
import { Icon, MonitorIcon, MoonIcon, SunIcon } from '@/components/illustrations';
import React, { useEffect } from 'react';

export const VisualAppearance = ({ onValidationStatusChange }: StepProps) => {
  const validate = () => true;

  // const isValid = useStepValidation(validate, [], onValidationStatusChange);

const themeOptions = [
  {
    id: 'light',
    label: 'Light',
    description: 'A bright and clear theme for daytime use.',
    svg: <SunIcon className="text-amber-500 dark:text-amber-300 mb-2 w-7 h-7"/>,
  },
  {
    id: 'system',
    label: 'System',
    description: 'Automatically adapts to your system settings.',
    svg: <MonitorIcon className='text-slate-800 dark:text-slate-200  mb-2 w-7 h-7' />,
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'A dark theme to reduce eye strain in low light.',
    svg: <MoonIcon className='text-sky-500  mb-2 w-7 h-7'/>,
  },
];

  return (
    <div>
      <ThemeSelection options={themeOptions} />
    </div>
  );
};

//Path: src/features/auth/components/signup-flow/visual-appearance.tsx
