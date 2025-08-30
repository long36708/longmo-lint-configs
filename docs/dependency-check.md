# 依赖检查指南

## 为什么需要额外安装依赖？

`longmo-lint-configs` 采用了 **外部依赖** 的设计模式，这意味着：

1. **减小包体积**：避免重复安装相同的依赖
2. **版本灵活性**：用户可以选择合适的插件版本
3. **按需使用**：只安装项目实际需要的插件

## 依赖检查脚本

创建 `scripts/check-deps.js` 来检查缺少的依赖：

```js
// scripts/check-deps.js
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const requiredDeps = {
  // 基础依赖
  eslint: '^9.0.0',
  '@eslint/js': '^9.0.0',
  
  // TypeScript 支持
  '@typescript-eslint/eslint-plugin': '^8.0.0',
  '@typescript-eslint/parser': '^8.0.0',
  
  // Vue 支持
  'eslint-plugin-vue': '^9.0.0',
  'vue-eslint-parser': '^9.0.0',
  
  // 常用插件
  'eslint-plugin-import-x': '^4.0.0',
  'eslint-plugin-prettier': '^5.0.0',
  'prettier': '^3.0.0',
};

function checkDependencies() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  const installed = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const missing = [];
  const outdated = [];

  for (const [dep, version] of Object.entries(requiredDeps)) {
    if (!installed[dep]) {
      missing.push(`${dep}@${version}`);
    }
  }

  if (missing.length > 0) {
    console.log('❌ 缺少以下依赖：');
    console.log(`pnpm add -D ${missing.join(' ')}`);
    console.log('');
  } else {
    console.log('✅ 所有必需依赖已安装');
  }
}

checkDependencies();
```

运行检查：
```bash
node scripts/check-deps.js
```

## 快速安装命令

### 根据项目类型选择：

#### Vue3 + TypeScript 项目
```bash
pnpm add -D eslint @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue vue-eslint-parser eslint-plugin-import-x eslint-plugin-prettier prettier longmo-lint-configs
```

#### Vue2 项目
```bash
pnpm add -D eslint @eslint/js eslint-plugin-vue vue-eslint-parser eslint-plugin-import-x eslint-plugin-prettier prettier longmo-lint-configs
```

#### React + TypeScript 项目
```bash
pnpm add -D eslint @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import-x eslint-plugin-prettier prettier longmo-lint-configs
```

#### Node.js 项目
```bash
pnpm add -D eslint @eslint/js eslint-plugin-n eslint-plugin-import-x eslint-plugin-prettier prettier longmo-lint-configs
```

## 可选插件说明

| 插件 | 用途 | 是否必需 |
|------|------|----------|
| `eslint` | ESLint 核心 | ✅ 必需 |
| `@eslint/js` | JavaScript 规则 | ✅ 必需 |
| `@typescript-eslint/*` | TypeScript 支持 | TS 项目必需 |
| `eslint-plugin-vue` | Vue 支持 | Vue 项目必需 |
| `eslint-plugin-import-x` | 导入规则 | 🔶 推荐 |
| `eslint-plugin-prettier` | Prettier 集成 | 🔶 推荐 |
| `eslint-plugin-perfectionist` | 代码排序 | 🔷 可选 |
| `eslint-plugin-unicorn` | 代码质量 | 🔷 可选 |
| `eslint-plugin-regexp` | 正则表达式 | 🔷 可选 |
| `eslint-plugin-jsdoc` | JSDoc 注释 | 🔷 可选 |

## 故障排除

### 1. 插件未找到错误
```
Error: Failed to load plugin 'import-x'
```

**解决方案**：安装缺少的插件
```bash
pnpm add -D eslint-plugin-import-x
```

### 2. 解析器错误
```
Error: Failed to load parser '@typescript-eslint/parser'
```

**解决方案**：安装 TypeScript 解析器
```bash
pnpm add -D @typescript-eslint/parser
```

### 3. 版本兼容性问题
```
Error: Plugin version incompatible
```

**解决方案**：检查并更新到兼容版本
```bash
pnpm update eslint @typescript-eslint/eslint-plugin
```

## 最佳实践

1. **使用 package.json 模板**：为不同项目类型创建 package.json 模板
2. **版本锁定**：在 package.json 中锁定插件版本避免兼容性问题
3. **渐进式安装**：先安装基础依赖，再根据需要添加可选插件
4. **定期更新**：定期检查和更新依赖版本

---

*最后更新时间: 2025年8月30日*