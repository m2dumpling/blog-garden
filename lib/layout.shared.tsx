import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

/** 全局共享布局选项 — 所有页面使用 DocsLayout + 侧边栏树 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}