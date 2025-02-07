import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

// Wallet interface
export interface Wallet {
  _id: string;
  walletAddress: string;
  privateKey: string;
  name: string;
  balance?: string;
  userId: string;
}

// Wallet generation and import utilities
export class WalletUtils {
  // Generate a new wallet
  static generateWallet(userId: string, name?: string): Wallet {
    const wallet = ethers.Wallet.createRandom();
    
    return {
      _id: uuidv4(),
      walletAddress: wallet.address,
      privateKey: wallet.privateKey,
      name: name || `Wallet ${new Date().toLocaleDateString()}`,
      userId: userId
    };
  }

  // Import wallet from private key
  static importWalletFromPrivateKey(
    privateKey: string, 
    userId: string, 
    name?: string
  ): Wallet {
    try {
      // Validate private key format
      if (!privateKey.startsWith('0x')) {
        privateKey = `0x${privateKey}`;
      }

      // Create wallet from private key
      const wallet = new ethers.Wallet(privateKey);

      return {
        _id: uuidv4(),
        walletAddress: wallet.address,
        privateKey: wallet.privateKey,
        name: name || `Imported Wallet ${wallet.address.slice(0, 6)}`,
        userId: userId
      };
    } catch (error) {
      console.error('Failed to import wallet:', error);
      throw new Error('Invalid private key');
    }
  }

  // Connect to MetaMask
  static async connectMetaMask(): Promise<Wallet> {
    // Check if MetaMask is installed
    if (!(window as any).ethereum) {
      throw new Error('MetaMask not found. Please install MetaMask.');
    }

    try {
      // Request account access
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // Validate accounts
      if (!accounts || accounts.length === 0) {
        throw new Error('No MetaMask accounts found');
      }

      // Create Web3 provider
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      
      // Get address and balance
      const walletAddress = await signer.getAddress();
      const balanceWei = await provider.getBalance(walletAddress);
      const balance = ethers.formatEther(balanceWei);

      return {
        _id: uuidv4(),
        walletAddress: walletAddress,
        privateKey: '', // MetaMask wallets don't expose private key
        name: 'MetaMask Wallet',
        balance: balance,
        userId: 'metamask_user' // You might want to replace this with actual user ID
      };
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to connect to MetaMask'
      );
    }
  }

  // Validate private key
  static isValidPrivateKey(privateKey: string): boolean {
    try {
      // Ensure it starts with 0x and is 66 characters long (including 0x)
      if (!privateKey.startsWith('0x') || privateKey.length !== 66) {
        return false;
      }

      // Try to create a wallet to validate
      new ethers.Wallet(privateKey);
      return true;
    } catch {
      return false;
    }
  }

  // Get wallet balance
  static async getWalletBalance(walletAddress: string): Promise<string> {
    try {
      // Use Hardhat local network or fallback to Sepolia
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || 'http://127.0.0.1:8545'
      );

      const balance = await provider.getBalance(walletAddress);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Failed to get wallet balance:', error);
      return '0';
    }
  }
}
