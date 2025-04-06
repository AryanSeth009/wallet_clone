import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  walletAddress: string;
  encryptedPrivateKey: string;
  encryptedMnemonic?: string;
  name: string;
  balance: string;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  encryptedPrivateKey: { 
    type: String, 
    required: true,
    select: false // Prevent privateKey from being returned in queries 
  },
  encryptedMnemonic: { 
    type: String,
    select: false // Hide mnemonic phrase 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  balance: {
    type: String,
    default: '0'
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.encryptedPrivateKey;
      delete ret.encryptedMnemonic;
      return ret;
    }
  }
});

// Create or get existing model
export default models.Wallet || model<IWallet>('Wallet', WalletSchema);
