# longmo-lint-configs 项目架构文档

## 项目概述

`longmo-lint-configs` 是一个基于 Monorepo 架构的代码规范配置包集合，专为 Vue2 和 Vue3 项目提供完整的代码质量工具链。

## 项目架构图

```
longmo-lint-configs (Monorepo 根项目)
├── 📋 项目配置层
│   ├── package.json (主包配置 v1.0.7-beta.6)
│   ├── pnpm-workspace.yaml (工作空间配置)
│   ├── turbo.json (构建工具配置)
│   ├── .npmrc (npm 配置)
│   └── README.md (项目文档)
│
├── 🔧 开发工具配置层
│   ├── eslint.config.mjs (ESLint 配置)
│   ├── prettier.config.mjs (Prettier 配置)
│   ├── stylelint.config.mjs (Stylelint 配置)
│   ├── .lintstagedrc.mjs (Git hooks 配置)
│   ├── .editorconfig (编辑器配置)
│   └── .gitignore (Git 忽略配置)
│
├── 📦 内部包集合 (internal/)
│   ├── eslint-config/ (ESLint 规则包)
│   │   ├── package.json (v1.0.7-beta.4)
│   │   ├── build.config.js (构建配置)
│   │   └── src/ (源码目录)
│   │       ├── index.js (主入口)
│   │       ├── custom-config.js (自定义配置)
│   │       ├── util.js (工具函数)
│   │       └── configs/ (配置模块)
│   │           ├── javascript.js (JS 规则)
│   │           ├── typescript.js (TS 规则)
│   │           ├── vue.js & vue2.js (Vue 规则)
│   │           ├── import.js (导入规则)
│   │           ├── prettier.js (Prettier 集成)
│   │           ├── perfectionist.js (代码排序)
│   │           ├── unicorn.js (代码质量)
│   │           ├── regexp.js (正则表达式)
│   │           ├── jsdoc.js (文档注释)
│   │           ├── jsonc.js (JSON 配置)
│   │           ├── node.js (Node.js 规则)
│   │           ├── test-lint.js (测试规则)
│   │           ├── turbo.js (Turbo 集成)
│   │           ├── command.js (命令规则)
│   │           ├── comments.js (注释规则)
│   │           ├── disableds.js (禁用规则)
│   │           └── ignores.js (忽略配置)
│   │
│   ├── prettier-config/ (Prettier 配置包)
│   │   ├── package.json (v1.0.7-beta.4)
│   │   └── index.mjs (配置导出)
│   │
│   ├── stylelint-config/ (Stylelint 配置包)
│   │   ├── package.json (v1.0.7-beta.4)
│   │   └── index.mjs (配置导出)
│   │
│   └── jsconfig/ (JavaScript 配置包)
│       ├── package.json (v1.0.7-beta.4, private)
│       ├── base.json (基础配置)
│       ├── library.json (库项目配置)
│       ├── node.json (Node.js 配置)
│       ├── web-app.json (Web 应用配置)
│       └── web.json (Web 项目配置)
│
└── 🛠️ 构建脚本层
    └── scripts/
        └── clean.mjs (清理脚本)
```

## 架构特点

### 1. 现代化 Monorepo 架构

- **包管理器**: 使用 pnpm (v9.15.3+) 提供高效的依赖管理
- **构建系统**: 集成 Turbo 进行任务编排和缓存优化
- **模块系统**: 全面采用 ESM (`"type": "module"`)
- **依赖管理**: 使用 `catalog:` 模式统一版本管理

### 2. 完整的代码质量工具链

#### ESLint 配置 (longmo-eslint-config)
- 支持 JavaScript、TypeScript、Vue2、Vue3
- 集成 15+ 专业插件：
  - `@typescript-eslint/*` - TypeScript 支持
  - `eslint-plugin-vue` - Vue 框架支持
  - `eslint-plugin-import-x` - 导入规则
  - `eslint-plugin-perfectionist` - 代码排序
  - `eslint-plugin-unicorn` - 代码质量提升
  - `eslint-plugin-regexp` - 正则表达式优化
  - `eslint-plugin-jsdoc` - 文档注释规范
  - 等等...

#### Prettier 配置 (longmo-prettier-config)
- 代码格式化统一标准
- 集成 Tailwind CSS 插件支持
- 跨项目一致的格式化规则

#### Stylelint 配置 (longmo-stylelint-config)
- CSS/SCSS 样式规范检查
- 支持 Vue 单文件组件样式
- 集成样式属性排序规则

#### JSConfig 配置 (longmo-jsconfig)
- 多场景 JavaScript/TypeScript 项目配置
- 包含 5 种预设配置：
  - `base.json` - 基础配置
  - `library.json` - 库项目配置
  - `node.json` - Node.js 项目配置
  - `web-app.json` - Web 应用配置
  - `web.json` - Web 项目配置

### 3. 模块化设计原则

- **功能分离**: 每个工具独立成包，职责清晰
- **配置分层**: ESLint 配置按功能模块拆分
- **场景适配**: JSConfig 按使用场景分类
- **版本独立**: 每个包可独立版本管理和发布

### 4. 开发体验优化

- **Git 集成**: husky + lint-staged 自动化代码检查
- **编辑器统一**: .editorconfig 确保编辑器配置一致
- **自动化流程**: 构建、测试、发布全流程自动化
- **双版本支持**: 同时支持 Vue2 和 Vue3 项目

### 5. 发布和分发策略

- **统一入口**: 主包导出所有子配置包
- **独立发布**: 支持单独发布各个配置包
- **NPM 分发**: 配置 NPM 注册表发布
- **版本管理**: 使用 changesets 进行版本管理

## 技术栈

### 核心技术
- **Node.js**: >=18.20.4
- **pnpm**: >=9.12.0
- **ESM**: 全面使用 ES 模块

### 构建工具
- **Turbo**: 任务编排和缓存
- **unbuild**: 包构建工具
- **changesets**: 版本管理

### 代码质量工具
- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **Stylelint**: 样式检查
- **husky**: Git hooks
- **lint-staged**: 暂存文件检查

## 使用场景

### 适用项目类型
- Vue2/Vue3 单页应用
- TypeScript 项目
- Node.js 后端项目
- 前端组件库
- 全栈 JavaScript 项目

### 团队协作优势
- 统一代码规范标准
- 减少代码审查争议
- 提高代码质量和可维护性
- 加速新项目启动
- 降低配置维护成本

## 扩展性设计

### 配置扩展
- 支持自定义规则覆盖
- 可按需启用/禁用特定规则集
- 支持项目特定配置

### 插件生态
- 兼容 ESLint 生态系统
- 支持第三方插件集成
- 可扩展新的代码检查规则

## 维护和更新

### 依赖管理
- 定期更新依赖版本
- 兼容性测试保障
- 渐进式升级策略

### 版本发布
- 语义化版本控制
- 变更日志自动生成
- 向后兼容性保证

---

*最后更新时间: 2025年8月30日*