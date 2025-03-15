import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  // declaration: true,
  entries: ['src/index'],
  externals: [
    'eslint',
    '@eslint/js',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitest/eslint-plugin',

    'eslint-plugin-eslint-comments',
    'eslint-plugin-jsdoc',
    'eslint-plugin-jsonc',
    'eslint-plugin-n',
    'eslint-plugin-no-only-tests',

    'eslint-plugin-perfectionist',
    'eslint-plugin-prettier',
    'eslint-plugin-regexp',
    'eslint-plugin-unicorn',
    'eslint-plugin-unused-imports',

    'jsonc-eslint-parser',
    'vue-eslint-parser',
    'eslint-plugin-vue',
  ],
  failOnWarn: false,
});
