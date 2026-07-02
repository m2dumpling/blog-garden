import type { ComponentType } from 'react';

/** 首页展示配置 */
export interface ModuleHomepageConfig {
  featured: boolean;
  maxItems: number;
}

/** 详情页显示配置 */
export interface ModuleDetailConfig {
  showDate?: boolean;
  showAuthor?: boolean;
  showTags?: boolean;
  showTech?: boolean;
  showStatus?: boolean;
}

/** fumadocs 内容页的最小接口 — 消掉 `any` */
export interface ContentPage {
  url: string;
  slugs: string[];
  data: {
    title: string;
    description?: string;
    body?: ComponentType;
    [key: string]: unknown;
  };
}

/** fumadocs source loader 的最小接口 */
export interface ModuleSource {
  getPages: () => ContentPage[];
  getPage: (slugs: string[]) => ContentPage | undefined;
  generateParams: () => Array<{ slug: string[] }>;
}

/** 单个模块的完整定义 */
export interface ModuleDefinition {
  name: string;
  route: string;
  label: string;
  description: string;
  source: ModuleSource;
  homepage?: ModuleHomepageConfig;
  detail?: ModuleDetailConfig;
}
