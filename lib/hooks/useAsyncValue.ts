import { useState, useEffect } from 'react';

export type AsyncValue<T> = AsyncValue.LoadingValue | AsyncValue.SuccessValue<T> | AsyncValue.FailureValue;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace AsyncValue {
  export interface LoadingValue {
    state: 'loading';
  }

  export interface SuccessValue<T> {
    state: 'success';
    value: T;
  }

  export interface FailureValue {
    state: 'failure';
    error: Error;
  }

  export function isLoading(...values: AsyncValue<unknown>[]): boolean {
    return values.some((value) => value.state === 'loading');
  }

  export function isFailure(...values: AsyncValue<unknown>[]): boolean {
    return values.some((value) => value.state === 'failure');
  }

  export function toErrors(...values: AsyncValue<unknown>[]): Error[] {
    return values.filter((value) => value.state === 'failure').map((value) => (<FailureValue>value).error);
  }
}

export function useAsyncValue<T>(p: () => Promise<T>, deps: React.DependencyList): AsyncValue<T> {
  const [value, setValue] = useState<AsyncValue<T>>({
    state: 'loading',
  });

  useEffect(() => {
    let alive = true;

    if (value.state !== 'loading') {
      setValue({
        state: 'loading',
      });
    }

    (async () => {
      try {
        const result = await p();

        if (alive) {
          setValue({
            state: 'success',
            value: result,
          });
        }
      } catch (e) {
        if (alive) {
          setValue({
            state: 'failure',
            error: <Error>e,
          });
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, deps);

  return value;
}
