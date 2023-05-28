import { useEffect, useState } from 'react';

const useOnline = (): boolean => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = (): void => setOnline(true);
    const handleOffline = (): void => setOnline(false);

    if (window.addEventListener) {
      window.addEventListener('online', handleOnline, false);
      window.addEventListener('offline', handleOffline, false);
    } else {
      (document.body as HTMLBodyElement).ononline = handleOnline;
      (document.body as HTMLBodyElement).onoffline = handleOffline;
    }

    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('online', handleOnline, false);
        window.removeEventListener('offline', handleOffline, false);
      } else {
        (document.body as HTMLBodyElement).ononline = null;
        (document.body as HTMLBodyElement).onoffline = null;
      }
    };
  }, []);

  return online;
};

export default useOnline;
