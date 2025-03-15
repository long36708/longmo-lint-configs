import { interopDefault } from '../util.js';

export async function comments() {
  const [pluginComments] = await Promise.all([
    // @ts-expect-error - no types
    interopDefault(import('eslint-plugin-eslint-comments')),
  ]);

  return [
    {
      plugins: {
        'eslint-comments': pluginComments,
      },
      rules: {
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
      },
    },
  ];
}
