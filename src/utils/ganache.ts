import { ethers } from 'ethers';

// Ganache default RPC URL
const GANACHE_URL = 'http://127.0.0.1:7545';

interface GanacheConnectionResult {
  success: boolean;
  provider?: ethers.JsonRpcProvider;
  accounts?: string[];
  defaultAccount?: string;
  error?: string;
}

export async function connectToGanache(): Promise<GanacheConnectionResult> {
  try {
    const provider = new ethers.JsonRpcProvider(GANACHE_URL);
    const accounts = await provider.listAccounts();
    
    if (accounts.length === 0) {
      return {
        success: false,
        error: 'No accounts found in Ganache'
      };
    }

    return {
      success: true,
      provider,
      accounts: accounts.map(account => account.address),
      defaultAccount: accounts[0].address
    };
  } catch (error) {
    console.error('Error connecting to Ganache:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to Ganache'
    };
  }
}

export async function getGanacheBalance(address: string) {
  try {
    const provider = new ethers.JsonRpcProvider(GANACHE_URL);
    const balance = await provider.getBalance(address);
    return {
      success: true,
      balance: ethers.formatEther(balance)
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get balance'
    };
  }
}

export async function sendGanacheTransaction(
  fromPrivateKey: string,
  toAddress: string,
  amount: string
) {
  try {
    const provider = new ethers.JsonRpcProvider(GANACHE_URL);
    const wallet = new ethers.Wallet(fromPrivateKey, provider);
    
    const tx = await wallet.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount)
    });
    
    const receipt = await tx.wait();
    
    return {
      success: true,
      txHash: tx.hash,
      receipt
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send transaction'
    };
  }
} 