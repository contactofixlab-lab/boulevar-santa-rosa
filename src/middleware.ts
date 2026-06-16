import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only intercept root path
  if (pathname === '/') {
    const session = request.cookies.get('iencinas_session');

    if (session) {
      try {
        const user = JSON.parse(session.value);
        const defaultRoutes: Record<string, string> = {
          finanzas: '/dashboard/finanzas',
          comercial: '/dashboard/comercial',
          marketing: '/dashboard/marketing',
          administrador: '/dashboard/finanzas',
        };
        const redirect = defaultRoutes[user.role] || '/dashboard/finanzas';
        return NextResponse.redirect(new URL(redirect, request.url));
      } catch {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
  ],
};
