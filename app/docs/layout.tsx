import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { getSidebarTree } from '@/lib/tree';

export default function DocsLayoutWrapper({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={getSidebarTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
