[English](README.md)

# Digital Garden（数字花园）

> 个人技术站 — 博客 · 项目 · 知识库 · CMS。
> 开箱即用，几分钟部署。

基于 **Next.js 16 + Fumadocs 16 + Tailwind CSS 4** 构建。

## 亮点

- 📝 **博客** — MDX 写作，标签、日期、全文搜索
- 🔧 **项目** — 作品展示，技术栈标签 + 状态标记
- 📚 **知识库** — 层级文档，侧边栏树 + TOC 目录
- ✍️ **CMS** — Decap CMS，浏览器里写文章（`/admin`）
- 🔍 **搜索** — Orama 全文搜索，覆盖全部模块
- 🤖 **LLM** — `/llms.txt` 和 `/llms-full.txt`，供 AI 消费

## 快速开始

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm build        # 生产构建
```

### 本地 CMS

在 `public/admin/config.yml` 中加一行 `local_backend: true`，然后：

```bash
npx decap-server
open http://localhost:3000/admin
```

## 架构

```
lib/modules/registry.ts   ← 模块注册表，增删模块的唯一入口
app/[module]/             ← 动态路由（blog、projects 等）
app/docs/                 ← 知识库，侧边栏 + TOC
```

**新增模块：** `source.config.ts` → `lib/source.ts` → `lib/modules/registry.ts`。导航、侧边栏、首页自动生效。

## 部署

导入 [Vercel](https://vercel.com) → 完成。零配置。

可选：配置 [GitHub OAuth](https://github.com/settings/developers) 解锁 `/admin` 的 CMS 编辑功能。不配也不影响网站正常运行。

## 安全

| 措施 | 说明 |
|---------|--------|
| CMS 鉴权 | GitHub OAuth — 仅仓库协作者可编辑 |
| Admin 路径 | 可选 Basic Auth，通过 `ADMIN_USER` / `ADMIN_PASS` 环境变量开关 |
| HTTP 头 | `X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy`、`Permissions-Policy` |
| 外部链接 | 所有外链带 `rel="noreferrer"` |
| 基础设施 | 纯静态站点，无数据库 — 攻击面天然小 |

## 协议

MIT — fork、修改、部署你自己的。
