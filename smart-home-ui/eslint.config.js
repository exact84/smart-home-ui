import js from '@eslint/js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'unicorn/better-regex': 'warn',
    },
  },
];
