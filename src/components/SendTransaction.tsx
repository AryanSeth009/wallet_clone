'use client';

import { useState, useEffect } from 'react';
import { useWalletStore } from '@/store/walletStore';
import { QRCodeSVG } from 'qrcode.react';
import QrScanner from 'react-qr-scanner';

export default function SendTransaction() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null);

  const {
    accounts,
    selectedAccount,
    selectAccount,
    sendTransaction,
    estimateGas,
    isLoading,
    error,
    createWallet,
  } = useWalletStore();

  const currentAccount = accounts[selectedAccount];

  useEffect(() => {
    console.log('Current accounts:', accounts);
    console.log('Selected account:', selectedAccount);
    console.log('Current account:', currentAccount);
  }, [accounts, selectedAccount, currentAccount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !amount || !currentAccount) return;
    
    try {
      await sendTransaction(to, amount);
      setTo('');
      setAmount('');
      alert('Transaction sent successfully!');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    }
  };

  const handleScan = (data: string | null) => {
    if (data) {
      const address = data.toLowerCase();
      if (address.startsWith('0x') && address.length === 42) {
        setTo(address);
        setShowQRScanner(false);
      }
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    alert('Error scanning QR code. Please try again.');
    setShowQRScanner(false);
  };

  const handleAmountChange = async (value: string) => {
    setAmount(value);
    if (value && to && currentAccount) {
      try {
        const gas = await estimateGas(to, value);
        setEstimatedGas(gas);
      } catch (error) {
        console.error('Error estimating gas:', error);
        setEstimatedGas(null);
      }
    }
  };

  if (accounts.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-4">No wallets found. Create a wallet to make transactions.</p>
        <button
          onClick={() => createWallet()}
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isLoading ? 'Creating Wallet...' : 'Create New Wallet'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Wallet Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Wallet
          </label>
          <select
            value={selectedAccount}
            onChange={(e) => selectAccount(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {accounts.map((account, index) => (
              <option key={account.address} value={index}>
                {account.address.substring(0, 6)}...{account.address.substring(38)} ({account.balance} ETH)
              </option>
            ))}
          </select>
        </div>

        {/* From Address Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Address
          </label>
          <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded break-all">
            {currentAccount?.address || 'No account selected'}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Balance: {currentAccount?.balance || '0'} ETH
          </div>
        </div>

        {/* Recipient Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0x..."
            />
            <button
              type="button"
              onClick={() => setShowQRScanner(!showQRScanner)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Scan QR
            </button>
          </div>
        </div>

        {showQRScanner && (
          <div className="mt-4">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
              constraints={{
                video: { facingMode: "environment" }
              }}
            />
          </div>
        )}

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            step="0.000000000000000001"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0.0"
          />
          {estimatedGas && (
            <div className="text-sm text-gray-600 mt-1">
              Estimated Gas: {estimatedGas} gwei
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-2/3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={!to || !amount || isLoading || !currentAccount}
          >
            {isLoading ? 'Sending...' : 'Send Transaction'}
          </button>
          
          <button
            type="button"
            onClick={() => setShowQRCode(!showQRCode)}
            className="w-1/4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            {showQRCode ? 'Hide QR' : 'Show QR'}
          </button>
        </div>
      </form>

      {/* QR Code Display */}
      {showQRCode && currentAccount && (
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-700 mb-2">Your Wallet QR Code</p>
          <div className="inline-block p-4 bg-white rounded-lg shadow-md">
            <QRCodeSVG
              value={currentAccount.address}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
    </div>
  );
}
