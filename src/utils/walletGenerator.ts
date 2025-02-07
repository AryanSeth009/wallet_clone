import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export interface BlockchainWallet {
  address: string;
  privateKey: string;
  mnemonic?: string;
}

export interface WalletDetails extends BlockchainWallet {
  id: string;
  name: string;
  balance: string;
  networkId: number;
  transactions: TransactionDetails[];
}

export interface TransactionDetails {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp?: string;
  type: 'send' | 'receive';
  confirmations?: number;
}

export class WalletGenerator {
  private provider: ethers.Provider;
  private etherscanApiKey?: string;

  constructor(rpcUrl: string, etherscanApiKey?: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.etherscanApiKey = etherscanApiKey;
  }

  async generateWallet(name?: string): Promise<WalletDetails> {
    try {
      // Generate a new wallet
      const wallet = ethers.Wallet.createRandom();
      
      // Connect wallet to provider for balance checking
      const connectedWallet = wallet.connect(this.provider);

      // Fetch current network
      const network = await this.provider.getNetwork();

      // Get initial balance
      const balance = await this.provider.getBalance(wallet.address);

      // Fetch initial transactions (if Etherscan API key is provided)
      const transactions = this.etherscanApiKey 
        ? await this.fetchTransactionsFromEtherscan(wallet.address) 
        : [];

      return {
        id: uuidv4(),
        name: name || `Wallet-${Date.now()}`,
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic?.phrase,
        balance: ethers.formatEther(balance),
        networkId: Number(network.chainId),
        transactions
      };
    } catch (error) {
      console.error('Wallet generation failed:', error);
      throw new Error('Failed to generate wallet');
    }
  }

  async getWalletBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Failed to fetch wallet balance:', error);
      return '0';
    }
  }

  async fetchTransactionsFromEtherscan(address: string, limit: number = 10): Promise<TransactionDetails[]> {
    if (!this.etherscanApiKey) {
      return [];
    }

    try {
      const network = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK || 'mainnet';
      const apiDomain = network === 'mainnet' ? 'api' : `api-${network}`;
      
      const response = await axios.get(`https://${apiDomain}.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'txlist',
          address: address,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: limit,
          sort: 'desc',
          apikey: this.etherscanApiKey
        }
      });

      if (response.data.status !== '1') {
        console.warn('Etherscan API error:', response.data.message);
        return [];
      }

      return response.data.result.map((tx: any): TransactionDetails => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.formatEther(tx.value),
        timestamp: tx.timeStamp ? new Date(tx.timeStamp * 1000).toISOString() : undefined,
        type: tx.from.toLowerCase() === address.toLowerCase() ? 'send' : 'receive',
        confirmations: parseInt(tx.confirmations)
      }));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  }

  async getTransactionHistory(address: string, limit: number = 10): Promise<TransactionDetails[]> {
    // Prefer Etherscan API if available
    if (this.etherscanApiKey) {
      return this.fetchTransactionsFromEtherscan(address, limit);
    }

    // Fallback to provider method (less detailed)
    try {
      const transactions = await this.provider.getHistory(address, 0, limit);
      
      return transactions.map(tx => ({
        hash: tx.hash || '',
        from: tx.from || '',
        to: tx.to || '',
        value: ethers.formatEther(tx.value || 0n),
        timestamp: tx.timestamp ? new Date(tx.timestamp * 1000).toISOString() : undefined,
        type: tx.from.toLowerCase() === address.toLowerCase() ? 'send' : 'receive'
      }));
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
      return [];
    }
  }
}

// Utility to get RPC URL from environment
export function getEthereumRpcUrl(): string {
  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  const network = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK || 'mainnet';
  
  if (!projectId) {
    throw new Error('Infura Project ID is not set in environment variables');
  }

  return `https://${network}.infura.io/v3/${projectId}`;
}

// Utility to get Etherscan API key
export function getEtherscanApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
}
