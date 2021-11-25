module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  setupFilesAfterEnv: ['./tests/setupTest.js'],
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'config', 'models/index.js', 'index.js', 'config.js'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
