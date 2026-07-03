import { NextRequest } from 'next/server';

/**
 * GitHub OAuth 回调代理
 *
 * Decap CMS GitHub 后端依赖外部 OAuth 服务。本路由充当这个代理：
 * 1. 用户点击登录 → CMS 打开 GitHub 授权页
 * 2. GitHub 回调带 code → 本路由用 code 换 token
 * 3. 返回 token 给 CMS 页面（postMessage）
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  // 用 code 换 GitHub access token
  const clientId = process.env.OAUTH_CLIENT_ID || '';
  const clientSecret = process.env.OAUTH_CLIENT_SECRET || '';

  const tokenRes = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    },
  );

  const tokenData = (await tokenRes.json()) as Record<string, string>;

  if (tokenData.error) {
    return new Response(
      `OAuth error: ${tokenData.error} — ${tokenData.error_description || ''}`,
      { status: 400 },
    );
  }

  // 把 token 传回 CMS 页面
  const html = `<!doctype html>
<html><head><script>
  window.opener.postMessage(
    ${JSON.stringify({ token: tokenData.access_token, provider: 'github', state })},
    window.location.origin
  );
  window.close();
</script></head></html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
