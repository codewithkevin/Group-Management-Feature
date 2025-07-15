module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: [
    "<rootDir>/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)",
    "<rootDir>/**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)",
    "<rootDir>/**/*.(test|spec).(js|jsx|ts|tsx)",
  ],
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "store/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/__tests__/**",
    "!**/coverage/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@expo|expo-.*|@expo/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
};
