import { useRef, useEffect, useCallback } from 'react';

/**
 * Throttle a function so it can be called at most once in every `limit` milliseconds.
 *
 * @param func - The function to throttle.
 * @param limit - The minimum delay between function calls.
 * @returns A throttled version of `func`.
 */
function useThrottle<F extends (...args: any[]) => void>(
  func: F,
  limit: number,
): F {
  const lastRan = useRef<Date | null>(null);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<F>) => {
      if (!lastRan.current) {
        func(...args);
        lastRan.current = new Date();
      } else {
        const now = new Date();
        const nextAt = new Date(lastRan.current.getTime() + limit);
        const delay = nextAt.getTime() - now.getTime();

        if (!pending.current) {
          pending.current = setTimeout(() => {
            func(...args);
            lastRan.current = new Date();
            pending.current = null;
          }, delay);
        }
      }
    },
    [func, limit],
  ) as F;
}

export default useThrottle;
