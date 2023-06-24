import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { THEME_DARK, THEME_LIGHT } from '@/config/constants';
import Head from 'next/head';
import { MoonIcon, SunIcon } from '@/components/illustrations';
type ThemeSwitchProps = {
  showLabel?: boolean;
};

const ThemeSwitch = ({ showLabel = false }: ThemeSwitchProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, forcedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === systemTheme ? systemTheme : theme;
  const disabled = !!forcedTheme;

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={theme === THEME_DARK ? '#0f172a' : '#FAFBFC'}
        />
      </Head>
      <button
        onClick={() =>
          theme === THEME_DARK ? setTheme(THEME_LIGHT) : setTheme(THEME_DARK)
        }
        aria-label="Theme"
        className={`p-3 sm:px-6x inline-flex items-center justify-center ${
          disabled ? 'hidden' : ''
        }`}
        disabled={disabled}
      >
        <span
          className={`${
            showLabel ? 'md:mr-2' : ''
          } inline-block  animate-swirl-in-fwd`}
        >
          {currentTheme === THEME_DARK ? (
            <MoonIcon className="w-6" strokeWidth={3} />
          ) : (
            <SunIcon className="w-6" strokeWidth={3} />
          )}
        </span>
        {showLabel && (
          <span className="capitalize italic text-slate-600 dark:text-slate-100 hidden md:block">
            {currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK}
          </span>
        )}
      </button>
    </>
  );
};

export default ThemeSwitch;
