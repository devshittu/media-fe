// src/utils/localStorage.ts

import { IS_BROWSER } from '@/config/constants';

export const setItem = (key: string, value: any) => {
  if (IS_BROWSER) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = <T>(key: string): T | null => {
  if (IS_BROWSER) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  return null;
};

export const removeItem = (key: string) => {
  if (IS_BROWSER) {
    localStorage.removeItem(key);
  }
};
