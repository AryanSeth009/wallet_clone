export interface Wallet {
  id: string;
  name: string;
  type: 'bitcoin' | 'ethereum' | 'binance' | string;
  address: string;
  privateKey: string;
  balance: string;
  userId?: string;
  createdAt?: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'send' | 'receive' | 'swap';
  amount: string;
  currency: string;
  fromAddress?: string;
  toAddress: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  fee?: string;
}

export interface ImportWalletParams {
  name?: string;
  type: 'bitcoin' | 'ethereum' | 'binance' | string;
  privateKey: string;
}
