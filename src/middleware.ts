import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to home, login, and signup routes without authentication
        const publicPaths = ['/home', '/login', '/signup'];
        if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
          return true;
        }
        
        // Require token for protected routes
        return !!token;
      },
    },
    pages: {
      signIn: '/home',
      error: '/home'
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/wallet/:path*',
    '/stocks/:path*',
    '/protected',
    '/protected/:path*'
  ],
};
