// src/utils/localStorage.ts

export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | null => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
