import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lang = pathname.split('/')[1];

  const response = NextResponse.next();
  if (['ru', 'en'].includes(lang)) {
    response.cookies.set('lang', lang, { path: '/' });
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|static|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
