'use server';

import { WalletService } from '@/services/WalletService';
import { connectToDatabase } from '@/lib/db';
import { Types } from 'mongoose';
import Wallet from '@/models/Wallet';
import { ethers } from 'ethers';

export interface SerializedWallet {
  _id: string;
  address: string;
  privateKey: string;
  balance: string;
  mnemonic?: string;
  name?: string;
  userId: string;
}

async function serializeWallet(wallet: any): Promise<SerializedWallet> {
  return {
    _id: wallet._id?.toString() || '',
    address: wallet.walletAddress || '',
    privateKey: wallet.encryptedPrivateKey || '',
    mnemonic: wallet.encryptedMnemonic,
    name: wallet.name,
    balance: '0',
    userId: wallet.userId?.toString() || ''
  };
}

export async function loadWallets(userId: string): Promise<SerializedWallet[]> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await connectToDatabase();
    
    // Create provider
    const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');
    
    // Use lean() to get plain JavaScript objects
    const wallets = await Wallet.find({ 
      userId: new Types.ObjectId(userId) 
    }).lean().exec();

    // Map wallets to serialized objects and fetch balances
    const walletsWithBalances = await Promise.all(
      wallets.map(async (wallet) => {
        const serializedWallet = await serializeWallet(wallet);
        
        try {
          const balanceResult = await provider.getBalance(wallet.walletAddress);
          serializedWallet.balance = ethers.formatEther(balanceResult);
        } catch (error) {
          console.error(`Failed to fetch balance for wallet ${wallet.walletAddress}:`, error);
          serializedWallet.balance = '0';
        }
        
        return serializedWallet;
      })
    );

    return walletsWithBalances;
  } catch (error) {
    console.error('Failed to load wallets:', error);
    throw error;
  }
}

export async function createWallet(userId: string, name?: string): Promise<SerializedWallet> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await connectToDatabase();
    const walletService = new WalletService();
    const wallet = await walletService.createWallet(userId, name);
    return await serializeWallet(wallet);
  } catch (error) {
    console.error('Failed to create wallet:', error);
    throw error;
  }
}

export async function importWalletFromPrivateKey(
  userId: string, 
  privateKey: string, 
  name?: string
): Promise<SerializedWallet> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await connectToDatabase();
    const walletService = new WalletService();
    const wallet = await walletService.importWalletFromPrivateKey(userId, privateKey, name);
    return await serializeWallet(wallet);
  } catch (error) {
    console.error('Failed to import wallet:', error);
    throw error;
  }
}

export async function importWalletFromMnemonic(
  userId: string, 
  mnemonic: string, 
  name?: string
): Promise<SerializedWallet> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await connectToDatabase();
    const walletService = new WalletService();
    const wallet = await walletService.importWalletFromMnemonic(userId, mnemonic, name);
    return await serializeWallet(wallet);
  } catch (error) {
    console.error('Failed to import wallet:', error);
    throw error;
  }
}
