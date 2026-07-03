[中文](README.zh-CN.md)

# Blog Garden

> Personal tech site — blog · projects · knowledge base.
> Write locally, push to deploy.

Built with **Next.js 16 + Fumadocs 16 + Tailwind CSS 4**.

## Quick Start

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm build        # production build
```

## Writing

```bash
pnpm new blog "My Post Title"       # scaffold a new blog post
pnpm new project "My Project"       # scaffold a new project
pnpm new doc "Getting Started"      # scaffold a new doc page
```

Edit the generated `.mdx` file → `git push` → auto deploy.

## Architecture

```
lib/modules/registry.ts   ← single source of truth for all modules
app/[module]/             ← dynamic route (blog, projects, …)
app/docs/                 ← knowledge base with sidebar + TOC
```

**Adding a module:** `source.config.ts` → `lib/source.ts` → `lib/modules/registry.ts`. Nav, sidebar, and homepage update automatically.

## Deploy

Import to [Vercel](https://vercel.com) → done. Zero config.

## Security

| Measure | Detail |
|---------|--------|
| HTTP headers | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` |
| External links | `rel="noreferrer"` on all outbound anchors |
| Infrastructure | Static site, no database — minimal attack surface |

## License

MIT — fork, modify, deploy your own.
