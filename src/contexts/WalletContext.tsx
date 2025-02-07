import React, { createContext, useContext, useState, ReactNode } from "react";
import WalletService, { WalletAccount } from "@/services/WalletService";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface WalletContextType {
  wallets: WalletAccount[];
  selectedWallet: string | null;
  setSelectedWallet: (wallet: string | null) => void;
  createWallet: (walletName: string) => Promise<WalletAccount>;
  isLoading: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [wallets, setWallets] = useState<WalletAccount[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const walletService = new WalletService();

  const createWallet = async (walletName: string) => {
    try {
      if (!session?.user?.id) {
        throw new Error('Please sign in to create a wallet');
      }

      setIsLoading(true);
      const newWallet = await walletService.createWallet(walletName, session.user.id);
      if (!newWallet) {
        throw new Error('Failed to create wallet');
      }

      setWallets(prev => [...prev, newWallet]);
      setSelectedWallet(newWallet._id || null);
      toast.success("Wallet created successfully!");
      return newWallet;
    } catch (error) {
      console.error('Error creating wallet:', error);
      setError(error instanceof Error ? error.message : 'Failed to create wallet');
      toast.error(error instanceof Error ? error.message : "Failed to create wallet");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{ wallets, selectedWallet, setSelectedWallet, createWallet, isLoading, error }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
