[中文](README.zh-CN.md)

# Digital Garden

> Personal tech site — blog · projects · knowledge base · CMS.
> Fork & deploy in minutes.

Built with **Next.js 16 + Fumadocs 16 + Tailwind CSS 4**.

## Highlights

- 📝 **Blog** — MDX posts with tags, dates, full-text search
- 🔧 **Projects** — Portfolio with tech stacks & status labels
- 📚 **Knowledge Base** — Hierarchical docs, tree sidebar, TOC
- ✍️ **CMS** — Decap CMS at `/admin`, edit content in browser
- 🔍 **Search** — Orama full-text search across all modules
- 🤖 **LLM** — `/llms.txt` and `/llms-full.txt` for AI consumption

## Quick Start

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm build        # production build
```

### CMS (local)

Add `local_backend: true` to `public/admin/config.yml`, then:

```bash
npx decap-server
open http://localhost:3000/admin
```

## Architecture

```
lib/modules/registry.ts   ← single source of truth for all modules
app/[module]/             ← dynamic route (blog, projects, …)
app/docs/                 ← knowledge base with sidebar + TOC
```

**Adding a module:** `source.config.ts` → `lib/source.ts` → `lib/modules/registry.ts`. Nav, sidebar, and homepage update automatically.

## Deploy

Import to [Vercel](https://vercel.com) → done. Zero config needed.

Optional: set up [GitHub OAuth](https://github.com/settings/developers) to unlock the CMS at `/admin`. Without it, the site is fully functional; the CMS login page simply won't authenticate anyone.

## Security

| Measure | Detail |
|---------|--------|
| CMS auth | GitHub OAuth — only repo collaborators can write |
| Admin path | Optional Basic Auth via `ADMIN_USER` / `ADMIN_PASS` env |
| HTTP headers | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` |
| External links | `rel="noreferrer"` on all outbound anchors |
| Infrastructure | Static site, no database — minimal attack surface |

## License

MIT — fork, modify, deploy your own.
