/* eslint-disable import/no-extraneous-dependencies */
import { renderHook } from '@testing-library/react';

import { useObservableValue } from './useObservableValue';

describe('useObservableValue', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useObservableValue((received, failed) => () => {}, []));

    expect(result.current.state === 'waiting').toBeTruthy();
  });
});
