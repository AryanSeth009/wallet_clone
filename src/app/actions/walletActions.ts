'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { ethers } from 'ethers';
import connectMongoDB from '@/lib/mongodb';
import Wallet from '@/models/Wallet';
import { revalidatePath } from 'next/cache';

export interface WalletData {
  _id: string;
  address: string;
  name: string;
  balance: string;
  networkId: string;
  transactions: any[];
}

export async function createWallet(name?: string) {
  try {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Create new wallet
    const wallet = ethers.Wallet.createRandom();
    
    // Create wallet document
    const walletDoc = await Wallet.create({
      userId: session.user.id,
      walletAddress: wallet.address,
      encryptedPrivateKey: wallet.privateKey, // In production, encrypt this
      encryptedMnemonic: wallet.mnemonic?.phrase, // In production, encrypt this
      name: name || `Wallet ${new Date().toLocaleDateString()}`,
      balance: '0',
      networkId: '1' // Default to mainnet
    });

    // Revalidate to update client-side data
    revalidatePath('/dashboard');

    return {
      _id: walletDoc._id.toString(),
      address: walletDoc.walletAddress,
      name: walletDoc.name,
      balance: '0',
      networkId: '1',
      transactions: []
    };
  } catch (error) {
    console.error('Wallet creation error:', error);
    throw error;
  }
}

export async function getUserWallets(): Promise<WalletData[]> {
  try {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return [];
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Get user's wallets
    const wallets = await Wallet.find({ userId: session.user.id });

    // Map to WalletData interface
    return wallets.map(wallet => ({
      _id: wallet._id.toString(),
      address: wallet.walletAddress,
      name: wallet.name,
      balance: wallet.balance,
      networkId: wallet.networkId || '1',
      transactions: []
    }));
  } catch (error) {
    console.error('Error fetching user wallets:', error);
    return [];
  }
}

export async function deleteWallet(walletId: string): Promise<boolean> {
  try {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Delete wallet
    const result = await Wallet.deleteOne({ 
      _id: walletId, 
      userId: session.user.id 
    });

    // Revalidate to update client-side data
    revalidatePath('/dashboard');

    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting wallet:', error);
    return false;
  }
}

export async function getWalletDetails(walletId: string): Promise<WalletData> {
  try {
    // Ensure user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Get wallet
    const wallet = await Wallet.findOne({ 
      _id: walletId,
      userId: session.user.id
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    return {
      _id: wallet._id.toString(),
      address: wallet.walletAddress,
      name: wallet.name,
      balance: wallet.balance,
      networkId: wallet.networkId || '1',
      transactions: []
    };
  } catch (error) {
    console.error('Error fetching wallet details:', error);
    throw error;
  }
}
