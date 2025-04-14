'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Routes that should show navbar
  const navbarRoutes = [
    '/dashboard',
    '/wallet',
    '/marketplace',
    '/transactions',
    '/cards',
    '/transfer',
    '/profile'
  ];
  
  // Hide navbar on root, login, signup, home routes, or if not authenticated
  if (pathname === '/' || 
      pathname === '/login' || 
      pathname === '/signup' || 
      pathname === '/home' ||
      !session) {
    return null;
  }

  // Check if current route should show navbar
  const shouldShowNavbar = pathname ? navbarRoutes.some(route => pathname.startsWith(route)) : false;

  return shouldShowNavbar ? (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>
  ) : null;
}
