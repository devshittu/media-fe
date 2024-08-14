'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Theme } from '../types';

type UseThemeChangerProps = {
  onChange?: (value: Theme) => void;
  onServerSync?: (value: Theme) => Promise<void>;
};

export const useThemeChanger = ({
  onChange,
  onServerSync,
}: UseThemeChangerProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, forcedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = async (newTheme: Theme) => {
    if (onServerSync) {
      await onServerSync(newTheme); // Call the server sync function if provided
    }
    setTheme(newTheme);
    if (onChange) {
      onChange(newTheme);
    }
  };

  const currentTheme = theme === systemTheme ? systemTheme : theme;
  const disabled = !!forcedTheme;

  return { currentTheme, handleThemeChange, mounted, disabled };
};
