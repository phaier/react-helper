/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
        diagnostics: {
          ignoreCodes: [151001],
        },
      },
    ],
  },

  testMatch: ['**/lib/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '.d.ts$'],
};
