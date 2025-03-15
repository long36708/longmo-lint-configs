import * as pluginImport from 'eslint-plugin-import-x';

export async function importPluginConfig() {
  return [
    {
      plugins: {
        // @ts-expect-error - This is a dynamic import
        import: pluginImport,
      },
      rules: {
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        // 'import/first': 'error',
        'import/first': 'off',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'off',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-unresolved': 'off',
        'import/no-webpack-loader-syntax': 'error',
        'unused-imports/no-unused-imports': 'off',
      },
    },
  ];
}
