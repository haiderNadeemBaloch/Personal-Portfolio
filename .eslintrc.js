module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unknown-property': [
      'error',
      {
        ignore: [
          'position',
          'geometry',
          'metalness',
          'roughness',
          'intensity',
          'makeDefault',
          'enableZoom',
          'enablePan',
          'autoRotate',
          'autoRotateSpeed',
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
