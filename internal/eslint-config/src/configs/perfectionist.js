import { interopDefault } from '../util.js';

/**
 * 获取 perfectionist 插件的配置
 * @returns {Promise<[*,{rules: {"perfectionist/sort-named-exports": [string,{type: string, order: string}], "perfectionist/sort-exports": [string,{type: string, order: string}], "perfectionist/sort-imports": [string,{customGroups: {type: {"longmo-core-type": string[], "longmo-type": string[], "vue-type": string[]}, value: {longmo: string[], "longmo-core": string[], vue: string[]}}, environment: string, internalPattern: string[], groups: (string[]|string)[], newlinesBetween: string, type: string, order: string}], "perfectionist/sort-objects": [string,{customGroups: {children: string, list: string, items: string}, groups: string[], ignorePattern: string[], type: string, order: string}], "perfectionist/sort-modules": string}}]>}
 */
export async function perfectionist() {
  const perfectionistPlugin = await interopDefault(
    // @ts-expect-error - no types
    import('eslint-plugin-perfectionist'),
  );

  return [
    perfectionistPlugin.configs['recommended-natural'],
    {
      rules: {
        'perfectionist/sort-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                'longmo-core-type': ['^@longmo-core/.+'],
                'longmo-type': ['^longmo-.+'],
                'vue-type': ['^vue$', '^vue-.+', '^@vue/.+'],
              },
              value: {
                longmo: ['^longmo-.+'],
                'longmo-core': ['^@longmo-core/.+'],
                vue: ['^vue$', '^vue-.+', '^@vue/.+'],
              },
            },
            environment: 'node',
            groups: [
              ['external-type', 'builtin-type', 'type'],
              'vue-type',
              'longmo-type',
              'longmo-core-type',
              ['parent-type', 'sibling-type', 'index-type'],
              ['internal-type'],
              'builtin',
              'vue',
              'longmo',
              'longmo-core',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
              'side-effect',
              'side-effect-style',
              'style',
              'object',
              'unknown',
            ],
            internalPattern: ['^#/.+'],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            customGroups: {
              items: 'items',
              list: 'list',
              children: 'children',
            },
            groups: ['unknown', 'items', 'list', 'children'],
            ignorePattern: ['children'],
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    },
  ];
}
