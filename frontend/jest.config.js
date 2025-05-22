module.exports = {
  // The root directory that Jest should scan for tests and modules within
  rootDir: '.',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Mock all modules by default for a clean slate in each test
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js'
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Allow importing modules without specifying the extension
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Transform non-JS files using Babel
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },

  // Don't transform anything in node_modules except axios which uses ES modules
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/'
  ]
}; 