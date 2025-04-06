'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

// ABI for ERC20 Token
const ERC20_ABI = [
  // Read-only functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  // Transfer functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

// Sample ABI for smart contract interaction
const SAMPLE_CONTRACT_ABI = [
  "function getUserInfo(address user) view returns (uint256 balance, bool isActive)",
  "function stake(uint256 amount) returns (bool)",
  "function claim() returns (uint256)"
];

// Network definitions
const NETWORKS = {
  ethereum: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  polygon: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com'],
  }
};

export default function MetaMaskWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      // Add listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(console.error);
    }

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      }) as string[];

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setError(null);
        
        // Get initial chain
        const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
        setChainId(chainId);
      }
    } catch (error) {
      console.error('Error connecting to MetaMask', error);
      setError(error instanceof Error ? error.message : 'Failed to connect to MetaMask');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setError(null);
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (_chainId: string) => {
    // MetaMask recommends reloading the page on chain changes
    window.location.reload();
  };

  return (
    <div className="p-4">
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all"
        >
          Connect MetaMask
        </button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <p>Chain ID: {chainId}</p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all mt-2"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
} 