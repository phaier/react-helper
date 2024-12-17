import { useState, useEffect } from 'react';

export type ObservableValue<T> =
  | ObservableValue.WaitingValue
  | ObservableValue.ReceivedValue<T>
  | ObservableValue.FailedValue;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace ObservableValue {
  export interface WaitingValue {
    state: 'waiting';
  }

  export interface ReceivedValue<T> {
    state: 'received';
    value: T;
  }

  export interface FailedValue {
    state: 'failed';
    error: Error;
  }
}

export function useObservableValue<T>(
  p: (received: (value: T) => void, failed: (error: Error) => void) => () => void,
  deps: React.DependencyList
) {
  const [state, setState] = useState<ObservableValue<T>>({
    state: 'waiting',
  });

  useEffect(() => {
    let alive = true;

    const received = (value: T) => {
      if (alive) {
        setState({
          state: 'received',
          value,
        });
      }
    };

    const failed = (error: Error) => {
      if (alive) {
        setState({
          state: 'failed',
          error,
        });
      }
    };

    const canceler = p(received, failed);

    return () => {
      alive = false;

      canceler();
    };
  }, deps);

  return state;
}
