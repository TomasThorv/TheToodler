module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|expo|@expo|@unimodules|unimodules|expo-.*|@react-navigation|react-navigation)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.test.{ts,tsx}',
        '!src/types/**',
    ],
};
