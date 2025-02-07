'use client';

import { usePathname } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  // Routes that should show sidebar
  const sidebarRoutes = [
    '/dashboard',
    '/wallet',
    '/stores',
    '/stocks',
    '/cards',
    '/transfer',
    '/profile'
  ];

  // Public routes that don't require authentication
  const publicRoutes = [
    '/home',
    '/login', 
    '/signup'
  ];
  
  // Determine background based on route
  const getBackgroundClass = () => {
    if (pathname === '/home') return 'bg-[#0A0B0F]';
    return 'bg-[#13141B]';
  };

  // Detailed sidebar logic
  const isOnSidebarRoute = sidebarRoutes.some(route => pathname.startsWith(route));
  const showSidebar = isOnSidebarRoute && status === 'authenticated';

  useEffect(() => {
    // Aggressive timeout and force authentication check
    const timer = setTimeout(() => {
      console.error('Authentication loading timeout');
      setIsInitialLoadComplete(true);
      setLoadingTimeout(true);
      
      // Force sign in if still loading
      if (status === 'loading') {
        console.error('Forcing sign-in check');
        signIn('credentials', { 
          redirect: false, 
          callbackUrl: pathname 
        });
      }
    }, 2000);

    return () => clearTimeout(timer);

  }, [status, pathname]);

  useEffect(() => {
    console.log('ClientLayout Comprehensive Debug:', {
      pathname,
      status,
      sessionData: session ? JSON.stringify(session) : 'No session',
      isOnSidebarRoute,
      showSidebar,
      isAuthenticated: status === 'authenticated',
      isInitialLoadComplete,
      loadingTimeout,
      publicRoutes: publicRoutes.includes(pathname),
      unauthenticated: status === 'unauthenticated'
    });
  }, [pathname, status, session, isInitialLoadComplete, loadingTimeout]);

  // Render content for all scenarios
  const renderContent = () => {
    // Force render for public routes or after loading timeout
    if (publicRoutes.includes(pathname) || 
        status === 'unauthenticated' || 
        loadingTimeout ||
        status !== 'loading') {
      return (
        <div className={`min-h-screen ${getBackgroundClass()} `}>
          <div className="flex">
            {/* Conditionally render sidebar only for authenticated routes */}
            {status === 'authenticated' && showSidebar && (
              <aside className="fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-[#1A1B23] z-40">
                <Sidebar />
              </aside>
            )}
            <main className={`flex-1 ${status === 'authenticated' && showSidebar ? 'ml-72' : ''}`}>
              {children}
            </main>
          </div>
        </div>
      );
    }

    // Loading state with more detailed information
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#13141B]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          {/* <p className="text-white">Loading authentication...</p>
          <p className="text-gray-400 mt-2 text-center">
            Pathname: {pathname}
            <br />
            Status: {status}
            <br />
            Session: {session ? 'Exists' : 'Not Found'}
          </p> */}
        </div>
      </div>
    );
  };

  return renderContent();
}
