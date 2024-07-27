module.exports = {
  root: true,
  extends: ['@phaier/eslint-config-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },

  rules: {
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
    // トランスパイルすれば拡張子が変わるので ts, tsx の拡張子は基本的に指定しない
    'import/extensions': [
      'error',
      'never',
      {
        ts: 'never',
        svg: 'always',
        graphql: 'always',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'before' },

          { pattern: '@phaier/**', group: 'internal', position: 'before' },

          { pattern: '#/**', group: 'internal', position: 'before' },

          { pattern: '**.scss', group: 'index', position: 'before' },
        ],
      },
    ],
  },

  ignorePatterns: ['node_modules/'],
};
