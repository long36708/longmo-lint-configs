# 依赖安装说明

## 🤔 为什么安装后还需要安装其他依赖？

很多用户会疑惑：为什么安装了 `longmo-lint-configs` 后，还需要安装 ESLint、Prettier 等依赖？

## 📦 包结构分析

### 发布包内容

```
longmo-lint-configs/
├── package.json
├── internal/eslint-config/dist/index.mjs  (36.9 kB)
├── internal/prettier-config/index.mjs
├── internal/stylelint-config/index.mjs
└── ...
```

### 构建后的代码

查看 `internal/eslint-config/dist/index.mjs` 文件内容：

```javascript
// 这些 import 语句证明依赖没有被打包
import createCommand from 'eslint-plugin-command/config';
import * as pluginImport from 'eslint-plugin-import-x';
import js from '@eslint/js';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

// ... 更多 import 语句
```

## 🔧 技术原因

### 1. 构建配置使用 externals

```javascript
// internal/eslint-config/build.config.js
export default defineBuildConfig({
  externals: [
    'eslint',
    '@eslint/js',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    // ... 更多外部依赖
  ],
});
```

### 2. ESLint 插件特性

- ESLint 在运行时需要动态加载插件
- 插件必须存在于项目的 node_modules 中
- 无法通过打包解决这个问题

### 3. 包大小优化

- 当前包大小：仅 36.9 kB
- 如果打包所有依赖：可能超过几 MB
- 用户可以选择需要的依赖版本

## ✅ 解决方案：peerDependencies

我们使用 `peerDependencies` 机制：

1. **明确声明依赖关系** - 告诉包管理器需要哪些依赖
2. **版本兼容性** - 指定兼容的版本范围
3. **可选依赖** - 通过 `peerDependenciesMeta` 标记可选依赖
4. **自动提示** - 包管理器会提示安装缺失依赖

## 📋 安装流程

```bash
# 1. 安装主包
pnpm add longmo-lint-configs -D

# 2. 包管理器会提示
WARN  Issues with peer dependencies found
├─┬ longmo-lint-configs 1.0.7-beta.7
│ ├── ✗ missing peer eslint@^9.17.0
│ ├── ✗ missing peer prettier@^3.4.2
│ └── ✗ missing peer stylelint@^6.21.1

# 3. 按需安装
pnpm add eslint prettier stylelint -D
```

## 🎯 这是业界标准做法

类似的包都采用相同方式：

- `@typescript-eslint/eslint-plugin` 需要 `eslint` 和 `typescript`
- `eslint-plugin-vue` 需要 `eslint` 和 `vue-eslint-parser`
- `prettier-plugin-tailwindcss` 需要 `prettier`

这确保了：

- ✅ 包大小合理
- ✅ 版本灵活性
- ✅ 依赖关系清晰
- ✅ 用户体验良好
