[English](README.md)

# Blog Garden（博客花园）

> 个人技术站 — 博客 · 项目 · 知识库。
> 本地写文章，push 即部署。

基于 **Next.js 16 + Fumadocs 16 + Tailwind CSS 4** 构建。

## 快速开始

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm build        # 生产构建
```

## 写文章

```bash
pnpm new blog "我的文章标题"       # 创建新博客
pnpm new project "我的项目"        # 创建新项目
pnpm new doc "入门指南"            # 创建新文档
```

编辑生成的 `.mdx` 文件 → `git push` → 自动部署上线。

## 架构

```
lib/modules/registry.ts   ← 模块注册表，增删模块的唯一入口
app/[module]/             ← 动态路由（blog、projects 等）
app/docs/                 ← 知识库，侧边栏 + TOC
```

**新增模块：** `source.config.ts` → `lib/source.ts` → `lib/modules/registry.ts`。导航、侧边栏、首页自动生效。

## 部署

导入 [Vercel](https://vercel.com) → 完成。零配置。

## 安全

| 措施 | 说明 |
|------|------|
| HTTP 头 | `X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy`、`Permissions-Policy` |
| 外部链接 | 所有外链带 `rel="noreferrer"` |
| 基础设施 | 纯静态站点，无数据库 — 攻击面天然小 |

## 协议

MIT — fork、修改、部署你自己的。
