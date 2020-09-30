module.exports = {
  coverageDirectory: 'coverage',
  moduleFileExtensions: [
    "jsx",
    "js"
  ],
  testMatch: [
    "**/*.test.(js|jsx)"
  ],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ]
}
