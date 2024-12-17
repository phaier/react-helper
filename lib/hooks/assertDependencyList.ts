import { DependencyList } from 'react';

/**
 * hooks に渡される DependencyList に問題がないか確認します。
 * hooks に Object や Function を渡すと比較処理が正常に動作しなくなるため。
 *
 * @param deps hooks に渡す DependencyList
 */
export function assertDependencyList(deps: DependencyList) {
  if (!Array.isArray(deps)) {
    console.error(`deps is not Array`);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const dep of deps) {
    const tod = typeof dep;

    if (tod === 'object' || tod === 'function' || tod === 'symbol') {
      console.error(`deps contain ${tod}`);
    }
  }
}
