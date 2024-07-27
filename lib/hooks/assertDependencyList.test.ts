import { DependencyList } from 'react';
import { assertDependencyList } from './assertDependencyList';

describe('assertDependencyList', () => {
  test.each<[DependencyList]>([[[0, 0]], [[1, 2]], [['1', '2']], [['', 2]]])(``, (deps) => {
    let done = false;

    console.error = (message: string) => {
      done = !!message;
    };

    assertDependencyList(deps);

    expect(done).toBeFalsy();
  });
});
