/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-native/*|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@regulaforensics/.*)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/?(*.)+(spec|test).(j|t)s?(x)'],
  collectCoverage: true,
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, 'babel.config.js') },
    ],
  },
  // moduleNameMapper: {
  //   '@kalina/(.*)$': ['<rootDir>/packages/$1', '<rootDir>/modules/$1'],
  // },
}
