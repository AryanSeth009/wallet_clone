import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface MetaMaskState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  balance: string | null;
  error: string | null;
}

export const useMetaMask = () => {
  const [state, setState] = useState<MetaMaskState>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: null,
    error: null,
  });

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(accounts[0]);
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      setState({
        isConnected: true,
        account: accounts[0],
        chainId,
        balance: ethers.formatEther(balance),
        error: null,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const disconnectWallet = () => {
    setState({
      isConnected: false,
      account: null,
      chainId: null,
      balance: null,
      error: null,
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      // Handle account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setState(prev => ({
            ...prev,
            account: accounts[0],
          }));
        }
      });

      // Handle chain changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        setState(prev => ({
          ...prev,
          chainId,
        }));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
  };
};
