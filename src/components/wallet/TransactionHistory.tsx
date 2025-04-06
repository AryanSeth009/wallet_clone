import React from 'react';

interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'swapped';
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onFilterChange: (filter: string) => void;
  onDateRangeChange: (from: Date, to: Date) => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  onFilterChange,
  onDateRangeChange,
}) => {
  return (
    <div className="bg-[#1A1B23] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Transaction History</h3>
        <div className="flex gap-4">
          <select 
            className="bg-[#2A2A3C] rounded-md px-4 py-2"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="sent">Sent</option>
            <option value="received">Received</option>
            <option value="swapped">Swapped</option>
          </select>
          <input
            type="date"
            className="bg-[#2A2A3C] rounded-md px-4 py-2"
            placeholder="From"
            onChange={(e) => {
              const to = document.querySelector<HTMLInputElement>('input[type="date"]:last-child')?.value;
              onDateRangeChange(new Date(e.target.value), to ? new Date(to) : new Date());
            }}
          />
          <input
            type="date"
            className="bg-[#2A2A3C] rounded-md px-4 py-2"
            placeholder="To"
            onChange={(e) => {
              const from = document.querySelector<HTMLInputElement>('input[type="date"]:first-child')?.value;
              onDateRangeChange(from ? new Date(from) : new Date(), new Date(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="space-y-4">
        {Array.isArray(transactions) && transactions.length > 0 ? transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex justify-between items-center p-4 bg-[#2A2A3C] rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'received' ? 'bg-green-500/20' : 
                transaction.type === 'sent' ? 'bg-red-500/20' : 'bg-blue-500/20'
              }`}>
                <span className={`text-2xl ${
                  transaction.type === 'received' ? 'text-green-500' : 
                  transaction.type === 'sent' ? 'text-red-500' : 'text-blue-500'
                }`}>
                  {transaction.type === 'received' ? '↓' : 
                   transaction.type === 'sent' ? '↑' : '↔'}
                </span>
              </div>
              <div>
                <p className="font-medium">
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </p>
                <p className="text-sm text-gray-400">
                  {transaction.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                transaction.type === 'received' ? 'text-green-500' : 
                transaction.type === 'sent' ? 'text-red-500' : 'text-blue-500'
              }`}>
                {transaction.type === 'sent' ? '-' : '+'}{transaction.amount} {transaction.currency}
              </p>
              <p className="text-sm text-gray-400">
                {transaction.status}
              </p>
            </div>
          </div>
        )) : <p>No transactions available.</p>}
      </div>
    </div>
  );
};

export default TransactionHistory;
