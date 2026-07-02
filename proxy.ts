import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

/** Basic Auth 保护 /admin 路径 */
function checkAdminAuth(request: NextRequest): NextResponse | null {
  if (!request.nextUrl.pathname.startsWith('/admin')) return null;

  // 跳过静态资源
  if (/\.(js|css|png|svg|ico|json)$/.test(request.nextUrl.pathname)) return null;

  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS;
  if (!pass) return null; // 未配置则放行

  const auth = request.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');

  if (auth === expected) return null;

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"' },
  });
}

export default function proxy(request: NextRequest) {
  const auth = checkAdminAuth(request);
  if (auth) return auth;

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}
