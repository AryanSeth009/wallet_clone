import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  generateWallet,
  importWalletFromPrivateKey,
  importWalletFromMnemonic,
  getWalletBalance,
  sendTransaction,
  estimateGas,
  encryptPrivateKey,
  decryptPrivateKey,
  WalletDetails
} from '@/utils/wallet';

interface Wallet {
  id: string;
  name: string;
  address: string;
  encryptedPrivateKey: string;
  balance: string;
  type: string;
}

interface WalletStore {
  wallets: Wallet[];
  selectedWallet: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Wallet Management
  createWallet: (name: string, password: string) => Promise<void>;
  importWalletWithPrivateKey: (name: string, privateKey: string, password: string) => Promise<void>;
  importWalletWithMnemonic: (name: string, mnemonic: string, password: string) => Promise<void>;
  deleteWallet: (id: string) => void;
  selectWallet: (id: string) => void;
  
  // Balance & Transactions
  refreshBalance: (id: string) => Promise<void>;
  refreshAllBalances: () => Promise<void>;
  sendTokens: (id: string, password: string, toAddress: string, amount: string) => Promise<string>;
  estimateTransactionGas: (fromAddress: string, toAddress: string, amount: string) => Promise<string>;
  
  // Error Handling
  clearError: () => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      wallets: [],
      selectedWallet: null,
      isLoading: false,
      error: null,

      createWallet: async (name: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const walletDetails = await generateWallet();
          const encryptedKey = await encryptPrivateKey(walletDetails.privateKey, password);
          
          const newWallet: Wallet = {
            id: `${Date.now()}`,
            name,
            address: walletDetails.address,
            encryptedPrivateKey: encryptedKey,
            balance: '0',
            type: 'ethereum'
          };

          set(state => ({
            wallets: [...state.wallets, newWallet],
            selectedWallet: newWallet.id,
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create wallet',
            isLoading: false
          });
        }
      },

      importWalletWithPrivateKey: async (name: string, privateKey: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const walletDetails = importWalletFromPrivateKey(privateKey);
          const encryptedKey = await encryptPrivateKey(walletDetails.privateKey, password);
          
          const newWallet: Wallet = {
            id: `${Date.now()}`,
            name,
            address: walletDetails.address,
            encryptedPrivateKey: encryptedKey,
            balance: '0',
            type: 'ethereum'
          };

          set(state => ({
            wallets: [...state.wallets, newWallet],
            selectedWallet: newWallet.id,
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to import wallet',
            isLoading: false
          });
        }
      },

      importWalletWithMnemonic: async (name: string, mnemonic: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const walletDetails = importWalletFromMnemonic(mnemonic);
          const encryptedKey = await encryptPrivateKey(walletDetails.privateKey, password);
          
          const newWallet: Wallet = {
            id: `${Date.now()}`,
            name,
            address: walletDetails.address,
            encryptedPrivateKey: encryptedKey,
            balance: '0',
            type: 'ethereum'
          };

          set(state => ({
            wallets: [...state.wallets, newWallet],
            selectedWallet: newWallet.id,
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to import wallet',
            isLoading: false
          });
        }
      },

      deleteWallet: (id: string) => {
        set(state => ({
          wallets: state.wallets.filter(w => w.id !== id),
          selectedWallet: state.selectedWallet === id ? null : state.selectedWallet
        }));
      },

      selectWallet: (id: string) => {
        set({ selectedWallet: id });
      },

      refreshBalance: async (id: string) => {
        try {
          const { wallets } = get();
          const wallet = wallets.find(w => w.id === id);
          if (!wallet) return;

          const balance = await getWalletBalance(wallet.address);
          
          set(state => ({
            wallets: state.wallets.map(w =>
              w.id === id ? { ...w, balance } : w
            )
          }));
        } catch (error) {
          console.error('Error refreshing balance:', error);
        }
      },

      refreshAllBalances: async () => {
        const { wallets } = get();
        await Promise.all(wallets.map(wallet => get().refreshBalance(wallet.id)));
      },

      sendTokens: async (id: string, password: string, toAddress: string, amount: string) => {
        try {
          set({ isLoading: true, error: null });
          const { wallets } = get();
          const wallet = wallets.find(w => w.id === id);
          if (!wallet) throw new Error('Wallet not found');

          const privateKey = await decryptPrivateKey(wallet.encryptedPrivateKey, password);
          const txHash = await sendTransaction(privateKey, toAddress, amount);
          
          // Refresh balance after transaction
          await get().refreshBalance(id);
          
          set({ isLoading: false });
          return txHash;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to send transaction',
            isLoading: false
          });
          throw error;
        }
      },

      estimateTransactionGas: async (fromAddress: string, toAddress: string, amount: string) => {
        return estimateGas(fromAddress, toAddress, amount);
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        wallets: state.wallets.map(w => ({
          ...w,
          balance: '0' // Don't persist balances
        })),
        selectedWallet: state.selectedWallet
      })
    }
  )
);
