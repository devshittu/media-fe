// src/utils/localStorage.ts

import { IS_BROWSER } from '@/config/constants';

export const setItem = (key: string, value: any) => {
  if (IS_BROWSER) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const getItem = <T>(key: string): T | null => {
  console.log(`authdebug: the key to getItem: ${key}`);
  if (IS_BROWSER) {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error(
          `Error parsing JSON from localStorage for key ${key}:`,
          error,
        );
        return null; // or you might want to return a default value
      }
    }
  }
  return null;
};

export const removeItem = (key: string) => {
  if (IS_BROWSER) {
    localStorage.removeItem(key);
  }
};
