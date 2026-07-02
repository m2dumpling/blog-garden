import { source } from './source';
import { moduleRegistry } from './modules/registry';
import type { Root } from 'fumadocs-core/page-tree';

/** 从注册表自动生成统一侧边栏树 — 新增模块无需改这里 */
export function getSidebarTree(): Root {
  const docsChildren = source.getPageTree().children;

  // 从 registry 自动生成每个模块的 folder 节点
  const moduleFolders = Object.values(moduleRegistry).map((mod) => ({
    type: 'folder' as const,
    name: mod.label,
    defaultOpen: false,
    children: mod.source.getPages().map((p) => ({
      type: 'page' as const,
      name: p.data.title,
      url: p.url,
    })),
  }));

  return {
    name: 'Dumpling',
    children: [
      ...moduleFolders,
      { type: 'separator' as const, name: 'Knowledge Base' },
      ...docsChildren,
      { type: 'separator' as const, name: 'More' },
      { type: 'page' as const, name: 'About', url: '/about' },
    ],
  };
}
