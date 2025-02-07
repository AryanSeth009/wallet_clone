'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useWalletStore } from '@/stores/walletStore';
import { getWalletColor, getWalletSymbol, getWalletIconPath } from '@/utils/walletHelpers';
import type { Wallet, Transaction } from '@/types/wallet';
import WalletChart from './WalletChart';
import WalletActions from './WalletActions';
import TransactionHistory from './TransactionHistory';
import CreateWalletModal from '../CreateWalletModal';
import ImportWalletModal from '../ImportWalletModal';
import WalletTransactions from './WalletTransactions';

const generateChartData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 10000) + 30000
    });
  }
  return data;
};


export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#1E2126] text-white">
    
      <div className="flex-1 flex flex-col">
       
        <main className="flex-1 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-2">
              <Image
                src="/bitcoin-icon.png"
                alt="Bitcoin"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">1.39856434 BTC</h1>
            <p className="text-xl text-gray-400">$1,334.53 USD</p>
            <div className="flex space-x-4 mt-6">
              <button className="flex items-center space-x-2 bg-[#2C3038] px-6 py-3 rounded-lg hover:bg-[#3C424C]">
                <ArrowUpToLine className="h-5 w-5 text-gray-100" />
                <span className="text-gray-100">Send</span>
              </button>
              <button className="flex items-center space-x-2 bg-[#2C3038] px-6 py-3 rounded-lg hover:bg-[#3C424C]">
                <ArrowDownToLine className="h-5 w-5 text-gray-100" />
                <span className="text-gray-100">Receive</span>
              </button>
              <button className="flex items-center space-x-2 bg-[#2C3038] px-6 py-3 rounded-lg hover:bg-[#3C424C]">
                <Repeat className="h-5 w-5 text-gray-100" />
                <span className="text-gray-100">Swap</span>
              </button>
            </div>
          </div>
          <div className="mb-8">
            <PriceChart />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                {["1 day", "1w", "1m", "3m", "1y"].map((period) => (
                  <button
                    key={period}
                    className={`px-4 py-2 text-sm ${period === '1 day' ? 'text-gray-100 bg-[#2C3038]' : 'text-gray-400'} rounded-lg hover:bg-[#2C3038]`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <div className="text-gray-400 text-sm">
                Friday, February 12th 2019
              </div>
            </div>
          </div>
          <TransactionHistory />
        </main>
      </div>
    </div>
  )
}

