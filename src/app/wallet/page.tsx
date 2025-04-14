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
      <div className="relative inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#8A2BE2]/20 to-[#00BFFF]/20 blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-[#00BFFF]/10 to-[#8A2BE2]/10 blur-3xl" />
      </div>
      <WalletProvider>
        <div className="flex h-fit bg-gray-900">
          <WalletSidebar />
          <div className="flex-1 h-fit overflow-auto">
            <WalletDashboard />
          </div>
        </div>
      </WalletProvider>
    </Suspense>
  );
}
