import { useCallback, useRef, DependencyList } from 'react';

interface HandlerRef<T> {
  handler: (arg: T) => void | Promise<void>;
}

export function useHandler<T>(
  handler: (arg: T) => void | Promise<void>,
  deps: DependencyList
): (arg: T) => void | Promise<void> {
  const ref = useRef<HandlerRef<T>>({
    handler,
  });

  ref.current.handler = handler;

  const callback = useCallback((arg) => {
    const h = ref.current.handler;

    return h(arg);
  }, deps);

  return callback;
}
