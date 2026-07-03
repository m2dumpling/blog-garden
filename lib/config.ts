/** 全局配置中心 — 所有可插拔模块的开关与配置 */

export const siteConfig = {
  /** 站点名称 */
  name: 'Dumpling',
  /** 站点描述 */
  tagline: 'Stay hungry, stay foolish',
  /** 作者 */
  author: 'Dumpling',
  /** GitHub */
  github: {
    user: 'm2dumpling',
    repo: 'blog-garden',
    branch: 'main',
  },
} as const;

/** 首页 Area 技能区配置 */
export const areas = [
  {
    icon: '🤖',
    title: 'AI / LLM',
    items: ['MCP', 'Agent', 'RAG', 'Prompt Engineering', 'LLM Fine-tuning'],
  },
  {
    icon: '👁️',
    title: 'Computer Vision',
    items: ['YOLO11', 'Object Detection', 'Image Segmentation', 'Defect Detection'],
  },
  {
    icon: '☕',
    title: 'Backend',
    items: ['Java', 'Spring Boot', 'Redis', 'MySQL', 'System Design'],
  },
];