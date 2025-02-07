import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/mongodb';
import Wallet from '@/models/Wallet';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { method } = req;

  try {
    // Ensure MongoDB connection
    await connectMongoDB();

    switch (method) {
      case 'GET':
        // Fetch wallets with optional filtering
        try {
          const { userId, walletAddress } = req.query;

          // Build query object
          const query: any = {};
          
          if (userId) {
            query.userId = new mongoose.Types.ObjectId(userId as string);
          }

          if (walletAddress) {
            query.walletAddress = (walletAddress as string).toLowerCase();
          }

          // Fetch wallets
          const wallets = await Wallet.find(query)
            .select('-encryptedPrivateKey -encryptedMnemonic')
            .lean();

          // If searching by wallet address and only one found, return that wallet
          if (walletAddress && wallets.length === 1) {
            return res.status(200).json(wallets[0]);
          }

          return res.status(200).json(wallets);
        } catch (error) {
          console.error('Error fetching wallets:', error);
          return res.status(500).json({ 
            message: 'Failed to fetch wallets',
            error: error instanceof Error ? error.message : String(error)
          });
        }

      case 'POST':
        // Create a new wallet
        const { 
          walletAddress, 
          encryptedPrivateKey, 
          name, 
          balance, 
          userId: bodyUserId,
          encryptedMnemonic 
        } = req.body;

        // Comprehensive validation
        console.log('API Wallets: Received wallet data:', {
          walletAddress,
          name,
          userId: bodyUserId,
          balance,
          hasEncryptedPrivateKey: !!encryptedPrivateKey
        });

        // Validate required fields
        if (!walletAddress) {
          console.error('API Wallets: Validation error - walletAddress is required');
          return res.status(400).json({ 
            message: 'Wallet address is required',
            error: 'VALIDATION_ERROR',
            receivedData: req.body
          });
        }

        if (!bodyUserId) {
          console.error('API Wallets: Validation error - userId is required');
          return res.status(400).json({ 
            message: 'User ID is required',
            error: 'VALIDATION_ERROR',
            receivedData: req.body
          });
        }

        if (!encryptedPrivateKey) {
          console.error('API Wallets: Validation error - encryptedPrivateKey is required');
          return res.status(400).json({ 
            message: 'Encrypted private key is required',
            error: 'VALIDATION_ERROR',
            receivedData: req.body
          });
        }

        // Convert string to ObjectId
        let userObjectIdForWallet;
        try {
          // Try to convert to ObjectId, or generate a new one
          userObjectIdForWallet = new mongoose.Types.ObjectId(bodyUserId);
        } catch (idError) {
          // If conversion fails, generate a new ObjectId
          userObjectIdForWallet = new mongoose.Types.ObjectId();
          console.warn('API Wallets: Generated new ObjectId for user:', userObjectIdForWallet);
        }

        // Check if wallet with same address already exists for this user
        try {
          const existingWallet = await Wallet.findOne({ 
            walletAddress: walletAddress.toLowerCase(),
            userId: userObjectIdForWallet 
          });

          if (existingWallet) {
            console.warn('API Wallets: Wallet already exists', {
              existingWalletId: existingWallet._id,
              walletAddress: existingWallet.walletAddress
            });
            return res.status(200).json({ 
              message: 'Wallet already exists',
              error: 'DUPLICATE_WALLET',
              existingWallet: {
                _id: existingWallet._id,
                address: existingWallet.walletAddress,
                name: existingWallet.name,
                balance: existingWallet.balance
              }
            });
          }

          // Create wallet
          const wallet = new Wallet({
            walletAddress: walletAddress.toLowerCase(),
            encryptedPrivateKey,
            encryptedMnemonic,
            name: name || `Wallet ${Date.now()}`,
            balance: balance || '0',
            userId: userObjectIdForWallet,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          // Save wallet with comprehensive error handling
          await wallet.save();

          console.log('API Wallets: Wallet saved successfully', {
            walletId: wallet._id,
            walletAddress: wallet.walletAddress
          });

          return res.status(201).json(wallet);
        } catch (saveError) {
          console.error('API Wallets: Error saving wallet:', saveError);
          
          // Determine the type of error
          let errorResponse = {
            message: 'Failed to save wallet',
            error: 'SAVE_ERROR',
            details: saveError instanceof Error ? saveError.message : String(saveError)
          };

          // Handle specific Mongoose validation errors
          if (saveError instanceof mongoose.Error.ValidationError) {
            errorResponse.message = 'Validation failed';
            errorResponse.error = 'MONGOOSE_VALIDATION_ERROR';
            errorResponse.details = Object.values(saveError.errors)
              .map(err => err.message)
              .join(', ');
          }

          // Handle duplicate key errors
          if (saveError.code === 11000) {
            errorResponse.message = 'Duplicate key error';
            errorResponse.error = 'DUPLICATE_KEY';
          }

          return res.status(500).json(errorResponse);
        }

      case 'PATCH':
        // Update wallet balance
        const { address, balance: updatedBalance } = req.body;

        if (!address || updatedBalance === undefined) {
          return res.status(400).json({ message: 'Address and balance are required' });
        }

        const updatedWallet = await Wallet.findOneAndUpdate(
          { walletAddress: address },
          { 
            balance: updatedBalance, 
            updatedAt: new Date() 
          },
          { new: true }
        );

        if (!updatedWallet) {
          return res.status(404).json({ message: 'Wallet not found' });
        }

        return res.status(200).json(updatedWallet);

      case 'DELETE':
        // Delete a specific wallet
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ message: 'Wallet ID is required' });
        }

        const deletedWallet = await Wallet.findByIdAndDelete(id);

        if (!deletedWallet) {
          return res.status(404).json({ message: 'Wallet not found' });
        }

        return res.status(200).json({ message: 'Wallet deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Wallet API error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
