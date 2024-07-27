import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAsyncValue } from './useAsyncValue';

const FAILURE = 'FAILURE';
const LOADING = 'LOADING';
const DONE = 'DONE';

function delay(timeout: number): Promise<void> {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, timeout);
  });
}

function createWrapper<T>(source: () => Promise<T>): React.FunctionComponent<{}> {
  return () => {
    const status = useAsyncValue<T>(source, []);

    if (status.state === 'failure') {
      return <div>{FAILURE}</div>;
    }

    if (status.state === 'loading') {
      return <div>{LOADING}</div>;
    }

    return <div>{status.value}</div>;
  };
}

afterEach(cleanup);

describe('useAsyncValue', () => {
  test('immediately', async () => {
    const RESULT = 'RESULT';
    const { result } = renderHook(() => useAsyncValue<string>(() => Promise.resolve(RESULT), []));

    await act(async () => {
      await delay(100);
    });

    expect(result.current.state === 'success' && result.current.value === RESULT).toBeTruthy();
  });
});
