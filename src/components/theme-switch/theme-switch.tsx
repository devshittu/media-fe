'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/config/constants';
import {
  Icon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from '@/components/illustrations';
import { AnalogSwitch, AnalogSwitchItem } from '../blocks';
import { FieldError } from 'react-hook-form';
import { useThemeChanger } from './hooks';
import { Theme } from './types';

type ThemeSwitchProps = {
  onChange?: (value: string) => void; // This is the type for onChange
  value?: string;
  error?: FieldError;
  showLabel?: boolean;
  className?: string;
};
const ThemeSwitch = ({
  onChange, // Add this
  value, // Add this
  error,
  className,
  showLabel = false,
}: ThemeSwitchProps) => {
  const { currentTheme, handleThemeChange, mounted, disabled } =
    useThemeChanger({
      onChange: (theme) => {
        // Handle the theme change here if needed
      },
      // onServerSync: serverSync, // Pass the server sync function
    });

  if (!mounted) return null;

  const handleThemeSelection = (theme: Theme) => {
    handleThemeChange(theme); // Existing theme change logic
    onChange?.(theme); // Update the form state in react-hook-form
  };

  return (
    <>
      <AnalogSwitch className={className}>
        <AnalogSwitchItem
          title="Light"
          isSelected={currentTheme === THEME_LIGHT}
          onClick={() => handleThemeSelection(Theme.LIGHT)}
          icon={<SunIcon />}
          disabled={disabled}
          ariaLabel="Light Theme"
        />
        <AnalogSwitchItem
          title="System"
          isSelected={currentTheme === THEME_SYSTEM}
          onClick={() => handleThemeSelection(Theme.SYSTEM)}
          icon={<MonitorIcon />}
          disabled={disabled}
          ariaLabel="System Theme"
        />
        <AnalogSwitchItem
          title="Dark"
          isSelected={currentTheme === THEME_DARK}
          onClick={() => handleThemeSelection(Theme.DARK)}
          icon={<MoonIcon />}
          disabled={disabled}
          ariaLabel="Dark Theme"
        />
      </AnalogSwitch>
      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </>
  );
};
export default ThemeSwitch;
