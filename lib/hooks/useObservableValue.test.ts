import { renderHook, act } from '@testing-library/react-hooks';
import { useObservableValue } from './useObservableValue';

describe('useObservableValue', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useObservableValue((received, failed) => () => {}, []));

    expect(result.current.state === 'waiting').toBeTruthy();
  });
});
