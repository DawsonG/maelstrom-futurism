import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

const stylisticCustomized = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
  commaDangle: 'always-multiline',
  arrowParens: 'as-needed',
  braceStyle: '1tbs',
});

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
  {
    plugins: {
      ...stylisticCustomized.plugins,
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      ...stylisticCustomized.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
    languageOptions: {
      sourceType: 'module',
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
