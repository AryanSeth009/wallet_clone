'use client';

import { useState } from 'react';
import { testWalletConnection, testSendTransaction, testTransactionHistory } from '@/utils/testWallet';
import { toast } from 'react-hot-toast';

// Define the type for test results
interface TestResults {
  connection?: any;
  send?: any;
  history?: any;
}

export default function TestPage() {
  const [testAddress, setTestAddress] = useState('');
  const [testAmount, setTestAmount] = useState('0.001');
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const runConnectionTest = async () => {
    const result = await testWalletConnection();
    setTestResults({ connection: result });
    if (result.success) {
      toast.success('Wallet connection successful!');
    } else {
      toast.error(`Connection failed: ${result.error}`);
    }
  };

  const runSendTest = async () => {
    if (!testAddress) {
      toast.error('Please enter a test address');
      return;
    }
    const result = await testSendTransaction(testAddress, testAmount);
    setTestResults((prev: TestResults | null) => ({ ...prev, send: result }));
    if (result.success) {
      toast.success('Transaction sent successfully!');
    } else {
      toast.error(`Transaction failed: ${result.error}`);
    }
  };

  const runHistoryTest = async () => {
    if (!testAddress) {
      toast.error('Please enter a test address');
      return;
    }
    const result = await testTransactionHistory(testAddress);
    setTestResults((prev: TestResults | null) => ({ ...prev, history: result }));
    if (result.success) {
      toast.success('Transaction history fetched successfully!');
    } else {
      toast.error(`History fetch failed: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white mb-8">Wallet Functionality Test</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Test Address
            </label>
            <input
              type="text"
              value={testAddress}
              onChange={(e) => setTestAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-2 bg-[#2a2a3e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Test Amount (ETH)
            </label>
            <input
              type="number"
              value={testAmount}
              onChange={(e) => setTestAmount(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a3e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={runConnectionTest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Test Connection
            </button>
            <button
              onClick={runSendTest}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Test Send
            </button>
            <button
              onClick={runHistoryTest}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Test History
            </button>
          </div>
        </div>

        {testResults && (
          <div className="mt-8 p-4 bg-[#1a1a2e] rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Test Results</h2>
            <pre className="text-sm text-gray-400 overflow-auto">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 