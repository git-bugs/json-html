import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_LANGS = ['ru', 'en'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lang = pathname.split('/')[1];
  console.log(lang);
  console.log(VALID_LANGS.includes(lang));
  if (!VALID_LANGS.includes(lang)) {
    console.log(1);
    // return NextResponse.redirect(new URL('/test', request.url));
  }

  const response = NextResponse.next();
  if (['ru', 'en'].includes(lang)) {
    response.cookies.set('lang', lang, { path: '/' });
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|static|images|favicon.ico).*)'],
};
