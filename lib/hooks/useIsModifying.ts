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
    let unmounted = false;
    let outed = false;

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
        if (unmounted) {
          return;
        }

        outed = true;
        setIsFresh(false);
      }, delay);
    } else if (isFresh) {
      setIsFresh(false);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      unmounted = true;

      if (!outed) {
        window.clearTimeout(timer);
      }
    };
  }, [m, timeout]);

  return isFresh;
}
