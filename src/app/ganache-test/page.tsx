'use client';

import { useState } from 'react';
import { connectToGanache, getGanacheBalance, sendGanacheTransaction } from '@/utils/ganache';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

interface GanacheBalanceResult {
  success: boolean;
  balance?: string;
  error?: string;
}

interface GanacheTransactionResult {
  success: boolean;
  txHash?: string;
  receipt?: ethers.TransactionReceipt;
  error?: string;
}

export default function GanacheTestPage() {
  const [ganacheAccounts, setGanacheAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('0.1');
  const [privateKey, setPrivateKey] = useState('');
  const [balance, setBalance] = useState<string>('');
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectGanache = async () => {
    try {
      setIsConnecting(true);
      const result = await connectToGanache();
      
      if (result.success && result.accounts && result.defaultAccount && result.provider) {
        setGanacheAccounts(result.accounts);
        setSelectedAccount(result.defaultAccount);
        setProvider(result.provider);
        toast.success('Connected to Ganache successfully!');
      } else {
        toast.error(`Failed to connect to Ganache: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error connecting to Ganache:', error);
      toast.error('Failed to connect to Ganache');
    } finally {
      setIsConnecting(false);
    }
  };

  const checkBalance = async () => {
    if (!selectedAccount) {
      toast.error('Please select an account first');
      return;
    }

    try {
      const result = await getGanacheBalance(selectedAccount) as GanacheBalanceResult;
      if (result.success && result.balance) {
        setBalance(result.balance);
        toast.success(`Balance: ${result.balance} ETH`);
      } else {
        toast.error(`Failed to get balance: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error checking balance:', error);
      toast.error('Failed to check balance');
    }
  };

  const sendTransaction = async () => {
    if (!privateKey || !recipientAddress || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const result = await sendGanacheTransaction(privateKey, recipientAddress, amount) as GanacheTransactionResult;
      if (result.success && result.txHash) {
        toast.success(`Transaction sent! Hash: ${result.txHash}`);
        // Refresh balance after transaction
        checkBalance();
      } else {
        toast.error(`Transaction failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      toast.error('Failed to send transaction');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white mb-8">Ganache Wallet Test</h1>

        <div className="space-y-4">
          <button
            onClick={connectGanache}
            disabled={isConnecting}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full ${
              isConnecting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isConnecting ? 'Connecting...' : 'Connect to Ganache'}
          </button>

          {ganacheAccounts.length > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Select Account
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2a2a3e] text-white rounded-lg"
                >
                  {ganacheAccounts.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={checkBalance}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
              >
                Check Balance
              </button>

              {balance && (
                <div className="bg-[#1a1a2e] p-4 rounded-lg">
                  <p className="text-white">Current Balance: {balance} ETH</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Private Key
                </label>
                <input
                  type="text"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter private key"
                  className="w-full px-4 py-2 bg-[#2a2a3e] text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter recipient address"
                  className="w-full px-4 py-2 bg-[#2a2a3e] text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2a2a3e] text-white rounded-lg"
                />
              </div>

              <button
                onClick={sendTransaction}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full"
              >
                Send Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 