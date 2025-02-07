'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import StockMarket from '@/components/StockMarket';

export default function StocksPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#13141B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8A2BE2]"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#13141B] p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Stocks</h2>
      <div className="bg-[#1A1B23] rounded-lg shadow-xl p-6">
        <StockMarket />
      </div>
    </div>
  );
}
