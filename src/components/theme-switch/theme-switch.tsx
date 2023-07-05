import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/config/constants';
import Head from 'next/head';
import {
  Icon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from '@/components/illustrations';
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
      {/* <button
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
      </button> */}

      <div
        className="grid max-w-full grid-cols-3 gap-1 p-1 mx-auto my-2 bg-slate-100 rounded-lgx dark:bg-slate-600"
        role="group"
      >
        <button
          title="Light"
          type="button"
          className={`px-3 py-1.5 text-xs font-medium ${
            currentTheme === THEME_LIGHT
              ? ' text-white bg-slate-900 dark:bg-slate-300 dark:text-slate-900'
              : 'text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700'
          }`}
          onClick={() => setTheme(THEME_LIGHT)}
          disabled={disabled}
          aria-label="Light Theme"
        >
          <Icon icon={<SunIcon />} className="w-4" strokeWidth={2.5} />
        </button>
        <button
          title="System"
          type="button"
          className={`px-3 py-1.5 text-xs font-medium ${
            currentTheme === THEME_SYSTEM
              ? ' text-white bg-slate-900 dark:bg-slate-300 dark:text-slate-900'
              : 'text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700'
          }`}
          onClick={() => setTheme(THEME_SYSTEM)}
          disabled={disabled}
          aria-label="System Theme"
        >
          <Icon icon={<MonitorIcon />} className="w-4" strokeWidth={2.5} />
        </button>
        <button
          title="Dark"
          type="button"
          className={`px-3 py-1.5 text-xs font-medium ${
            currentTheme === THEME_DARK
              ? ' text-white bg-slate-900 dark:bg-slate-300 dark:text-slate-900'
              : 'text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700'
          }`}
          onClick={() => setTheme(THEME_DARK)}
          disabled={disabled}
          aria-label="Dark Theme"
        >
          <Icon icon={<MoonIcon />} className="w-4" strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
};

export default ThemeSwitch;
