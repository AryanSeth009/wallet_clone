'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import WalletDashboard from '@/components/WalletDashboard';
import WalletSidebar from '@/components/WalletSidebar';
import { WalletProvider } from '@/context/WalletContext';

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="text-white">Loading...</div>
    </div>
  );
}

export default function WalletPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingFallback />;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <WalletProvider userId={session?.user?.id || ''}>
        <div className="flex h-screen bg-gray-900">
          <WalletSidebar />
          <div className="flex-1 overflow-auto">
            <WalletDashboard />
          </div>
        </div>
      </WalletProvider>
    </Suspense>
  );
}
