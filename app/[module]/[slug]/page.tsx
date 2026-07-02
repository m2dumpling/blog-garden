import { notFound } from 'next/navigation';
import { moduleRegistry } from '@/lib/modules/registry';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';

type Props = { params: Promise<{ module: string; slug: string }> };

export default async function ModuleDetailPage({ params }: Props) {
  const { module, slug } = await params;
  const mod = moduleRegistry[module];
  if (!mod) notFound();

  const page = mod.source.getPage([slug]);
  if (!page) notFound();

  const MDX = page.data.body as ComponentType<Record<string, unknown>>;
  const { data } = page;
  const tags: string[] = Array.isArray(data.tags) ? (data.tags as string[]) : [];
  const techs: string[] = Array.isArray(data.tech) ? (data.tech as string[]) : [];
  const showMeta = mod.detail?.showDate || mod.detail?.showAuthor;
  const showTags = mod.detail?.showTags && tags.length > 0;
  const showTech = mod.detail?.showTech && techs.length > 0;
  const showStatus = mod.detail?.showStatus && !!data.status;

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{page.data.title}</h1>
      <p className="text-muted-foreground mb-6">{page.data.description}</p>

      {showMeta ? (
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
          {mod.detail?.showDate ? <span>{data.date as string}</span> : null}
          {mod.detail?.showAuthor ? (
            <>
              {mod.detail?.showDate ? <span>·</span> : null}
              <span>{data.author as string}</span>
            </>
          ) : null}
        </div>
      ) : null}

      {showTags ? (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tags.map((t) => <span key={t} className="tag-pill">{t}</span>)}
        </div>
      ) : null}

      {showTech ? (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {techs.map((t) => (
            <span key={t} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">{t}</span>
          ))}
        </div>
      ) : null}

      {showStatus ? (
        <span className="inline-block text-xs bg-secondary px-2 py-0.5 rounded-md mb-6">
          {data.status as string}
        </span>
      ) : null}

      <div className="max-w-none">
        <MDX components={getMDXComponents() as Record<string, ComponentType<unknown>>} />
      </div>
    </div>
  );
}

export function generateStaticParams(): { module: string; slug: string }[] {
  const result: { module: string; slug: string }[] = [];
  for (const [name, mod] of Object.entries(moduleRegistry)) {
    for (const p of mod.source.generateParams()) {
      result.push({ module: name, slug: p.slug[0] });
    }
  }
  return result;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module, slug } = await params;
  const mod = moduleRegistry[module];
  if (!mod) return { title: 'Not Found' };
  const page = mod.source.getPage([slug]);
  if (!page) return { title: 'Not Found' };
  return { title: page.data.title, description: page.data.description };
}
