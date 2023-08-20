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
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, forcedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === systemTheme ? systemTheme : theme;
  const disabled = !!forcedTheme;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (onChange) {
      onChange(newTheme); // Notify react-hook-form of the change
    }
  };
  return (
    <>
      <AnalogSwitch className={className}>
        <AnalogSwitchItem
          title="Light"
          isSelected={currentTheme === THEME_LIGHT}
          // onClick={() => setTheme(THEME_LIGHT)}
          onClick={() => handleThemeChange(THEME_LIGHT)}
          icon={<SunIcon />}
          disabled={disabled}
          ariaLabel="Light Theme"
        />
        <AnalogSwitchItem
          title="System"
          isSelected={currentTheme === THEME_SYSTEM}
          // onClick={() => setTheme(THEME_SYSTEM)}
          onClick={() => handleThemeChange(THEME_SYSTEM)}
          icon={<MonitorIcon />}
          disabled={disabled}
          ariaLabel="System Theme"
        />
        <AnalogSwitchItem
          title="Dark"
          isSelected={currentTheme === THEME_DARK}
          // onClick={() => setTheme(THEME_DARK)}
          onClick={() => handleThemeChange(THEME_DARK)}
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
