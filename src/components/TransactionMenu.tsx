'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  gasPrice: string;
  gasUsed: string;
}

interface TransactionMenuProps {
  address: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionMenu({ address, isOpen, onClose }: TransactionMenuProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === '1') {
        const formattedTransactions = data.result.map((tx: any) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethers.formatEther(tx.value),
          timeStamp: format(new Date(parseInt(tx.timeStamp) * 1000), 'MMM dd, yyyy HH:mm'),
          status: tx.isError === '1' ? 'failed' : 'confirmed',
          gasPrice: ethers.formatEther(tx.gasPrice),
          gasUsed: tx.gasUsed
        }));

        setTransactions(formattedTransactions);
      } else {
        setError('Failed to fetch transactions');
        toast.error('Failed to fetch transactions');
      }
    } catch (err) {
      setError('Error fetching transactions');
      toast.error('Error fetching transactions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address && isOpen) {
      fetchTransactions();
    }
  }, [address, isOpen]);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'sent') return tx.from.toLowerCase() === address.toLowerCase();
    if (filter === 'received') return tx.to.toLowerCase() === address.toLowerCase();
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-[#1a1a2e] border-l border-purple-900/30 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-purple-300">Transactions</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg text-sm ${
            filter === 'all' ? 'bg-purple-600 text-white' : 'bg-[#2a2a3e] text-gray-400'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('sent')}
          className={`px-3 py-1 rounded-lg text-sm ${
            filter === 'sent' ? 'bg-purple-600 text-white' : 'bg-[#2a2a3e] text-gray-400'
          }`}
        >
          Sent
        </button>
        <button
          onClick={() => setFilter('received')}
          className={`px-3 py-1 rounded-lg text-sm ${
            filter === 'received' ? 'bg-purple-600 text-white' : 'bg-[#2a2a3e] text-gray-400'
          }`}
        >
          Received
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading transactions...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No transactions found</div>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.hash}
              className="bg-[#2a2a3e] p-4 rounded-lg hover:bg-[#3a3a4e] transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {tx.from.toLowerCase() === address.toLowerCase() ? (
                    <ArrowUpIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <ArrowDownIcon className="w-5 h-5 text-green-500" />
                  )}
                  <span className="text-white">
                    {tx.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received'} {tx.value} ETH
                  </span>
                </div>
                <span className={`text-sm ${
                  tx.status === 'confirmed' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {tx.status}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                <p>{tx.timeStamp}</p>
                <p className="mt-1">
                  {tx.from.toLowerCase() === address.toLowerCase() ? 'To: ' : 'From: '}
                  {tx.from.toLowerCase() === address.toLowerCase() ? tx.to : tx.from}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Gas: {tx.gasUsed} ({tx.gasPrice} ETH)
                </p>
              </div>
              <a
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm mt-2 block"
              >
                View on Etherscan
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 