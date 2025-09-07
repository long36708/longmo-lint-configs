# longmo-lint-configs

```text
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/long36708/longmo-lint-configs.git
git push -u origin main
```

## 📖 简介

`longmo-lint-configs` 是一个专为 Vue2/Vue3 项目设计的代码规范配置包集合，提供了 ESLint、Prettier、Stylelint 和 JSConfig 的统一配置。

## 🚀 快速开始

### 安装

#### 1. 安装主包

```bash
# 使用 npm
npm install longmo-lint-configs --save-dev

# 使用 pnpm (推荐)
pnpm add longmo-lint-configs -D

# 使用 yarn
yarn add longmo-lint-configs --dev
```

#### 2. 安装 Peer Dependencies

⚠️ **重要：用户必须单独安装相关依赖！**

**为什么需要安装额外依赖？**

- 构建使用 `externals` 配置，依赖不会被打包
- 构建后文件仍包含 `import` 语句引用外部包
- ESLint 插件需要在运行时从 node_modules 动态加载
- 包大小优化：当前仅 36.9 kB（如打包所有依赖会很大）

**构建后的代码示例：**

```javascript
// 实际发布的文件仍然包含这些 import
import createCommand from 'eslint-plugin-command/config';
import * as pluginImport from 'eslint-plugin-import-x';
import js from '@eslint/js';
```

**自动安装（推荐）：**

```bash
# pnpm 会自动检测并提示安装 peer dependencies
pnpm install

# 查看需要安装的 peer dependencies
pnpm why --peer
```

**手动安装核心依赖：**

```bash
# 基础依赖（必需）
pnpm add -D eslint @eslint/js eslint-plugin-import-x eslint-plugin-prettier

# TypeScript 项目额外需要
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Vue 项目额外需要
pnpm add -D eslint-plugin-vue vue-eslint-parser

# Prettier 和 Stylelint
pnpm add -D prettier stylelint
```

**一键安装不同项目类型：**

Vue3 + TypeScript 项目：

```bash
pnpm add -D longmo-lint-configs eslint @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue vue-eslint-parser eslint-plugin-import-x eslint-plugin-prettier prettier stylelint
```

Vue2 项目：

```bash
pnpm add longmo-lint-configs eslint @eslint/js eslint-plugin-vue vue-eslint-parser eslint-plugin-import-x eslint-plugin-prettier prettier stylelint
```

Node.js 项目：

```bash
pnpm add -D longmo-lint-configs eslint @eslint/js eslint-plugin-n eslint-plugin-import-x eslint-plugin-prettier prettier
```

#### 3. 可选插件

以下插件被标记为可选，根据需要安装：

- `eslint-plugin-perfectionist` - 代码排序
- `eslint-plugin-unicorn` - 代码质量提升
- `eslint-plugin-regexp` - 正则表达式优化
- `eslint-plugin-jsdoc` - JSDoc 注释规范
- `@vitest/eslint-plugin` - Vitest 测试支持

### 基础配置

#### 1. ESLint 配置

创建 `eslint.config.mjs` 文件：

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig();
```

#### 2. Prettier 配置

创建 `prettier.config.mjs` 文件：

```js
// prettier.config.mjs
import prettierConfig from 'longmo-lint-configs/prettier-config';

export default prettierConfig;
```

#### 3. Stylelint 配置

创建 `stylelint.config.mjs` 文件：

```js
// stylelint.config.mjs
import stylelintConfig from 'longmo-lint-configs/stylelint-config';

export default stylelintConfig;
```

## 📋 详细配置示例

### ESLint 配置

#### 基础 Vue3 项目

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    // 项目特定配置
    rules: {
      // 自定义规则
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  },
]);
```

#### TypeScript + Vue3 项目

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]);
```

#### Vue2 项目配置

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    files: ['**/*.vue'],
    rules: {
      // Vue2 特定规则
      'vue/no-multiple-template-root': 'error',
      'vue/no-v-for-template-key': 'error',
    },
  },
]);
```

#### Node.js 项目配置

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.mjs'],
    env: {
      node: true,
    },
    rules: {
      'n/no-unpublished-require': 'off',
      'n/no-missing-import': 'off',
    },
  },
]);
```

### Prettier 配置

#### 自定义 Prettier 配置

```js
// prettier.config.mjs
import prettierConfig from 'longmo-lint-configs/prettier-config';

export default {
  ...prettierConfig,
  // 覆盖默认配置
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'auto', // 推荐使用 auto 而不是 crlf
};
```

#### 针对不同文件类型的配置

```js
// prettier.config.mjs
import prettierConfig from 'longmo-lint-configs/prettier-config';

export default {
  ...prettierConfig,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
    {
      files: ['*.scss', '*.css'],
      options: {
        parser: 'scss',
      },
    },
  ],
};
```

### Stylelint 配置

#### 基础配置

```js
// stylelint.config.mjs
import stylelintConfig from 'longmo-lint-configs/stylelint-config';

export default stylelintConfig;
```

#### 自定义规则配置

```js
// stylelint.config.mjs
import stylelintConfig from 'longmo-lint-configs/stylelint-config';

export default {
  ...stylelintConfig,
  rules: {
    ...stylelintConfig.rules,
    // 自定义规则
    'selector-class-pattern': null, // 禁用类名模式检查
    'color-hex-length': 'long', // 强制使用长格式十六进制颜色
    'declaration-block-trailing-semicolon': 'always',
  },
};
```

#### Tailwind CSS 项目配置

```js
// stylelint.config.mjs
import stylelintConfig from 'longmo-lint-configs/stylelint-config';

export default {
  ...stylelintConfig,
  rules: {
    ...stylelintConfig.rules,
    // Tailwind CSS 兼容性
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
        ],
      },
    ],
  },
};
```

### JSConfig 配置

#### Web 应用配置

```json
// jsconfig.json
{
  "extends": "longmo-lint-configs/internal/jsconfig/web-app.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**pnpm, "types/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### Node.js 项目配置

```json
// jsconfig.json
{
  "extends": "longmo-lint-configs/internal/jsconfig/node.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "scripts/**/*"],
  "exclude": ["node_modules", "dist", "build"]
}
```

#### 库项目配置

```json
// jsconfig.json
{
  "extends": "longmo-lint-configs/internal/jsconfig/library.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.js"]
}
```

## 🛠️ 集成到项目

### package.json 脚本配置

```json
{
  "scripts": {
    "lint": "eslint . --fix",
    "lint:check": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "style:lint": "stylelint \"**/*.{css,scss,vue}\" --fix",
    "style:check": "stylelint \"**/*.{css,scss,vue}\"",
    "lint:all": "npm run lint && npm run format && npm run style:lint"
  }
}
```

### VS Code 配置

创建 `.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "stylelint.validate": ["css", "scss", "vue"],
  "prettier.configPath": "./prettier.config.mjs"
}
```

### Git Hooks 配置

安装 husky 和 lint-staged：

```bash
pnpm add husky lint-staged -D
```

配置 `.lintstagedrc.mjs`：

```js
export default {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,vue}': ['stylelint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
```

配置 `package.json`：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

创建 `.husky/pre-commit`：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

## 🎯 项目类型示例

### Vue3 + TypeScript + Vite 项目

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['vite.config.ts', 'vitest.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]);
```

### Vue2 + JavaScript 项目

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    files: ['**/*.vue', '**/*.js'],
    rules: {
      'vue/no-multiple-template-root': 'error',
      'vue/no-v-model-argument': 'error',
    },
  },
]);
```

### Nuxt.js 项目

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    files: ['**pnpm.vue', '**/*.js', '**/*.ts'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'n/no-missing-import': 'off',
},
  {
    files: ['nuxt.config.ts', 'plugins/**/*', 'middleware/**/*'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]);
```

## 🔧 自定义配置

### 禁用特定规则

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    rules: {
      // 完全禁用规则
      'no-console': 'off',
      'vue/require-default-prop': 'off',

      // 降级为警告
      '@typescript-eslint/no-unused-vars': 'warn',

      // 自定义规则选项
      'max-len': ['error', { code: 120 }],
    },
  },
]);
```

### 针对特定文件的配置

```js
// eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'no-unused-expressions': 'off',
      'max-lines-per-function': 'off',
    },
  },
  {
    files: ['scripts/**/*'],
    rules: {
      'no-console': 'off',
      'n/no-process-exit': 'off',
    },
  },
]);
```

## 📚 常见问题

### Q: 为什么安装后提示找不到 ESLint 插件？

A: `longmo-lint-configs` 没有将 ESLint 插件打包在内，您需要根据项目需要单独安装相应的插件依赖。请参考上面的"安装必需的 ESLint 插件依赖"部分。

### Q: 我只想使用部分功能，需要安装所有依赖吗？

A: 不需要。您可以按需安装：

- 只使用 Prettier：只需安装 `prettier`
- 只使用 Stylelint：只需安装 `stylelint` 相关依赖
- 基础 ESLint：安装 `eslint` + `@eslint/js` + 项目相关插件

### Q: 如何检查缺少哪些依赖？

A: 运行 ESLint 时，如果缺少依赖会有明确的错误提示：

```bash
npm run lint
# 或
pnpm lint
```

根据错误信息安装对应的包即可。

### Q: 如何解决规则冲突？

A: 使用项目特定配置覆盖默认规则：

```js
export default defineConfig([
  {
    rules: {
      // 覆盖默认规则
      'conflicting-rule': 'off',
    },
  },
]);
```

### Q: 如何在 monorepo 中使用？

A: 在根目录和各个包中分别配置：

```js
// 根目录 eslint.config.mjs
import { defineConfig } from 'longmo-lint-configs/eslint-config';

export default defineConfig([
  {
    ignores: ['packages/*/dist/**'],
  },
]);
```

### Q: 如何处理第三方库的类型错误？

A: 在 TypeScript 配置中忽略：

```js
export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description' },
    ],
  },
]);
```

## 🔄 迁移指南

### 从其他 ESLint 配置迁移

1. 卸载旧的配置包
2. 安装 `longmo-lint-configs`
3. 更新配置文件
4. 运行 `npm run lint -- --fix` 自动修复

### 版本升级

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本变更，按照升级指南逐步更新。

---

_最后更新时间: 2025年8月30日_
