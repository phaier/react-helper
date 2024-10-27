import { useCallback, useRef, DependencyList } from 'react';

interface HandlerRef<T> {
  handler: (arg: T) => void | Promise<void>;
}

/**
 * @deprecated この Hook は DependencyList に対する誤解によって作成されています。useCallback ではなく、この Hook が必要になった場合は、設計に重大な問題がある可能性があります。
 */
export function useHandler<T>(
  handler: (arg: T) => void | Promise<void>,
  deps: DependencyList
): (arg: T) => void | Promise<void> {
  const ref = useRef<HandlerRef<T>>({
    handler,
  });

  ref.current.handler = handler;

  const callback = useCallback((arg: T) => {
    const h = ref.current.handler;

    return h(arg);
  }, deps);

  return callback;
}
