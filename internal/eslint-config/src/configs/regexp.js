import { interopDefault } from '../util.js';

export async function regexp() {
  const [pluginRegexp] = await Promise.all([
    interopDefault(import('eslint-plugin-regexp')),
  ]);

  return [
    {
      plugins: {
        regexp: pluginRegexp,
      },
      rules: {
        ...pluginRegexp.configs.recommended.rules,
      },
    },
  ];
}
