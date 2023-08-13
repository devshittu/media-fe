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

type ThemeSwitchProps = {
  showLabel?: boolean;
  className?: string;
};
const ThemeSwitch = ({ className, showLabel = false }: ThemeSwitchProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, forcedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === systemTheme ? systemTheme : theme;
  const disabled = !!forcedTheme;

  return (
    <AnalogSwitch className={className}>
      <AnalogSwitchItem
        title="Light"
        isSelected={currentTheme === THEME_LIGHT}
        onClick={() => setTheme(THEME_LIGHT)}
        icon={<SunIcon />}
        disabled={disabled}
        ariaLabel="Light Theme"
      />
      <AnalogSwitchItem
        title="System"
        isSelected={currentTheme === THEME_SYSTEM}
        onClick={() => setTheme(THEME_SYSTEM)}
        icon={<MonitorIcon />}
        disabled={disabled}
        ariaLabel="System Theme"
      />
      <AnalogSwitchItem
        title="Dark"
        isSelected={currentTheme === THEME_DARK}
        onClick={() => setTheme(THEME_DARK)}
        icon={<MoonIcon />}
        disabled={disabled}
        ariaLabel="Dark Theme"
      />
    </AnalogSwitch>
  );
};
export default ThemeSwitch;
