import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { formatEther } from 'ethers';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

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

interface TransactionHistoryProps {
  address: string;
}

export default function TransactionHistory({ address }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = async (pageNum: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${pageNum}&offset=10&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === '1') {
        const formattedTransactions = data.result.map((tx: any) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: formatEther(tx.value),
          timeStamp: format(new Date(parseInt(tx.timeStamp) * 1000), 'MMM dd, yyyy HH:mm'),
          status: tx.isError === '1' ? 'failed' : 'confirmed',
          gasPrice: formatEther(tx.gasPrice),
          gasUsed: tx.gasUsed
        }));

        if (pageNum === 1) {
          setTransactions(formattedTransactions);
        } else {
          setTransactions(prev => [...prev, ...formattedTransactions]);
        }

        setHasMore(data.result.length === 10);
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
    if (address) {
      fetchTransactions();
    }
  }, [address]);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'sent') return tx.from.toLowerCase() === address.toLowerCase();
    if (filter === 'received') return tx.to.toLowerCase() === address.toLowerCase();
    return true;
  });

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
      fetchTransactions(page + 1);
    }
  };

  if (isLoading && transactions.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-300">Transaction History</h3>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-300">Transaction History</h3>
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-purple-300">Transaction History</h3>
        <div className="flex space-x-2">
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
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No transactions found</div>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.hash}
              className="flex items-center justify-between bg-[#2a2a3e] p-4 rounded-lg hover:bg-[#3a3a4e] transition"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  tx.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="text-white">
                    {tx.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received'} {tx.value} ETH
                  </p>
                  <p className="text-sm text-gray-400">{tx.timeStamp}</p>
                  <p className="text-xs text-gray-500">
                    Gas: {tx.gasUsed} ({tx.gasPrice} ETH)
                  </p>
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View on Etherscan
              </a>
            </div>
          ))}
          
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="w-full bg-[#2a2a3e] hover:bg-[#3a3a4e] text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
} 