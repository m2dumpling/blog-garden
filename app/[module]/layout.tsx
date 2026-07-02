import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { getSidebarTree } from '@/lib/tree';
import { moduleRegistry } from '@/lib/modules/registry';
import { notFound } from 'next/navigation';

export default async function ModuleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  if (!moduleRegistry[module]) notFound();

  return (
    <DocsLayout tree={getSidebarTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
