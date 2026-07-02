import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/admin', destination: '/admin/index.html' },
    ];
  },
};

export default withMDX(config);
