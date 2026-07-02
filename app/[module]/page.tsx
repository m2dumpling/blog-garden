import Link from 'next/link';
import { notFound } from 'next/navigation';
import { moduleRegistry } from '@/lib/modules/registry';
import type { Metadata } from 'next';

type Props = { params: Promise<{ module: string }> };

export default async function ModuleListPage({ params }: Props) {
  const { module } = await params;
  const mod = moduleRegistry[module];
  if (!mod) notFound();

  const pages = mod.source.getPages();

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{mod.label}</h1>
      <p className="text-muted-foreground mb-8">{mod.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <Link
            key={page.url}
            href={page.url}
            className="border rounded-lg p-5 hover:bg-accent transition-colors"
          >
            <h3 className="text-lg font-semibold">{page.data.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
              {page.data.description}
            </p>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-muted-foreground">
              {mod.detail?.showDate && (
                <>
                  <span>{page.data.date as string}</span>
                  <span>·</span>
                </>
              )}
              {mod.detail?.showAuthor && <span>{page.data.author as string}</span>}
              {mod.detail?.showTech && (
                <div className="flex flex-wrap gap-1.5 w-full mt-1">
                  {(page.data.tech as string[])?.map((t: string) => (
                    <span key={t} className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams(): { module: string }[] {
  return Object.keys(moduleRegistry).map((name) => ({ module: name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module } = await params;
  const mod = moduleRegistry[module];
  if (!mod) return { title: 'Not Found' };
  return { title: mod.label, description: mod.description };
}
