# Catalog 与 PeerDependencies 兼容性解决方案

## 问题分析

当前项目使用 `catalog:` 来统一管理版本号，但 `peerDependencies` 中不能使用 `catalog:`，需要明确的版本号。

## 解决方案

### 方案一：从 catalog 提取版本号（推荐）

创建脚本自动从 `pnpm-workspace.yaml` 提取版本号并更新 `peerDependencies`：

```js
// scripts/sync-peer-deps.js
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'yaml';

function syncPeerDependencies() {
  // 读取 catalog 配置
  const workspaceContent = readFileSync('pnpm-workspace.yaml', 'utf8');
  const workspace = parse(workspaceContent);
  const catalog = workspace.catalog;

  // 定义需要同步的包配置
  const packages = [
    {
      path: 'internal/eslint-config/package.json',
      peerDeps: [
        'eslint',
        '@eslint/js',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-plugin-vue',
        'vue-eslint-parser',
        'eslint-plugin-import-x',
        'eslint-plugin-prettier',
        'eslint-plugin-perfectionist',
        'eslint-plugin-unicorn',
        'eslint-plugin-regexp',
        'eslint-plugin-jsdoc',
        'eslint-plugin-jsonc',
        'eslint-plugin-n',
        'eslint-plugin-no-only-tests',
        'eslint-plugin-eslint-comments',
        'eslint-plugin-unused-imports',
        'eslint-plugin-command',
        'eslint-config-turbo',
        '@vitest/eslint-plugin',
        'globals',
        'jsonc-eslint-parser'
      ],
      optionalPeerDeps: [
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-plugin-vue',
        'vue-eslint-parser',
        'eslint-plugin-perfectionist',
        'eslint-plugin-unicorn',
        'eslint-plugin-regexp',
        'eslint-plugin-jsdoc',
        'eslint-plugin-jsonc',
        'eslint-plugin-n',
        'eslint-plugin-no-only-tests',
        'eslint-plugin-eslint-comments',
        'eslint-plugin-unused-imports',
        'eslint-plugin-command',
        'eslint-config-turbo',
        '@vitest/eslint-plugin'
      ]
    },
    {
      path: 'internal/prettier-config/package.json',
      peerDeps: [
        'prettier',
        'prettier-plugin-tailwindcss'
      ],
      optionalPeerDeps: [
        'prettier-plugin-tailwindcss'
      ]
    },
    {
      path: 'internal/stylelint-config/package.json',
      peerDeps: [
        'stylelint',
        '@stylistic/stylelint-plugin',
        'stylelint-config-recess-order',
        'stylelint-scss',
        'postcss',
        'postcss-html',
        'postcss-scss',
        'stylelint-config-recommended',
        'stylelint-config-recommended-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-standard',
        'stylelint-order',
        'stylelint-prettier'
      ],
      optionalPeerDeps: [
        'stylelint-scss',
        'postcss-scss',
        'stylelint-config-recommended-scss',
        'stylelint-config-recommended-vue',
        'stylelint-prettier'
      ]
    }
  ];

  // 更新每个包的 peerDependencies
  packages.forEach(pkg => {
    const packageJson = JSON.parse(readFileSync(pkg.path, 'utf8'));
    
    // 构建 peerDependencies
    const peerDependencies = {};
    pkg.peerDeps.forEach(dep => {
      if (catalog[dep]) {
        peerDependencies[dep] = catalog[dep];
      }
    });

    // 构建 peerDependenciesMeta
    const peerDependenciesMeta = {};
    pkg.optionalPeerDeps.forEach(dep => {
      peerDependenciesMeta[dep] = { optional: true };
    });

    // 更新 package.json
    packageJson.peerDependencies = peerDependencies;
    packageJson.peerDependenciesMeta = peerDependenciesMeta;

    // 写回文件
    writeFileSync(pkg.path, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ Updated ${pkg.path}`);
  });
}

syncPeerDependencies();
```

### 方案二：保持 dependencies 不变，只添加 peerDependenciesMeta

```json
{
  "name": "longmo-eslint-config",
  "dependencies": {
    "eslint": "catalog:",
    "@eslint/js": "catalog:",
    // ... 其他依赖保持 catalog:
  },
  "peerDependenciesMeta": {
    "@typescript-eslint/eslint-plugin": {
      "optional": true
    },
    "@typescript-eslint/parser": {
      "optional": true
    },
    "eslint-plugin-vue": {
      "optional": true
    },
    "vue-eslint-parser": {
      "optional": true
    }
    // ... 其他可选依赖
  }
}
```

### 方案三：使用 package.json 脚本自动化

在根目录 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "sync:peer-deps": "node scripts/sync-peer-deps.js",
    "prebuild": "npm run sync:peer-deps",
    "prepublishOnly": "npm run sync:peer-deps"
  }
}
```

## 推荐实施方案

### 立即实施（方案二 + 自动化）

1. **保持现有 dependencies 使用 catalog:**
2. **只添加 peerDependenciesMeta 标记可选依赖**
3. **创建自动化脚本在发布前同步版本**

让我为您实施这个方案：