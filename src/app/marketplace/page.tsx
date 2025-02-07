
'use client'
import React from 'react';
import MarketHeroSection from '../../components/marketplace/MarketHeroSection';
import NFTMarketplace from '../../components/NFTMarketplace';
import NFTMint from '../../components/NFTMint';
import WalletConnect from '../../components/WalletConnect';

export default function MarketplacePage() {
  const handleWalletConnect = (address: string) => {
    console.log('Wallet connected:', address);
  };

  const handleWalletDisconnect = () => {
    console.log('Wallet disconnected');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MarketHeroSection />
      
      
    </div>
  );
}