import { useState } from 'react';

let counter = 0;

export function uniqueId(prefix: string): string {
  counter += 1;

  return prefix + counter.toString();
}

/**
 * input, label のための一意な ID を生成する hook
 *
 * @deprecated この hook は削除される予定です。代わりに React.js 標準の `useId` を使用してください。
 * @see https://react.dev/reference/react/useId
 */
export function useControlId(): string {
  const [id] = useState(uniqueId('control-id-'));

  return id;
}
