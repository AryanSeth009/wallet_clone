"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { MagnifyingGlassIcon, BellIcon, Cog6ToothIcon, ChevronDownIcon, XMarkIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useWalletStore } from '@/store/walletStore';
import { toast } from 'react-hot-toast';
import { getAvatarUrl } from '@/utils/avatar';
import { useThemeContext } from '@/context/ThemeContext';

// Define notification types
interface Notification {
  id: string;
  type: 'price_alert' | 'transaction' | 'security' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
}

const Navbar = () => {
  const { data: session, update } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const selectedWallet = useWalletStore(state => state.selectedWallet);
  const wallets = useWalletStore(state => state.wallets);
  const currentWallet = wallets.find(w => w.id === selectedWallet);
  const { theme } = useThemeContext();

  // Get username from email or use default
  const username = session?.user?.email?.split('@')[0] || 'Guest';

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!session?.user?.email) return;
      
      try {
        const response = await fetch(`/api/user/profile?email=${encodeURIComponent(session.user.email)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await response.json();
        setUserProfile(data);
        
        // Set profile image if available
        if (data.profileImage || data.image) {
          setProfileImage(data.profileImage || data.image);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchUserProfile();
  }, [session]);

  // Update profile image when session changes
  useEffect(() => {
    if (session?.user?.image) {
      setProfileImage(session.user.image);
    } else if (!profileImage) {
      setProfileImage(null);
    }
  }, [session]);

  // Listen for visibility change events to refresh the profile image
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Refresh session data
        update();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [update]);

  // Sample notifications - in a real app, these would come from an API or database
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'price_alert',
      title: 'ETH Price Alert',
      message: 'ETH has reached your target price of $3,500',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      data: { price: 3500, change: 5.2 }
    },
    {
      id: '2',
      type: 'transaction',
      title: 'Transaction Confirmed',
      message: 'Your transaction of 0.5 ETH has been confirmed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      data: { amount: 0.5, hash: '0x123...abc' }
    },
    {
      id: '3',
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from a new device',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      data: { location: 'New York, USA' }
    },
    {
      id: '4',
      type: 'system',
      title: 'System Update',
      message: 'Your wallet has been updated to the latest version',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/home' });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'price_alert':
        return <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" />;
      case 'transaction':
        return <CheckCircleIcon className="h-5 w-5 text-blue-400" />;
      case 'security':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />;
      case 'system':
        return <Cog6ToothIcon className="h-5 w-5 text-purple-400" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <nav className="bg-[#0B0B10] dark:bg-[#0B0B10] bg-white border-b border-[#1F2937]/10 dark:border-[#1F2937]/10 border-gray-200 px-4 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
        {/* Left section - Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link href="/home" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-[#1A1B23] to-[#1F2937] hover:from-[#1F2937] hover:to-[#1A1B23] transition-all duration-300">
            <div className="flex items-center space-x-1">
              <div className="text-purple-500 text-md">⚡</div>
              <span className="text-md font-semibold">CryptoWallet</span>
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
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              {unreadCount > 0 && (
                <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-[#7136D1] rounded-full border-2 border-[#0B0B10]"></div>
              )}
              <BellIcon className="h-5 w-5" />
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute rounded-lg right-0 mt-2 w-80 bg-[#1A1B23] rounded-lg shadow-lg py-1 border border-[#1F2937]/10 z-50">
                <div className="flex justify-between items-center px-4 py-2 border-b border-[#1F2937]/10">
                  <h3 className="text-white font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-purple-400 hover:text-purple-300"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-[#1F2937]/30 transition-colors ${!notification.read ? 'bg-[#1F2937]/10' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-white font-medium">{notification.title}</p>
                              <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                            
                            {notification.type === 'price_alert' && notification.data && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-400">
                                  +{notification.data.change}%
                                </span>
                                <span className="text-xs text-gray-400">
                                  Current: ${notification.data.price}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="px-4 mr-10 py-2 border-t border-[#1F2937]/10">
                  <Link 
                    href="/notifications" 
                    className="text-sm text-purple-400 hover:text-purple-300 text-center block"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          {/* <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Cog6ToothIcon className="h-5 w-5" />
          </button> */}

          {/* Profile/Wallet Selector */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-[#1A1B23] rounded-lg px-2 py-1.5 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1A1B23] flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to avatar if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = getAvatarUrl(username);
                      setProfileImage(null);
                    }}
                  />
                ) : (
                  <img
                    src={getAvatarUrl(username)}
                    alt="User Avatar"
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="uppercase text-white font-medium group-hover:text-white transition-colors">
                  {userProfile?.name || username}
                </p>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {currentWallet?.balance || '0.00'} ETH
                </p>
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
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1A1B23] flex items-center justify-center">
                        {wallet.id === selectedWallet && profileImage ? (
                          <img
                            src={profileImage}
                            alt="Wallet Avatar"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to avatar if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.src = getAvatarUrl(wallet.name || 'Wallet');
                            }}
                          />
                        ) : (
                          <img
                            src={getAvatarUrl(wallet.name || 'Wallet')}
                            alt="Wallet Avatar"
                            className="w-full h-full"
                          />
                        )}
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
                  <Link 
                    href="/profile" 
                    className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-[#1F2937]/50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile Settings
                  </Link>
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
