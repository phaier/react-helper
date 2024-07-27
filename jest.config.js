module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: ['**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '.d.ts$'],

  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
};
