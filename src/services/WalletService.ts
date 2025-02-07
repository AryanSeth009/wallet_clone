import { ethers } from 'ethers';
import WalletNFTMarketplaceABI from '@/utils/abis/WalletNFTMarketplace.json';
import WalletNFTABI from '@/utils/abis/WalletNFT.json';
import { encrypt, decrypt } from '@/utils/encryption';
import axios from 'axios';

// Wallet account interface
export interface WalletAccount {
  _id?: string;
  address: string;
  privateKey: string;
  mnemonic?: string;
  name: string;
  balance: string;
  userId: string;
}

// Transaction interface
interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'nft_list' | 'nft_buy' | 'nft_mint';
  amount: string;
  timestamp: Date;
  from: string;
  to: string;
  status: 'pending' | 'completed' | 'failed';
  nftTokenId?: string;
}

export default class WalletService {
  private provider: ethers.JsonRpcProvider;
  private marketplaceAddress: string;
  private nftContractAddress: string;

  constructor() {
    const rpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL;
    if (!rpcUrl) {
      throw new Error('Ethereum RPC URL not configured');
    }
    
    try {
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
    } catch (error) {
      console.error('Failed to initialize provider:', error);
      throw new Error('Failed to initialize Ethereum provider');
    }
    
    this.marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT || '';
    this.nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT || '';
  }

  async createWallet(name: string, userId: string): Promise<WalletAccount> {
    try {
      if (!name) {
        throw new Error('Wallet name is required');
      }

      // Generate a new random wallet
      const wallet = ethers.Wallet.createRandom();
      const mnemonic = wallet.mnemonic?.phrase;
      
      if (!wallet || !mnemonic) {
        throw new Error('Failed to generate wallet');
      }

      // Get initial balance
      const balance = await this.getWalletBalance(wallet.address);

      // Encrypt sensitive data
      const encryptedPrivateKey = encrypt(wallet.privateKey);
      const encryptedMnemonic = encrypt(mnemonic);

      // Save to database using existing API
      const response = await axios.post('/api/wallets', {
        userId,
        name,
        walletAddress: wallet.address,
        encryptedPrivateKey,
        encryptedMnemonic,
        balance
      });

      const savedWallet = response.data;

      return {
        _id: savedWallet._id,
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: mnemonic,
        name: name,
        balance: balance,
        userId: userId
      };
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  }

  async sendTransaction(
    fromAddress: string,
    toAddress: string,
    amount: string,
    privateKey: string
  ): Promise<string> {
    try {
      if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid recipient address');
      }

      const wallet = new ethers.Wallet(privateKey, this.provider);
      const parsedAmount = ethers.parseEther(amount);

      // Get the current gas price
      const feeData = await this.provider.getFeeData();
      
      // Create transaction object
      const tx = {
        to: toAddress,
        value: parsedAmount,
        gasPrice: feeData.gasPrice,
      };

      // Estimate gas limit
      const gasLimit = await wallet.estimateGas(tx);
      tx.gasLimit = gasLimit;

      // Send transaction
      const transaction = await wallet.sendTransaction(tx);
      
      // Wait for transaction to be mined
      const receipt = await transaction.wait();
      
      if (receipt && receipt.status === 1) {
        // Update balance using existing API
        const newBalance = await this.getWalletBalance(fromAddress);
        await axios.put('/api/wallets', {
          walletAddress: fromAddress,
          balance: newBalance
        });

        return transaction.hash;
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  async getWalletBalance(address: string): Promise<string> {
    try {
      if (!ethers.isAddress(address)) {
        throw new Error('Invalid wallet address');
      }

      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  async getWalletByAddress(address: string): Promise<WalletAccount | null> {
    try {
      const response = await axios.get(`/api/wallets?walletAddress=${address}`);
      return response.data;
    } catch (error) {
      console.error('Error getting wallet:', error);
      return null;
    }
  }

  async updateWalletBalance(address: string): Promise<void> {
    try {
      const balance = await this.getWalletBalance(address);
      await axios.put('/api/wallets', {
        walletAddress: address,
        balance
      });
    } catch (error) {
      console.error('Error updating wallet balance:', error);
      throw error;
    }
  }

  async getUserWallets(userId: string): Promise<WalletAccount[]> {
    try {
      const response = await axios.get(`/api/wallets?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user wallets:', error);
      throw error;
    }
  }
}
