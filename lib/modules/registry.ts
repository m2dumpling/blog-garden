import { blogSource, projectsSource } from '@/lib/source';
import { blogRoute, projectsRoute } from '@/lib/shared';
import type { ModuleDefinition, ModuleSource } from './types';

/** 所有内容模块的注册表 — 单一数据源，增删模块只改这里 */
export const moduleRegistry: Record<string, ModuleDefinition> = {
  blog: {
    name: 'blog',
    route: blogRoute,
    label: 'Blog',
    description: '学习笔记和技术思考',
    source: blogSource as unknown as ModuleSource,
    homepage: { featured: true, maxItems: 3 },
    detail: { showDate: true, showAuthor: true, showTags: true },
  },
  projects: {
    name: 'projects',
    route: projectsRoute,
    label: 'Projects',
    description: '项目展示',
    source: projectsSource as unknown as ModuleSource,
    homepage: { featured: true, maxItems: 3 },
    detail: { showTech: true, showStatus: true },
  },
};

/** 获取所有可导航的模块（按注册顺序） */
export function getNavModules(): ModuleDefinition[] {
  return Object.values(moduleRegistry);
}

/** 获取首页需要展示的模块 */
export function getFeaturedModules(): ModuleDefinition[] {
  return Object.values(moduleRegistry).filter((m) => m.homepage?.featured);
}
