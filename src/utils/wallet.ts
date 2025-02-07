import { ethers } from 'ethers';
import { encrypt, decrypt } from './crypto';

export interface WalletDetails {
  address: string;
  privateKey: string;
  mnemonic?: string;
  balance?: string;
}

// Create a new Ethereum wallet
export const generateWallet = async (): Promise<WalletDetails> => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase
  };
};

// Import a wallet using private key
export const importWalletFromPrivateKey = (privateKey: string): WalletDetails => {
  try {
    const wallet = new ethers.Wallet(privateKey);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey
    };
  } catch (error) {
    throw new Error('Invalid private key');
  }
};

// Import a wallet using mnemonic
export const importWalletFromMnemonic = (mnemonic: string): WalletDetails => {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic
    };
  } catch (error) {
    throw new Error('Invalid mnemonic phrase');
  }
};

// Get wallet balance
export const getWalletBalance = async (address: string): Promise<string> => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw new Error('Failed to fetch wallet balance');
  }
};

// Send transaction
export const sendTransaction = async (
  fromPrivateKey: string,
  toAddress: string,
  amount: string
): Promise<string> => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL);
    const wallet = new ethers.Wallet(fromPrivateKey, provider);
    
    const tx = await wallet.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount)
    });

    return tx.hash;
  } catch (error) {
    console.error('Transaction error:', error);
    throw new Error('Failed to send transaction');
  }
};

// Estimate gas for a transaction
export const estimateGas = async (
  fromAddress: string,
  toAddress: string,
  amount: string
): Promise<string> => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL);
    const gasEstimate = await provider.estimateGas({
      from: fromAddress,
      to: toAddress,
      value: ethers.parseEther(amount)
    });
    
    return gasEstimate.toString();
  } catch (error) {
    console.error('Gas estimation error:', error);
    throw new Error('Failed to estimate gas');
  }
};

// Format address for display
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Validate Ethereum address
export const isValidAddress = (address: string): boolean => {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

// Encrypt private key for storage
export const encryptPrivateKey = async (privateKey: string, password: string): Promise<string> => {
  return encrypt(privateKey, password);
};

// Decrypt stored private key
export const decryptPrivateKey = async (encryptedKey: string, password: string): Promise<string> => {
  return decrypt(encryptedKey, password);
};
