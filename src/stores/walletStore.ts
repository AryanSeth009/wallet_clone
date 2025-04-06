import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Wallet, Transaction, ImportWalletParams } from '../types/wallet';
import { WalletGenerator, getEthereumRpcUrl } from '../utils/walletGenerator';
import { ethers } from 'ethers';

interface WalletStore {
  accounts: Wallet[];
  selectedAccount: number | null;
  isLoading: boolean;
  error: string | null;
  transactions: Transaction[];
  
  // Actions
  selectAccount: (index: number) => void;
  createNewWallet: (wallet: Omit<Wallet, 'id' | 'balance' | 'privateKey'>) => Promise<Wallet>;
  importWallet: (params: ImportWalletParams) => Promise<Wallet>;
  deleteWallet: (walletId: string) => Promise<void>;
  loadWallets: () => void;
  sendTransaction: (params: { to: string; amount: bigint; from: string }) => Promise<void>;
  clearError: () => void;
  validateUniqueWallet: (address: string, type: string) => boolean;
}

interface TransactionParams {
  to: string;
  amount: bigint;
  from: string;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => {
      // Create wallet generator instance
      const walletGenerator = new WalletGenerator(getEthereumRpcUrl());
      
      return {
        accounts: [],
        selectedAccount: null,
        isLoading: false,
        error: null,
        transactions: [],

        validateUniqueWallet: (address: string, type: string) => {
          const { accounts } = get();
          // Check for existing wallet with same address and type
          return !accounts.some(wallet => 
            wallet.address.toLowerCase() === address.toLowerCase() && 
            wallet.type === type
          );
        },

        selectAccount: (index) => {
          set({ selectedAccount: index });
        },

        createNewWallet: async (wallet) => {
          try {
            set({ isLoading: true, error: null });
            
            // Generate wallet details
            const walletDetails = await walletGenerator.generateWallet(wallet.name);
            
            // Validate unique address
            if (!get().validateUniqueWallet(walletDetails.address, wallet.type)) {
              throw new Error('A wallet with this address already exists');
            }

            const newWallet: Wallet = {
              ...wallet,
              id: `${wallet.type}-${Date.now()}`,
              address: walletDetails.address,
              privateKey: walletDetails.privateKey,
              balance: walletDetails.balance,
            };
            
            set((state) => ({
              accounts: [...state.accounts, newWallet],
              isLoading: false,
            }));

            return newWallet;
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to create wallet', 
              isLoading: false 
            });
            throw error;
          }
        },

        importWallet: async (params) => {
          try {
            set({ isLoading: true, error: null });
            
            // Create wallet from private key
            const privateKey = params.privateKey;
            const wallet = new ethers.Wallet(privateKey);
            const provider = new ethers.JsonRpcProvider(getEthereumRpcUrl());
            const connectedWallet = wallet.connect(provider);
            
            // Get balance
            const balance = await provider.getBalance(wallet.address);
            
            // Validate unique address
            if (!get().validateUniqueWallet(wallet.address, params.type)) {
              throw new Error('A wallet with this address already exists');
            }

            const newWallet: Wallet = {
              id: `imported-${params.type}-${Date.now()}`,
              name: params.name || `${params.type.toUpperCase()} Wallet`,
              type: params.type,
              address: wallet.address,
              privateKey: privateKey,
              balance: ethers.formatEther(balance),
            };
            
            set((state) => ({
              accounts: [...state.accounts, newWallet],
              isLoading: false,
            }));

            return newWallet;
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to import wallet', 
              isLoading: false 
            });
            throw error;
          }
        },

        deleteWallet: async (walletId) => {
          try {
            set({ isLoading: true, error: null });
            set((state) => ({
              accounts: state.accounts.filter(wallet => wallet.id !== walletId),
              selectedAccount: null,
              isLoading: false,
            }));
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to delete wallet', 
              isLoading: false 
            });
          }
        },

        loadWallets: () => {
          // Just load wallets from persisted storage
          const state = get();
          if (state.accounts.length === 0) {
            set({ selectedAccount: null });
          }
        },

        sendTransaction: async (params: TransactionParams) => {
          try {
            set({ isLoading: true, error: null });
            
            const provider = new ethers.JsonRpcProvider(getEthereumRpcUrl());
            const wallet = get().accounts.find(w => w.address === params.from);
            
            if (!wallet) {
              throw new Error('Wallet not found');
            }
            
            const signer = new ethers.Wallet(wallet.privateKey, provider);
            const tx = await signer.sendTransaction({
              to: params.to,
              value: params.amount
            });
            
            await tx.wait();
            
            // Update balance after transaction
            const newBalance = await provider.getBalance(wallet.address);
            
            set(state => ({
              accounts: state.accounts.map(w =>
                w.address === wallet.address
                  ? { ...w, balance: ethers.formatEther(newBalance) }
                  : w
              ),
              isLoading: false
            }));
            
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Transaction failed',
              isLoading: false
            });
            throw error;
          }
        },

        clearError: () => {
          set({ error: null });
        },
      };
    },
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        accounts: state.accounts,
        selectedAccount: state.selectedAccount,
      }),
    }
  )
);
