'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ModuleDefinition, ContentPage } from '@/lib/modules/types';

function ItemCard({
  page,
  detail,
  index,
}: {
  page: ContentPage;
  detail: ModuleDefinition['detail'];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={page.url}
        className="article-card group flex items-start justify-between gap-4 border rounded-xl p-5 hover:bg-accent/30 transition-all duration-300"
      >
        <div className="min-w-0">
          <h3 className="font-semibold text-[15px] group-hover:text-fd-primary transition-colors">
            {page.data.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {page.data.description}
          </p>

          {(detail?.showDate || detail?.showAuthor) && (
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              {detail.showDate && <span>{page.data.date as string}</span>}
              {detail.showDate && detail.showAuthor && <span>·</span>}
              {detail.showAuthor && <span>{page.data.author as string}</span>}
            </div>
          )}

          {detail?.showTech && (page.data.tech as string[])?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(page.data.tech as string[]).map((t: string) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          )}
        </div>
        <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 text-muted-foreground/40 group-hover:text-fd-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </Link>
    </motion.div>
  );
}

export function ModuleSection({
  module: mod,
  pages,
}: {
  module: ModuleDefinition;
  pages: ContentPage[];
}) {
  if (pages.length === 0) return null;

  return (
    <section className="border-t">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h2 className="section-heading section-heading-underline">{mod.label}</h2>
            <p className="text-muted-foreground mt-3">{mod.description}</p>
          </div>
          <Link
            href={mod.route}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-fd-primary hover:underline"
          >
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-3">
          {pages.map((page, i) => (
            <ItemCard key={page.url} page={page} detail={mod.detail} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
