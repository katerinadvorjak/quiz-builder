module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  ignorePatterns: ['**/node_modules/**', 'frontend/public/**'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
