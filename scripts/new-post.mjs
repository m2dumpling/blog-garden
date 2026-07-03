#!/usr/bin/env node
/**
 * 文章脚手架 — 一键创建 MDX 文件
 *
 * 用法:
 *   pnpm new blog "My Post Title"
 *   pnpm new project "My Project"
 *   pnpm new doc "Getting Started"
 *
 * 生成 content/{module}/{slug}.mdx，预填 frontmatter
 */

import { writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const VALID_MODULES = ['blog', 'project', 'doc'];

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('用法: pnpm new <blog|project|doc> <title>');
  console.log('示例: pnpm new blog "我的第一篇文章"');
  process.exit(1);
}

const [module, ...titleParts] = args;
const title = titleParts.join(' ');

if (!VALID_MODULES.includes(module)) {
  console.error(`错误: module 必须是 ${VALID_MODULES.join(', ')} 之一，收到 "${module}"`);
  process.exit(1);
}

// 映射: "project" → "projects" (folder name)
const folderMap = { blog: 'blog', project: 'projects', doc: 'docs' };
const folder = folderMap[module];

// 生成 slug（仅 ASCII，中文标题用日期作文件名）
let slug = title
  .trim()
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')   // 只保留英文、数字、空格、连字符
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

if (!slug) {
  // 纯中文标题 → 用日期作 slug
  slug = today.replace(/-/g, '');
}

// 今天日期
const today = new Date().toISOString().slice(0, 10);

// 构建 frontmatter
let frontmatter = '';
if (module === 'blog') {
  frontmatter = `---
title: "${title}"
description: ""
author: "Dumpling"
date: "${today}"
tags: []
---

`;
} else if (module === 'project') {
  frontmatter = `---
title: "${title}"
description: ""
tech: []
status: "active"
---

`;
} else {
  frontmatter = `---
title: "${title}"
description: ""
---

`;
}

const content = frontmatter + `开始写作…\n`;
const filePath = join(ROOT, 'content', folder, `${slug}.mdx`);

if (existsSync(filePath)) {
  console.error(`错误: 文件已存在 — ${filePath}`);
  process.exit(1);
}

writeFileSync(filePath, content, 'utf-8');
console.log(`✅ 已创建: content/${folder}/${slug}.mdx`);
console.log(`   标题: ${title}`);
