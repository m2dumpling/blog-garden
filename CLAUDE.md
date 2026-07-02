# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

```bash
pnpm dev              # 启动开发服务器 (localhost:3000)
pnpm build            # 生产构建
pnpm start            # 启动生产服务
pnpm types:check      # 类型检查 (先运行 fumadocs-mdx 生成类型)
pnpm postinstall      # 安装后自动生成 .source 类型文件
```

## 架构概览

- **框架**: Next.js 16 App Router + React 19 + TypeScript 6
- **内容引擎**: Fumadocs 16（MDX 驱动）
- **样式**: Tailwind CSS 4 + Fumadocs UI neutral 主题
- **动画**: Motion
- **搜索**: Orama（Fumadocs 内置）

### 模块注册表（核心架构）

`lib/modules/registry.ts` 是单一数据源，驱动导航栏、首页、路由、未来 CMS 配置。增删内容模块只需改这一个文件。

```
lib/modules/
├── types.ts              ← ModuleDefinition 类型
└── registry.ts           ← 模块注册表（blog, projects）
```

### 路由架构

- `app/[module]/` — **通用动态路由**，替代了原来 blog/projects 的独立路由
- `app/docs/[[...slug]]/` — 独立路由（DocsLayout + TOC + GitHub 链接，复杂度高）
- `app/(home)/` — 首页，数据驱动渲染（遍历 registry 中的 featured 模块）

### 关键流程

新增一个内容模块（如 Talks）：
1. `source.config.ts` — 新增 collection 定义
2. `lib/source.ts` — 新增 loader（如 talksSource）
3. `lib/shared.ts` — 新增路由常量
4. `lib/modules/registry.ts` — 新增一条记录（导航、首页、详情页全自动生效）

### 关键文件职责

- `lib/config.ts` — 站点元信息 + 首页 Areas 配置
- `lib/shared.ts` — 路由常量
- `lib/layout.shared.tsx` — 共享布局选项，导航从 registry 自动生成
- `lib/source.ts` — 内容 loader + 工具函数
- `lib/modules/registry.ts` — 模块注册表（核心）
- `source.config.ts` — Fumadocs MDX schema 定义
- `components/home/module-section.tsx` — 通用首页模块展示组件
- `components/mdx.tsx` — MDX 组件扩展点

### 内容 Schema

blog: pageSchema + author, date, tags
projects: pageSchema + tech[], status (active/completed/archived)
docs: pageSchema（无扩展）
