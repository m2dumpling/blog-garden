[中文](#chinese)

# Digital Garden

A personal tech site — blog, projects, knowledge base, and CMS. Built with **Next.js 16 + Fumadocs 16 + Tailwind CSS 4**. Anyone can fork and deploy their own.

## What's Inside

- **Blog** — Notes on AI, Rust, backend engineering (MDX)
- **Projects** — Portfolio with tech stacks and status
- **Knowledge Base** — Hierarchical docs with tree sidebar + TOC
- **Decap CMS** — Web-based content editing at `/admin`
- **Full-text Search** — Orama-powered, across all modules
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
npx decap-server        # proxy for local auth
# Open http://localhost:3000/admin/index.html
```

## Architecture

```
lib/modules/registry.ts   ← Single source of truth — add modules here
app/[module]/             ← Dynamic routes (blog, projects, future modules)
app/docs/[[...slug]]/     ← Knowledge base (tree sidebar + TOC)
lib/tree.ts               ← Auto-generated sidebar from registry
app/api/search/           ← Unified search across all content
```

Adding a new content module: edit `source.config.ts` + `lib/source.ts` + `lib/modules/registry.ts`. Navigation, sidebar, and homepage update automatically.

## Deploy

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Done — auto-deploys on every push

### Pre-deploy Checklist

- [ ] Delete `local_backend: true` from `public/admin/config.yml`
- [ ] Set env vars in Vercel: `ADMIN_USER` / `ADMIN_PASS` (optional, adds Basic Auth to `/admin`)
- [ ] Register a [GitHub OAuth App](https://github.com/settings/developers) and fill `client_id` in `public/admin/config.yml`
- [ ] Vercel auto-provisions HTTPS — no extra step needed

## Security

| Measure | Where |
|---------|-------|
| `/admin` path | Basic Auth middleware (`proxy.ts`) + Decap CMS GitHub OAuth |
| HTTP headers | `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy` |
| HTTPS | Vercel enforces TLS by default |
| External links | `rel="noreferrer"` on all outbound `<a>` tags |
| Static site | No database, no user input forms — minimal attack surface |
| CMS auth | GitHub OAuth → only repo collaborators can edit content |

> **Important:** Never deploy with `local_backend: true`. It bypasses all authentication. The config file has a warning comment — read it before pushing.

## Customize It

1. Fork this repo
2. Edit `lib/config.ts` — your name, GitHub, homepage areas
3. Edit `content/` — replace sample posts with your own
4. Edit `public/admin/config.yml` — your repo path and OAuth settings
5. Deploy

---

<a id="chinese"></a>

# Digital Garden（数字花园）

基于 **Next.js 16 + Fumadocs 16 + Tailwind CSS 4** 的个人技术站。可直接 fork 部署。

## 包含什么

- **博客** — AI、Rust、后端工程笔记（MDX）
- **项目** — 作品展示，含技术栈与状态
- **知识库** — 层级文档，树形侧边栏 + TOC 目录
- **Decap CMS** — 网页端内容管理，入口 `/admin`
- **全文搜索** — 覆盖博客、项目、知识库
- **LLM 接口** — `/llms.txt` 和 `/llms-full.txt`

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
app/[module]/             ← 动态路由，承载 blog/projects 等
app/docs/[[...slug]]/     ← 知识库，树形侧边栏 + TOC
lib/tree.ts               ← 从注册表自动生成侧边栏
app/api/search/           ← 统一搜索，索引全部内容
```

新增模块只需改三个文件：`source.config.ts` + `lib/source.ts` + `lib/modules/registry.ts`，导航栏、侧边栏、首页全自动生效。

## 部署

1. 推送至 GitHub
2. 导入 [Vercel](https://vercel.com)
3. 完成 — 每次推送自动部署

### 部署前必做

- [ ] 删掉 `public/admin/config.yml` 里的 `local_backend: true`
- [ ] Vercel 环境变量中设置 `ADMIN_USER` / `ADMIN_PASS`（可选，给 `/admin` 加一层 Basic Auth）
- [ ] 去 [GitHub OAuth Apps](https://github.com/settings/developers) 注册，把 `client_id` 填入 `config.yml`
- [ ] HTTPS 由 Vercel 自动配置，无需额外操作

## 安全

| 措施 | 实现位置 |
|---------|-------|
| `/admin` 路径 | Basic Auth 中间件（`proxy.ts`）+ Decap CMS GitHub OAuth |
| HTTP 头 | `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy` |
| HTTPS | Vercel 默认强制 TLS |
| 外部链接 | 所有 `<a target="_blank">` 带 `rel="noreferrer"` |
| 静态站点 | 无数据库、无用户输入表单 — 攻击面极小 |
| CMS 鉴权 | GitHub OAuth → 只有仓库协作者能编辑 |

> **重要：** 生产环境绝对不能保留 `local_backend: true`，否则任何人打开 `/admin` 都能直接编辑内容。config 文件里有醒目的警告注释，部署前务必检查。

## 如何定制

1. Fork 本仓库
2. 编辑 `lib/config.ts` — 改名字、GitHub、技能区
3. 编辑 `content/` — 替换示例内容
4. 编辑 `public/admin/config.yml` — 改仓库路径和 OAuth 配置
5. 部署
