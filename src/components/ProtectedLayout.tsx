'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/wallet',
  '/stores',
  '/analysis',
  '/market',
  '/cards',
  '/transfer',
  '/settings'
];

// Routes where navigation should be hidden
const hideNavigationRoutes = [
  '/login',
  '/signup',
  '/home'
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to home if accessing protected route without auth
    if (!loading && !user && protectedRoutes.includes(pathname)) {
      router.push('/home');
    }
    // Redirect to home if accessing auth routes while logged in
    if (!loading && user && hideNavigationRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [user, loading, router, pathname]);

  // If still loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Hide navigation on auth routes
  if (hideNavigationRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  // Always render children, even if sidebar is not shown
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          {pathname.startsWith('/dashboard') || pathname.startsWith('/wallet') || pathname.startsWith('/stores') || pathname.startsWith('/analysis') || pathname.startsWith('/market') || pathname.startsWith('/cards') || pathname.startsWith('/transfer') || pathname.startsWith('/settings') ? <Sidebar /> : null}
          <div className={`flex-1 transition-all duration-300 ${pathname.startsWith('/dashboard') || pathname.startsWith('/wallet') || pathname.startsWith('/stores') || pathname.startsWith('/analysis') || pathname.startsWith('/market') || pathname.startsWith('/cards') || pathname.startsWith('/transfer') || pathname.startsWith('/settings') ? 'ml-64' : 'ml-0'}`}>
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
