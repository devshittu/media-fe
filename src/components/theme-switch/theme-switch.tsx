import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { THEME_DARK, THEME_LIGHT } from '@/config/constant';
import Head from 'next/head';
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-2 w-6 h-6"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-2 w-6 h-6"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
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
