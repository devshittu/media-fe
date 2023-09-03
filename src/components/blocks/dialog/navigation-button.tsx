import React from 'react';
import { Icon } from '@/components/illustrations';
import { NavigationButtonProps } from './types';

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  disabled = false,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center w-8 h-8 text-cyan-500 bg-cyan-100 first:rounded-l-lg last:rounded-r-lg ${
      disabled
        ? 'disabled:bg-cyan-200 disabled:text-cyan-300 disabled:cursor-not-allowed'
        : ''
    } `}
    disabled={disabled}
  >
    {''}
    <Icon icon={icon} className="w-6" />
  </button>
);
