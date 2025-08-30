# Peer Dependencies 分析和建议

## 当前问题分析

### 🚨 现状问题
1. **缺少 peerDependencies 声明** - 用户不知道需要安装哪些依赖
2. **依赖管理混乱** - 用户需要手动查找和安装所有插件
3. **版本兼容性风险** - 没有版本约束，可能出现不兼容问题
4. **用户体验差** - 安装后无法直接使用，需要额外配置

### 📋 建议的改进方案

## 方案一：添加 peerDependencies（推荐）

### 1. 修改 `internal/eslint-config/package.json`

```json
{
  "name": "longmo-eslint-config",
  "version": "1.0.7-beta.4",
  "type": "module",
  "peerDependencies": {
    "eslint": "^9.17.0",
    "@eslint/js": "^9.17.0",
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1",
    "eslint-plugin-vue": "^9.32.0",
    "vue-eslint-parser": "^9.4.3",
    "eslint-plugin-import-x": "^4.6.1",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-perfectionist": "^4.6.0",
    "eslint-plugin-unicorn": "^56.0.1",
    "eslint-plugin-regexp": "^2.7.0",
    "eslint-plugin-jsdoc": "^50.6.1",
    "eslint-plugin-jsonc": "^2.18.2",
    "eslint-plugin-n": "^17.15.1",
    "eslint-plugin-no-only-tests": "^3.3.0",
    "eslint-plugin-eslint-comments": "^3.2.0",
    "eslint-plugin-unused-imports": "^4.1.4",
    "eslint-plugin-command": "^0.2.7",
    "globals": "^15.14.0",
    "jsonc-eslint-parser": "^2.4.0"
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
    },
    "eslint-plugin-perfectionist": {
      "optional": true
    },
    "eslint-plugin-unicorn": {
      "optional": true
    },
    "eslint-plugin-regexp": {
      "optional": true
    },
    "eslint-plugin-jsdoc": {
      "optional": true
    },
    "eslint-plugin-jsonc": {
      "optional": true
    },
    "eslint-plugin-n": {
      "optional": true
    },
    "eslint-plugin-no-only-tests": {
      "optional": true
    },
    "eslint-plugin-eslint-comments": {
      "optional": true
    },
    "eslint-plugin-unused-imports": {
      "optional": true
    },
    "eslint-plugin-command": {
      "optional": true
    }
  }
}
```

### 2. 修改 `internal/prettier-config/package.json`

```json
{
  "name": "longmo-prettier-config",
  "version": "1.0.7-beta.4",
  "type": "module",
  "peerDependencies": {
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.9"
  },
  "peerDependenciesMeta": {
    "prettier-plugin-tailwindcss": {
      "optional": true
    }
  }
}
```

### 3. 修改 `internal/stylelint-config/package.json`

```json
{
  "name": "longmo-stylelint-config",
  "version": "1.0.7-beta.4",
  "type": "module",
  "peerDependencies": {
    "stylelint": "^16.12.0",
    "@stylistic/stylelint-plugin": "^3.1.1",
    "stylelint-config-recess-order": "^5.1.1",
    "stylelint-scss": "^6.10.0",
    "postcss": "^8.4.49",
    "postcss-html": "^1.7.0",
    "postcss-scss": "^4.0.9"
  },
  "peerDependenciesMeta": {
    "stylelint-scss": {
      "optional": true
    },
    "postcss-scss": {
      "optional": true
    }
  }
}
```

## 方案二：分层依赖管理

### 创建不同的配置包

```json
// internal/eslint-config-base/package.json
{
  "name": "longmo-eslint-config-base",
  "peerDependencies": {
    "eslint": "^9.17.0",
    "@eslint/js": "^9.17.0",
    "eslint-plugin-import-x": "^4.6.1",
    "eslint-plugin-prettier": "^5.2.1"
  }
}

// internal/eslint-config-typescript/package.json
{
  "name": "longmo-eslint-config-typescript",
  "peerDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1"
  }
}

// internal/eslint-config-vue/package.json
{
  "name": "longmo-eslint-config-vue",
  "peerDependencies": {
    "eslint-plugin-vue": "^9.32.0",
    "vue-eslint-parser": "^9.4.3"
  }
}
```

## 方案三：自动安装脚本

### 创建 postinstall 脚本

```json
// package.json
{
  "scripts": {
    "postinstall": "node scripts/install-peers.js"
  }
}
```

```js
// scripts/install-peers.js
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const peerDeps = [
  'eslint@^9.17.0',
  '@eslint/js@^9.17.0',
  // ... 其他依赖
];

console.log('正在安装 peer dependencies...');
try {
  execSync(`npm install --save-dev ${peerDeps.join(' ')}`, { stdio: 'inherit' });
  console.log('✅ Peer dependencies 安装完成');
} catch (error) {
  console.log('❌ 安装失败，请手动安装依赖');
  console.log(`npm install --save-dev ${peerDeps.join(' ')}`);
}
```

## 推荐实施方案

### 阶段一：立即实施（推荐方案一）
1. **添加 peerDependencies** - 明确依赖关系
2. **使用 peerDependenciesMeta** - 标记可选依赖
3. **更新文档** - 说明依赖安装方式

### 阶段二：长期优化
1. **创建预设包** - 如 `@longmo/eslint-config-vue3`
2. **自动化工具** - 依赖检查和安装脚本
3. **CLI 工具** - 一键配置不同项目类型

## 优势对比

| 方案 | 优势 | 劣势 |
|------|------|------|
| peerDependencies | 标准做法，包管理器支持 | 初次安装复杂 |
| 分层包 | 按需安装，清晰明确 | 包数量增加 |
| 自动安装 | 用户体验好 | 可能安装不需要的依赖 |

## 实施建议

### 1. 立即修改 package.json
- 添加 peerDependencies 声明
- 使用 peerDependenciesMeta 标记可选依赖

### 2. 更新安装文档
```bash
# 用户只需要运行
pnpm add longmo-lint-configs -D

# pnpm 会自动提示安装 peer dependencies
pnpm install
```

### 3. 提供快速安装命令
```bash
# 一键安装所有依赖
pnpm add longmo-lint-configs eslint @eslint/js eslint-plugin-vue -D
```

## 最佳实践参考

参考其他流行的 ESLint 配置包：
- `@typescript-eslint/eslint-plugin` - 使用 peerDependencies
- `eslint-config-airbnb` - 使用 peerDependencies + 安装脚本
- `@vue/eslint-config-typescript` - 分层依赖管理

---

*建议优先级：方案一 > 方案三 > 方案二*