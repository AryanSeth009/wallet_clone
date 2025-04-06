'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TotalValueCard from '@/components/Dashboard/TotalValueCard';
import PriceChart from '@/components/Dashboard/PriceChart';
import AssetsList from '@/components/Dashboard/AssetsList';
import PriceAlert from '@/components/Dashboard/PriceAlert';
import TradeBox from '@/components/Dashboard/TradeBox';

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8A2BE2]"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const mockData = {
    totalValue: 128941.50,
    change: 1873.88,
    changePercentage: 20.87,
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', price: 26606.25, change: -0.05 },
      { symbol: 'ETH', name: 'Ethereum', price: 1631.20, change: 0.32 },
      { symbol: 'OKB', name: 'OKB', price: 42.58, change: -0.38 },
      { symbol: 'AVAX', name: 'Avalanche', price: 9.44, change: -0.68 },
      { symbol: 'TRX', name: 'Tron', price: 0.084, change: 1.32 },
    ]
  };

  return (
    <div className="h-screen-full bg-[#0A0B0F] p-10  relative">
      {/* Background Effects */}
      <div className="relative inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#8A2BE2]/20 to-[#00BFFF]/20 blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-[#00BFFF]/10 to-[#8A2BE2]/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TotalValueCard 
            totalValue={mockData.totalValue}
            change={mockData.change}
            changePercentage={mockData.changePercentage}
          />
          <div className="bg-[#13141B] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl p-6">
            <PriceChart />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#13141B] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl p-6">
            <PriceAlert />
          </div>
          <div className="bg-[#13141B] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl p-6">
            <TradeBox />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-[#13141B] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl p-6">
            <AssetsList assets={mockData.assets} />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Border */}
      {/* <div className="relative bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" /> */}
    </div>
  );
}
