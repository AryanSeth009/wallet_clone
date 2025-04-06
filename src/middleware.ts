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
      signIn: '/home',  // Redirect to home when not authenticated
      error: '/home'    // Also redirect to home on error
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login
     * - signup
     * - home
     * - root path (/)
     */
    '/home',
    '/dashboard/:path*',
    '/settings/:path*',
    '/wallet/:path*',
    '/stocks/:path*',
    '/protected',
    '/protected/:path*'
  ],
};
