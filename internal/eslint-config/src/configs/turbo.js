import { interopDefault } from '../util.js';

/**
 * [`eslint-config-turbo` 包](https://turbo.build/repo/docs/reference/eslint-config-turbo)扩展了你的 ESLint 设置，以帮助你确保已经处理了所有的环境变量。
 * @returns {Promise<[{plugins: {turbo: *}}]>}
 */
export async function turbo() {
  // eslint-disable-next-line unicorn/no-single-promise-in-promise-methods
  const [pluginTurbo] = await Promise.all([
    // @ts-expect-error - no types
    interopDefault(import('eslint-config-turbo')),
  ]);

  return [
    {
      plugins: {
        turbo: pluginTurbo,
      },
    },
  ];
}
