import { interopDefault } from '../util.js';

/**
 * vue2项目的lint规则
 * @returns {Promise<[{plugins: {vue: 返回模块的默认导出值或整个模块内容}, files: string[], rules: (*&{"vue/html-quotes": string[], "vue/no-unused-refs": string, "vue/html-indent": string, "vue/max-attributes-per-line": string, "vue/no-irregular-whitespace": string, "vue/singleline-html-element-content-newline": string, "vue/custom-event-name-casing": string[], "vue/require-explicit-emits": string, "vue/no-reserved-component-names": string, "vue/eqeqeq": string[], "vue/html-self-closing": [string,{svg: string, html: {normal: string, component: string, void: string}, math: string}], "vue/prop-name-casing": string[], "vue/object-shorthand": [string,string,{avoidQuotes: boolean, ignoreConstructors: boolean}], "vue/require-default-prop": string, "vue/attributes-order": string, "vue/v-on-event-hyphenation": [string,string,{ignore: *[], autofix: boolean}], "vue/dot-location": string[], "vue/no-empty-pattern": string, "vue/prefer-template": string, "vue/prefer-import-from-vue": string, "vue/component-name-in-template-casing": string[], "vue/multi-word-component-names": string, "vue/no-sparse-arrays": string, "vue/space-unary-ops": [string,{nonwords: boolean, words: boolean}], "vue/space-infix-ops": string, "vue/html-closing-bracket-newline": string, "vue/no-restricted-v-bind": string[], "vue/no-useless-v-bind": string, "vue/require-prop-types": string, "vue/block-order": [string,{order: string[]}], "vue/dot-notation": [string,{allowKeywords: boolean}], "vue/attribute-hyphenation": [string,string,{ignore: *[]}], "vue/prefer-separate-static-class": string, "vue/no-restricted-syntax": string[], "vue/no-extra-parens": string[], "vue/multiline-html-element-content-newline": string, "vue/no-loss-of-precision": string, "vue/script-setup-uses-vars": string, "vue/component-options-name-casing": string[], "vue/define-macros-order": [string,{order: string[]}], "vue/one-component-per-file": string}), processor: *, languageOptions: {parserOptions: {extraFileExtensions: string[], parser: 返回模块的默认导出值或整个模块内容, sourceType: string, ecmaFeatures: {jsx: boolean}}, parser: 返回模块的默认导出值或整个模块内容}}]>}
 */
export async function vue() {
  const [pluginVue, parserVue, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
    // @ts-expect-error missing types
    interopDefault(import('@typescript-eslint/parser')),
  ]);

  return [
    {
      files: ['**/*.vue'],
      languageOptions: {
        // globals: {
        //   computed: 'readonly',
        //   defineEmits: 'readonly',
        //   defineExpose: 'readonly',
        //   defineProps: 'readonly',
        //   onMounted: 'readonly',
        //   onUnmounted: 'readonly',
        //   reactive: 'readonly',
        //   ref: 'readonly',
        //   shallowReactive: 'readonly',
        //   shallowRef: 'readonly',
        //   toRef: 'readonly',
        //   toRefs: 'readonly',
        //   watch: 'readonly',
        //   watchEffect: 'readonly',
        // },
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: parserTs,
          sourceType: 'module',
        },
      },
      plugins: {
        vue: pluginVue,
      },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs.essential.rules,
        ...pluginVue.configs['strongly-recommended'].rules,
        ...pluginVue.configs.recommended.rules,

        'vue/attribute-hyphenation': [
          'error',
          'always',
          {
            ignore: [],
          },
        ],
        'vue/attributes-order': 'off',
        'vue/block-order': [
          'error',
          {
            order: ['template', 'script', 'style'],
          },
        ],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        // 'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/custom-event-name-casing': ['off', 'camelCase'],
        'vue/define-macros-order': [
          'error',
          {
            order: [
              'defineOptions',
              'defineProps',
              'defineEmits',
              'defineSlots',
            ],
          },
        ],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-closing-bracket-newline': 'error',
        'vue/html-indent': 'off',
        // 'vue/html-indent': ['error', 2],
        'vue/html-quotes': ['error', 'double'],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              component: 'always',
              normal: 'never',
              void: 'always',
            },
            math: 'always',
            svg: 'always',
          },
        ],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/multiline-html-element-content-newline': 'error',
        'vue/no-empty-pattern': 'error',
        'vue/no-extra-parens': ['error', 'functions'],
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-reserved-component-names': 'off',
        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-sparse-arrays': 'error',
        // 'vue/no-unused-refs': 'error',
        'vue/no-unused-refs': 'off',
        'vue/no-useless-v-bind': 'error',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/one-component-per-file': 'error',
        'vue/prefer-import-from-vue': 'error',
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/require-default-prop': 'error',
        // 'vue/require-explicit-emits': 'error',
        'vue/require-explicit-emits': 'off',
        'vue/require-prop-types': 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],
        // 'vue/v-on-event-hyphenation': [
        //   'error',
        //   'always',
        //   {
        //     autofix: true,
        //     ignore: [],
        //   },
        // ],
        /* @xxx-bbb */
        'vue/v-on-event-hyphenation': [
          'off',
          'always',
          {
            autofix: false,
            ignore: [],
          },
        ],
      },
    },
  ];
}
