"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { MagnifyingGlassIcon, BellIcon, Cog6ToothIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useWalletStore } from '@/store/walletStore';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const selectedWallet = useWalletStore(state => state.selectedWallet);
  const wallets = useWalletStore(state => state.wallets);
  const currentWallet = wallets.find(w => w.id === selectedWallet);

  // Get username from email or use default
  const username = session?.user?.email?.split('@')[0] || 'Guest';
  const userInitial = username.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/home' });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-[#0B0B10] border-b border-[#1F2937]/10 px-4 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
        {/* Left section - Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-[#1A1B23] to-[#1F2937] hover:from-[#1F2937] hover:to-[#1A1B23] transition-all duration-300">
            <div className="relative w-5 h-5">
              <Image
                src="/logo.svg"
                alt="BlockPouch Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center">
              <span className="text-white font-semibold text-sm">Block</span>
              <span className="text-[#7136D1] font-semibold text-sm">Pouch</span>
              <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-2" />
            </div>
          </Link>
          <div className="h-4 w-[1px] bg-[#1F2937]/20"></div>
          <span className="text-gray-400 text-xs">Top Staking Assets</span>
        </div>

        {/* Right section - Actions and Profile */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          {/* <div className="flex-1 max-w-[20vh]">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1A1B23] text-sm text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 border border-[#1F2937]/10 focus:outline-none focus:border-[#7136D1]/50 transition-colors"
              />
            </div>
          </div> */}

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-[#7136D1] rounded-full border-2 border-[#0B0B10]"></div>
            <BellIcon className="h-5 w-5" />
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Cog6ToothIcon className="h-5 w-5" />
          </button>

          {/* Profile/Wallet Selector */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-[#1A1B23] rounded-lg px-2 py-1.5 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7136D1] to-[#8A2BE2] flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {userInitial}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className=" uppercase  text-white font-medium group-hover:text-white transition-colors">
                  {username}
                </p>
                {/* <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {currentWallet?.balance || '0.00'} ETH
                </p> */}
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#1A1B23] rounded-lg shadow-lg py-1 border border-[#1F2937]/10">
                {wallets.map(wallet => (
                  <button
                    key={wallet.id}
                    onClick={() => {
                      useWalletStore.getState().selectWallet(wallet.id);
                      setIsProfileOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#1F2937]/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7136D1] to-[#8A2BE2] flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {wallet.name?.charAt(0) || 'W'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium group-hover:text-white transition-colors">
                          {wallet.name}
                        </p>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                          {wallet.balance} ETH
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-[#1F2937]/10 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-[#7136D1] hover:bg-[#1F2937]/50 transition-colors font-medium"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
