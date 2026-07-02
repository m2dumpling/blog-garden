import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

/** 首页 — 无侧边栏，全宽落地页 */
export default function HomePageLayout({ children }: LayoutProps<'/'>) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
