/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { cleanup, renderHook, act } from '@testing-library/react';

import { useAsyncValue } from './useAsyncValue';

function delay(timeout: number): Promise<void> {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, timeout);
  });
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
