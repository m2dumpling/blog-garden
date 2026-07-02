[中文](#chinese)

# Dumpling's Tech Site

Personal tech site built with **Next.js 16 + Fumadocs 16 + Tailwind CSS 4**.

## What's Inside

- **Blog** — Notes on AI, Rust, backend engineering
- **Projects** — Portfolio with tech stacks and status
- **Knowledge Base** — Hierarchical documentation with tree sidebar
- **Decap CMS** — Web-based content management at `/admin`
- **Full-text Search** — Orama-powered search across all modules
- **LLM-friendly** — `/llms.txt` and `/llms-full.txt` endpoints

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Content | Fumadocs 16 (MDX) |
| Styling | Tailwind CSS 4 |
| Animation | Motion |
| Search | Orama |
| CMS | Decap CMS |

## Quick Start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
```

### CMS (Local)

```bash
npx decap-server        # start local proxy
# Open http://localhost:3000/admin/index.html
```

## Architecture

```
lib/modules/registry.ts   ← Single source of truth for all content modules
app/[module]/             ← Dynamic route for blog, projects, future modules
app/docs/[[...slug]]/     ← Knowledge base with tree sidebar + TOC
lib/tree.ts               ← Auto-generated sidebar from registry
```

Adding a new module: edit `source.config.ts` + `lib/source.ts` + `lib/modules/registry.ts`.

## Deploy

Push to GitHub → Import to [Vercel](https://vercel.com) → Done.

---

<a id="chinese"></a>

# Dumpling 的技术站

基于 **Next.js 16 + Fumadocs 16 + Tailwind CSS 4** 构建的个人技术站点。

## 包含什么

- **博客** — AI、Rust、后端工程笔记
- **项目** — 作品展示，含技术栈与状态
- **知识库** — 层级文档，左侧树形导航 + 右侧 TOC
- **Decap CMS** — 网页端内容管理，入口 `/admin`
- **全文搜索** — 覆盖博客、项目、知识库全部内容
- **LLM 友好** — `/llms.txt` 和 `/llms-full.txt` 接口

## 技术栈

| 层 | 选型 |
|-------|--------|
| 框架 | Next.js 16 (App Router) |
| 内容 | Fumadocs 16 (MDX) |
| 样式 | Tailwind CSS 4 |
| 动画 | Motion |
| 搜索 | Orama |
| CMS | Decap CMS |

## 快速开始

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 生产构建
```

### 本地 CMS

```bash
npx decap-server        # 启动本地代理
# 打开 http://localhost:3000/admin/index.html
```

## 架构

```
lib/modules/registry.ts   ← 模块注册表，单一数据源
app/[module]/             ← 动态路由，承载 blog/projects 等模块
app/docs/[[...slug]]/     ← 知识库，树形侧边栏 + TOC
lib/tree.ts               ← 从注册表自动生成侧边栏
```

新增模块只需改三个文件：`source.config.ts` + `lib/source.ts` + `lib/modules/registry.ts`。

## 部署

推送至 GitHub → 导入 [Vercel](https://vercel.com) → 完成。
