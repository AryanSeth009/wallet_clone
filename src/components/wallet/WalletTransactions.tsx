"use client";

import { useState } from 'react';
import { Calendar, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useWallet } from '@/context/WalletContext';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  amount: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  address: string;
  symbol: string;
}

export function TransactionHistory() {
  const { selectedWallet } = useWallet();
  const [transactionType, setTransactionType] = useState<string>('all');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<'from' | 'to' | null>(null);

  // Sample transactions - replace with actual data from your wallet service
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'send',
      amount: '0.25',
      date: new Date('2024-02-10T10:00:00'),
      status: 'completed',
      address: '0x1234...5678',
      symbol: 'BTC'
    },
    {
      id: '2',
      type: 'receive',
      amount: '0.15',
      date: new Date('2024-02-09T15:30:00'),
      status: 'completed',
      address: '0x8765...4321',
      symbol: 'BTC'
    },
    {
      id: '3',
      type: 'swap',
      amount: '0.1',
      date: new Date('2024-02-08T09:15:00'),
      status: 'completed',
      address: '0x9876...1234',
      symbol: 'BTC'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="h-5 w-5" />;
      case 'receive':
        return <ArrowDownLeft className="h-5 w-5" />;
      case 'swap':
        return <div className="h-5 w-5" />; // Consider using another icon if needed for swap transactions
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send':
        return 'text-red-500';
      case 'receive':
        return 'text-green-500';
      case 'swap':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (transactionType !== 'all' && tx.type !== transactionType) return false;
    if (fromDate && new Date(tx.date) < new Date(fromDate)) return false;
    if (toDate && new Date(tx.date) > new Date(toDate)) return false;
    return true;
  });

  const groupedTransactions = filteredTransactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
    const date = format(transaction.date, 'dd MMMM yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Transaction History</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="appearance-none bg-gray-800 text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Transactions</option>
              <option value="send">Sent</option>
              <option value="receive">Received</option>
              <option value="swap">Swapped</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, txs]) => (
          <div key={date}>
            <div className="text-gray-400 text-sm mb-3">{date}</div>
            <div className="space-y-3">
              {txs.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full bg-opacity-10 ${getTransactionColor(tx.type)} bg-current`}>
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div>
                      <div className="text-white font-medium capitalize">
                        {tx.type === 'send' ? 'Sent' : tx.type === 'receive' ? 'Received' : 'Swapped'} {tx.symbol}
                      </div>
                      <div className="text-gray-400 text-sm">{tx.address}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getTransactionColor(tx.type)}`}>
                      {tx.type === 'send' ? '-' : '+'}
                      {tx.amount} {tx.symbol}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {format(tx.date, 'HH:mm')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
}
