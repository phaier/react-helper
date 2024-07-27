module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

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
