import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Use type assertion instead of global Window interface
type WindowWithEthereum = Window & { ethereum?: any };

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
      const windowWithEthereum = window as WindowWithEthereum;
      if (!windowWithEthereum.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await windowWithEthereum.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
      const balance = await provider.getBalance(accounts[0]);
      const chainId = await windowWithEthereum.ethereum.request({
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
    const windowWithEthereum = window as WindowWithEthereum;
    if (windowWithEthereum.ethereum) {
      // Handle account changes
      windowWithEthereum.ethereum.on('accountsChanged', (accounts: string[]) => {
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
      windowWithEthereum.ethereum.on('chainChanged', (chainId: string) => {
        setState(prev => ({
          ...prev,
          chainId,
        }));
      });
    }

    return () => {
      if (windowWithEthereum.ethereum) {
        windowWithEthereum.ethereum.removeListener('accountsChanged', () => {});
        windowWithEthereum.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
  };
};
