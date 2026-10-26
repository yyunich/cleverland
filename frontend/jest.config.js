const nextJest = require("next/jest");

// next/jest автоматически настраивает трансформацию JSX/TSX,
// CSS-моки и алиас @/* из tsconfig.json
const createJestConfig = nextJest({ dir: "./" });

const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

module.exports = createJestConfig(config);
