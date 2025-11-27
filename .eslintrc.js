module.exports = {
    root: true,
    extends: [
        'expo',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-trailing-spaces': 'error',
        'eol-last': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'brace-style': ['error', '1tbs'],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { 
            'argsIgnorePattern': '^_',
            'varsIgnorePattern': '^_',
        }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
