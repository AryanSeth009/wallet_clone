'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import MetaMaskWallet with dynamic import to avoid hydration issues
const MetaMaskWallet = dynamic(() => import('@/components/MetaMaskWallet'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading MetaMask integration...</div>
});

export default function AdvancedWalletPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-900 to-[#131320] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Advanced Wallet Features</h1>
          <p className="text-gray-400">
            Connect with MetaMask to access enhanced wallet features including token transfers, contract interactions, and network switching.
          </p>
        </div>

        <div className="grid gap-6">
          <MetaMaskWallet />
          
          <div className="rounded-xl bg-[#1a1a2e] border border-purple-800/30 shadow-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Using Advanced Wallet Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Connect your MetaMask wallet to get started</li>
              <li>Send ETH to any address on the current network</li>
              <li>Add and manage ERC20 tokens</li>
              <li>Switch between Ethereum and Polygon networks</li>
              <li>Interact with smart contracts by providing their address</li>
              <li>Monitor token balances across different networks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 