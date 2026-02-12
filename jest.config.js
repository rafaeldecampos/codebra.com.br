const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^infra/(.*)$": "<rootDir>/infra/$1",
    "^models/(.*)$": "<rootDir>/models/$1",
    "^pages/(.*)$": "<rootDir>/pages/$1",
    "^components/(.*)$": "<rootDir>/components/$1",
  },
  testMatch: ["**/tests/**/*.test.js", "**/__tests__/**/*.js"],
  collectCoverageFrom: [
    "pages/**/*.js",
    "models/**/*.js",
    "components/**/*.js",
    "!pages/_app.js",
    "!pages/_document.js",
    "!pages/api/**",
    "!pages/*.module.css",
    "!components/*.module.css",
  ],
};

module.exports = createJestConfig(customJestConfig);
