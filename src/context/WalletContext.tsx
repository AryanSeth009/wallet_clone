'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserWallets, createWallet, deleteWallet, WalletData } from '@/app/actions/walletActions';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface WalletContextType {
  wallets: WalletData[];
  currentWallet: WalletData | null;
  isLoading: boolean;
  error: string | null;
  createNewWallet: (name?: string) => Promise<void>;
  deleteExistingWallet: (walletId: string) => Promise<void>;
  selectWallet: (walletId: string) => void;
  refreshWallets: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [currentWallet, setCurrentWallet] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchWallets = async () => {
    if (!session?.user?.id) {
      setWallets([]);
      setCurrentWallet(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const fetchedWallets = await getUserWallets();
      setWallets(fetchedWallets);
      
      // Set the first wallet as current if available
      if (fetchedWallets.length > 0) {
        setCurrentWallet(fetchedWallets[0]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to load wallets:', err);
      setError('Failed to load wallets');
      toast.error('Failed to load wallets');
    } finally {
      setIsLoading(false);
    }
  };

  const selectWallet = (walletId: string) => {
    const wallet = wallets.find(w => w._id === walletId);
    if (wallet) {
      setCurrentWallet(wallet);
    }
  };

  const createNewWallet = async (name?: string) => {
    if (!session?.user?.id) {
      toast.error('Please log in to create a wallet');
      return;
    }

    try {
      setIsLoading(true);
      const newWallet = await createWallet(name);
      const updatedWallets = [...wallets, newWallet];
      setWallets(updatedWallets);
      
      // Automatically select the new wallet
      setCurrentWallet(newWallet);
      
      toast.success('Wallet created successfully');
    } catch (err) {
      console.error('Failed to create wallet:', err);
      toast.error('Failed to create wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExistingWallet = async (walletId: string) => {
    if (!session?.user?.id) {
      toast.error('Please log in to delete a wallet');
      return;
    }

    try {
      setIsLoading(true);
      const deleted = await deleteWallet(walletId);
      if (deleted) {
        const updatedWallets = wallets.filter(wallet => wallet._id !== walletId);
        setWallets(updatedWallets);
        
        // If the deleted wallet was the current wallet, select another or set to null
        if (currentWallet?._id === walletId) {
          setCurrentWallet(updatedWallets.length > 0 ? updatedWallets[0] : null);
        }
        
        toast.success('Wallet deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete wallet:', err);
      toast.error('Failed to delete wallet');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch wallets when session changes
  useEffect(() => {
    fetchWallets();
  }, [session?.user?.id]);

  return (
    <WalletContext.Provider value={{
      wallets,
      currentWallet,
      isLoading,
      error,
      createNewWallet,
      deleteExistingWallet,
      selectWallet,
      refreshWallets: fetchWallets
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
