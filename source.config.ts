import { defineConfig, defineDocs, defineCollections } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

// Docs 知识库
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Blog 博客
export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: pageSchema.extend({
      author: z.string().default('Dumpling'),
      date: z.string().default('2026-07-01'),
      tags: z.array(z.string()).default([]),
    }),
    postprocess: {
      includeProcessedMarkdown: true, // 搜索需要文本内容
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Projects 项目展示
export const projects = defineDocs({
  dir: 'content/projects',
  docs: {
    schema: pageSchema.extend({
      tech: z.array(z.string()).default([]),
      status: z.enum(['active', 'completed', 'archived']).default('active'),
    }),
    postprocess: {
      includeProcessedMarkdown: true, // 搜索需要文本内容
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});