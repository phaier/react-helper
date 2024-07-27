import { useEffect } from 'react';

export function useGlobalKeypress(callback: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const from = <HTMLElement>e.target;

      if (from.tagName === 'INPUT' || from.tagName === 'TEXTAREA') {
        return;
      }

      callback(e);
    };

    window.addEventListener('keypress', handler);

    return () => {
      window.removeEventListener('keypress', handler);
    };
  }, []);
}
