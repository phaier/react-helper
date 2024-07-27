import * as React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup, act } from '@testing-library/react';
import { useHandler } from './useHandler';

const BUTTON = 'BUTTON';

export interface UseHandlerWrapperProps {
  i: number;
  callback(i: number): void;
}

export const UseHandlerWrapper: React.FunctionComponent<UseHandlerWrapperProps> = (props) => {
  const { i, callback } = props;

  const handler = useHandler<React.MouseEvent<HTMLButtonElement, MouseEvent>>(async (e) => {
    e.preventDefault();

    callback(i);
  }, []);

  return <button onClick={handler}>{BUTTON}</button>;
};

afterEach(cleanup);

describe('useHandler', () => {
  test('false when modified === undefined', () => {
    const ns: number[] = [];

    const { rerender, getByText } = render(
      <UseHandlerWrapper
        i={0}
        callback={(i) => {
          ns.push(i);
        }}
      />
    );

    act(() => {
      fireEvent.click(getByText(BUTTON));
    });

    act(() => {
      rerender(
        <UseHandlerWrapper
          i={1}
          callback={(i) => {
            ns.push(i);
          }}
        />
      );
    });

    act(() => {
      fireEvent.click(getByText(BUTTON));
    });

    expect(ns).toStrictEqual<number[]>([0, 1]);
  });
});
