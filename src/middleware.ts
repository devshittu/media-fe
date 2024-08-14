import { NextRequest, NextResponse } from 'next/server';
import { privateRoutes } from './config/constants';

import { auth } from '@/auth';

// TIP: this is how we set up a middleware along with next-auth
export default auth((request: NextRequest) => {
  // @ts-ignore
  const { auth } = request;
  const { pathname } = request.nextUrl;

  const searchTerm = request.nextUrl.pathname.split('/').slice(0, 2).join('/');

  // TIP: this is how we can redirect unauthenticated users to login page
  if (privateRoutes.includes(searchTerm)) {
    const isLoggedIn = !!auth;

    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(
          `/auth/signin?callbackUrl=${encodeURIComponent(
            request.nextUrl.href,
          )}`,
          request.nextUrl,
        ),
      );
    }
  }

  // TIP: this is how we can redirect authenticated users to home page if they try to access login, forgot-password or signup pages
  if (
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/signup')
  ) {
    const isLoggedIn = !!auth;

    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/stories', request.nextUrl));
    }
  }

  // TIP: this is how we set custom headers to be used in our application
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: headers as Headers,
    },
  });
});
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// src/middleware.ts