'use client';

import React from 'react';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/solid';

interface Asset {
  name: string;
  symbol: string;
  balance: string;
  icon: string;
}

const SAMPLE_ASSETS: Asset[] = [
  {
    name: 'BITCOIN',
    symbol: 'BTC',
    balance: '1.39656434',
    icon: '/crypto-icons/btc.svg'
  },
  {
    name: 'SHARD',
    symbol: 'SHARD',
    balance: '122.23456',
    icon: '/crypto-icons/shard.svg'
  },
  {
    name: 'ETHEREUM',
    symbol: 'ETH',
    balance: '31.524765',
    icon: '/crypto-icons/eth.svg'
  },
  {
    name: 'METRIX',
    symbol: 'MRX',
    balance: '0.5846577',
    icon: '/crypto-icons/mrx.svg'
  },
  {
    name: 'BINANCE COIN',
    symbol: 'BNB',
    balance: '17.7564456',
    icon: '/crypto-icons/bnb.svg'
  }
];

const WalletAssets = () => {
  return (
    <div className="bg-[#1E1E2F] rounded-lg p-4 space-y-4">
      {SAMPLE_ASSETS.map((asset, index) => (
        <div
          key={asset.symbol}
          className="flex items-center space-x-4 p-3 hover:bg-gray-800/50 rounded-lg transition-all cursor-pointer"
        >
          <div className="w-8 h-8 relative">
            <Image
              src={asset.icon}
              alt={asset.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white font-medium">
                  {asset.name} <span className="text-gray-400">({asset.symbol})</span>
                </span>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{asset.balance} {asset.symbol}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button className="w-full mt-4 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
        <PlusIcon className="w-5 h-5" />
        <span>Add asset</span>
      </button>
    </div>
  );
};

export default WalletAssets;
