module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
  setupFiles: ["./jest.setupFile.js"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx", "!src/**/__tests__/*.spec.tsx"],
  coverageReporters: ["lcov"],
};
