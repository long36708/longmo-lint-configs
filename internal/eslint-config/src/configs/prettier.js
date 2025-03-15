import { interopDefault } from '../util.js';

export async function prettier() {
  const [pluginPrettier] = await Promise.all([
    interopDefault(import('eslint-plugin-prettier')),
  ]);
  return [
    {
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ];
}
