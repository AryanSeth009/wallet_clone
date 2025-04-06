'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BellIcon, 
  UserCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { data: session } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Determine profile image with multiple fallback strategies
  const getProfileImage = () => {
    // First, check for profileImage in session
    if (session?.user?.profileImage) {
      console.log('Using profileImage from session')
      return session.user.profileImage
    }

    // Next, check for standard image in session
    if (session?.user?.image) {
      console.log('Using standard image from session')
      return session.user.image
    }

    // Fallback to default avatar
    console.log('Using default avatar')
    return '/default-avatar.png'
  }

  // Get the profile image
  const profileImage = getProfileImage()

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 mb-24 flex items-center justify-between px-6 py-4 bg-[#0B0B10]/50 backdrop-blur-md border-b border-white/10">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold text-white">Wallet</h1>
        <div className="flex space-x-4">
          <Link 
            href="/marketplace" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            Marketplace
          </Link>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <BellIcon className="w-6 h-6" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Image
              src={profileImage}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                (e.target as HTMLImageElement).src = '/default-avatar.png';
              }}
            />
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {/* Profile Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-[#1a1a2e] rounded-xl shadow-lg border border-white/10">
              <div className="px-4 py-2 border-b border-white/10">
                <p className="text-sm text-white">{session?.user?.name}</p>
                <p className="text-xs text-gray-400">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
