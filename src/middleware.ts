import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { cookieName, fallbackLng, languages } from '@/lib/i18n';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export function middleware(req: NextRequest): NextResponse {
  const response = NextResponse.next();
  const reqLang = req.nextUrl.pathname.split('/')[1];
  const pastLang = req.cookies.get(cookieName)?.value ?? fallbackLng;
  const isLanguageSupported = languages.includes(reqLang);

  // set x-pathname header
  response.headers.set('x-pathname', req.nextUrl.pathname);

  // set cookie
  if (!isLanguageSupported) {
    return NextResponse.redirect(new URL(`/${pastLang}`, req.url));
  }

  response.cookies.set(cookieName, reqLang);

  return response;
}
