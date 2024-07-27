import { useState } from 'react';

let counter = 0;

export function uniqueId(prefix: string): string {
  counter += 1;

  return prefix + counter.toString();
}

/**
 * input, label のための一意な ID を生成する hook
 */
export function useControlId(): string {
  const [id] = useState(uniqueId('control-id-'));

  return id;
}
