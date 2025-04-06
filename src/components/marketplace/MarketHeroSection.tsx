import React from 'react';

const MarketHeroSection = () => {
  return (
    <div className="relative py-16 bg-gradient-to-b from-indigo-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
            NFT Marketplace
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mb-8">
            Discover, collect, and sell extraordinary NFTs on our marketplace. Connect your wallet and start your journey into the world of digital ownership.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-700 transition duration-300">
              Explore NFTs
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-indigo-500 rounded-lg text-white font-semibold hover:bg-indigo-900 transition duration-300">
              Create NFT
            </button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <p className="text-3xl font-bold text-white">10,000+</p>
            <p className="text-gray-400">Digital Assets</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <p className="text-3xl font-bold text-white">3,000+</p>
            <p className="text-gray-400">NFT Artists</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <p className="text-3xl font-bold text-white">2.5 ETH</p>
            <p className="text-gray-400">Trading Volume</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeroSection; 