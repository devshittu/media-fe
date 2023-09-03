import { useEffect, useState } from 'react';

type StorageType = 'local' | 'session';

export const useBrowserStorage = (
  key: string,
  initialValue: any,
  storageType: StorageType = 'local',
) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage =
        storageType === 'local' ? window.localStorage : window.sessionStorage;
      const storedValue = storage.getItem(key);
      if (storedValue) {
        setValue(JSON.parse(storedValue));
      }
    }
  }, [key, storageType]);

  const setStoredValue = (newValue: any) => {
    setValue(newValue);

    if (typeof window !== 'undefined') {
      const storage =
        storageType === 'local' ? window.localStorage : window.sessionStorage;
      storage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue];
};
// Path: media-fe/src/hooks/useBrowserStorage.ts
