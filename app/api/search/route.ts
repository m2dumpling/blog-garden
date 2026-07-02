import { source, blogSource, projectsSource } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

/**
 * 统一搜索 API — 索引 docs + blog + projects 全部内容
 */
export const { GET } = createSearchAPI('simple', {
  language: 'english',
  async indexes() {
    const allPages = [
      ...source.getPages(),
      ...blogSource.getPages(),
      ...projectsSource.getPages(),
    ];

    const items = await Promise.all(
      allPages.map(async (page) => {
        // 提取 MDX 处理后的纯文本（搜索核心依据）
        let text = '';
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof (page.data as any).getText === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            text = await (page.data as any).getText('processed');
          }
        } catch {
          // 忽略无文本提取能力的页面
        }

        return {
          title: page.data.title,
          description: page.data.description ?? '',
          url: page.url,
          content: text || page.data.description || '',
          keywords: '',
          breadcrumbs: [] as string[],
        };
      }),
    );

    return items;
  },
});
