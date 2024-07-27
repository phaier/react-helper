import { useState, useEffect } from 'react';

export function useIsModifying(modified: Date | undefined, timeout: number): boolean {
  const m = modified && modified.getTime();

  const [isFresh, setIsFresh] = useState<boolean>(() => {
    if (m) {
      const now = new Date().getTime();
      return now < m + timeout;
    }

    return false;
  });

  useEffect(() => {
    if (!m) {
      if (isFresh) {
        setIsFresh(false);
      }

      return;
    }

    const now = new Date().getTime();
    const delay = m + timeout - now;
    let timer: number;

    if (delay > 0) {
      if (!isFresh) {
        setIsFresh(true);
      }

      timer = window.setTimeout(() => {
        setIsFresh(false);
      }, delay);
    } else if (isFresh) {
      setIsFresh(false);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [m, timeout]);

  return isFresh;
}
