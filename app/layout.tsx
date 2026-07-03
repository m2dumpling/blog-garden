import { RootProvider } from 'fumadocs-ui/provider/next';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}