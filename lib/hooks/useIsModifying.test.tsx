/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';

import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';

import { useIsModifying } from './useIsModifying';

const TRUE = 'TRUE';
const FALSE = 'FALSE';

function delay(timeout: number): Promise<void> {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, timeout);
  });
}

export interface UseIsModifyingWrapperProps {
  modified: Date | undefined;
  timeout: number;
}

export const UseIsModifyingWrapper: React.FunctionComponent<UseIsModifyingWrapperProps> = (props) => {
  const { modified, timeout } = props;
  const isModifying = useIsModifying(modified, timeout);

  if (isModifying) {
    return <div>{TRUE}</div>;
  }

  return <div>{FALSE}</div>;
};

jest.setTimeout(100 * 100 * 10);

afterEach(cleanup);

describe('useIsModifying', () => {
  test('false when modified === undefined', () => {
    render(<UseIsModifyingWrapper modified={undefined} timeout={10 * 1000} />);

    expect(screen.queryByText(FALSE)).toBeDefined();
  });

  test('false when modified is too old', () => {
    const now = new Date();
    const timeout = 10 * 1000;
    const modified = new Date(now.getTime() - timeout * 2);

    render(<UseIsModifyingWrapper modified={modified} timeout={timeout} />);

    expect(screen.queryByText(FALSE)).toBeDefined();
  });

  test('true when modified is new', () => {
    const now = new Date();
    const timeout = 10 * 1000;
    const modified = new Date(now.getTime() - timeout / 2);

    render(<UseIsModifyingWrapper modified={modified} timeout={timeout} />);

    expect(screen.queryByText(TRUE)).toBeDefined();
  });

  test('can change status', () => {
    const timeout = 10 * 1000;

    const { rerender } = render(<UseIsModifyingWrapper modified={undefined} timeout={timeout} />);
    expect(screen.queryByText(FALSE)).toBeDefined();

    rerender(<UseIsModifyingWrapper modified={new Date()} timeout={timeout} />);
    expect(screen.queryByText(TRUE)).toBeDefined();

    rerender(<UseIsModifyingWrapper modified={new Date(new Date().getTime() - timeout * 2)} timeout={timeout} />);
    expect(screen.queryByText(FALSE)).toBeDefined();

    rerender(<UseIsModifyingWrapper modified={new Date(new Date().getTime() - timeout / 2)} timeout={timeout} />);
    expect(screen.queryByText(FALSE)).toBeDefined();
  });

  describe('update', () => {
    test('can update', async () => {
      const timeout = 1 * 1000;

      const { rerender } = render(<UseIsModifyingWrapper modified={undefined} timeout={timeout} />);
      expect(screen.queryByText(FALSE)).toBeDefined();

      for (let i = 0; i < 100; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await delay(100);

        rerender(<UseIsModifyingWrapper modified={undefined} timeout={timeout} />);
        expect(screen.queryByText(FALSE)).toBeDefined();
      }
    });

    test('can update', async () => {
      const timeout = 500;

      const { rerender } = render(<UseIsModifyingWrapper modified={new Date()} timeout={timeout} />);
      expect(screen.queryByText(TRUE)).toBeDefined();

      for (let i = 0; i < 100; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await delay(100);

        rerender(<UseIsModifyingWrapper modified={new Date()} timeout={timeout} />);
        expect(screen.queryByText(TRUE)).toBeDefined();
      }
    });
  });
});
