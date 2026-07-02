/**
 * 扫描 content/ 下各模块目录，自动生成 meta.json
 *
 * 使用方式: node scripts/generate-meta.mjs
 * 在 postinstall / prebuild 中自动运行
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content');

// 需要配置 meta.json 的模块目录
const MODULES = ['blog', 'projects', 'docs'];

for (const name of MODULES) {
  const dir = join(CONTENT_DIR, name);
  if (!existsSync(dir)) continue;

  const files = readdirSync(dir).filter(
    (f) => f.endsWith('.mdx'),
  );

  // 去掉 .mdx 后缀得到 slug
  const slugs = files.map((f) => f.replace(/\.mdx$/, ''));

  const metaPath = join(dir, 'meta.json');
  const existing = existsSync(metaPath)
    ? JSON.parse(readFileSync(metaPath, 'utf-8'))
    : {};

  // 保留已有的自定义属性（如 title 覆盖、icon 等），
  // 但 pages 数组始终与文件系统同步
  const next = {
    ...existing,
    pages: slugs,
  };

  writeFileSync(metaPath, JSON.stringify(next, null, 2) + '\n');
  console.log(`✓ ${name}/meta.json → ${slugs.length} pages`);
}

console.log('Done.');
