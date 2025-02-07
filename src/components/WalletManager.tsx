import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useWallet } from '@/contexts/WalletContext';
import { ethers } from 'ethers';

export default function WalletManager() {
  const { 
    wallets, 
    generateNewWallet, 
    importWalletFromPrivateKey, 
    connectMetaMask,
    sendTransaction,
    isLoading,
    error 
  } = useWallet();

  const [privateKeyInput, setPrivateKeyInput] = useState('');
  const [sendDetails, setSendDetails] = useState({
    fromAddress: '',
    toAddress: '',
    amount: ''
  });

  const handleGenerateWallet = async () => {
    try {
      await generateNewWallet();
      toast.success('New wallet generated successfully');
    } catch (err) {
      toast.error('Failed to generate wallet');
    }
  };

  const handleImportWallet = async () => {
    try {
      // Validate private key
      if (!ethers.utils.isAddress(ethers.utils.computeAddress(privateKeyInput))) {
        toast.error('Invalid private key');
        return;
      }

      await importWalletFromPrivateKey(privateKeyInput);
      setPrivateKeyInput('');
      toast.success('Wallet imported successfully');
    } catch (err) {
      toast.error('Failed to import wallet');
    }
  };

  const handleConnectMetaMask = async () => {
    try {
      await connectMetaMask();
      toast.success('MetaMask connected successfully');
    } catch (err) {
      toast.error('Failed to connect MetaMask');
    }
  };

  const handleSendTransaction = async () => {
    try {
      const { fromAddress, toAddress, amount } = sendDetails;
      
      // Validate inputs
      if (!fromAddress || !toAddress || !amount) {
        toast.error('Please fill in all transaction details');
        return;
      }

      const txHash = await sendTransaction(fromAddress, toAddress, amount);
      toast.success(`Transaction sent successfully. Hash: ${txHash}`);
    } catch (err) {
      toast.error('Failed to send transaction');
    }
  };

  return (
    <div className="p-6 bg-[#13141B] text-white">
      <h1 className="text-2xl font-bold mb-6">Wallet Management</h1>

      {/* Wallet Actions */}
      <div className="mb-6">
        <h2 className="text-xl mb-4">Wallet Actions</h2>
        <div className="flex space-x-4">
          <button 
            onClick={handleGenerateWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Generate New Wallet
          </button>
          
          <button 
            onClick={handleConnectMetaMask}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Connect MetaMask
          </button>
        </div>
      </div>

      {/* Import Wallet */}
      <div className="mb-6">
        <h2 className="text-xl mb-4">Import Wallet</h2>
        <div className="flex space-x-4">
          <input 
            type="text" 
            value={privateKeyInput}
            onChange={(e) => setPrivateKeyInput(e.target.value)}
            placeholder="Enter Private Key"
            className="flex-grow px-4 py-2 bg-[#2A2A3C] text-white rounded"
          />
          <button 
            onClick={handleImportWallet}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Import Wallet
          </button>
        </div>
      </div>

      {/* Wallet List */}
      <div className="mb-6">
        <h2 className="text-xl mb-4">Your Wallets</h2>
        {wallets.length === 0 ? (
          <p className="text-gray-400">No wallets found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallets.map((wallet) => (
              <div 
                key={wallet._id} 
                className="bg-[#2A2A3C] p-4 rounded-lg"
              >
                <p className="font-bold">{wallet.name}</p>
                <p className="text-sm text-gray-400">{wallet.address}</p>
                <p className="text-sm">
                  Balance: {wallet.balance || '0'} ETH
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send Transaction */}
      <div className="mb-6">
        <h2 className="text-xl mb-4">Send Transaction</h2>
        <div className="space-y-4">
          <input 
            type="text" 
            value={sendDetails.fromAddress}
            onChange={(e) => setSendDetails({...sendDetails, fromAddress: e.target.value})}
            placeholder="From Address"
            className="w-full px-4 py-2 bg-[#2A2A3C] text-white rounded"
          />
          <input 
            type="text" 
            value={sendDetails.toAddress}
            onChange={(e) => setSendDetails({...sendDetails, toAddress: e.target.value})}
            placeholder="To Address"
            className="w-full px-4 py-2 bg-[#2A2A3C] text-white rounded"
          />
          <input 
            type="text" 
            value={sendDetails.amount}
            onChange={(e) => setSendDetails({...sendDetails, amount: e.target.value})}
            placeholder="Amount (ETH)"
            className="w-full px-4 py-2 bg-[#2A2A3C] text-white rounded"
          />
          <button 
            onClick={handleSendTransaction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            disabled={isLoading}
          >
            Send Transaction
          </button>
        </div>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-600 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
    </div>
  );
}
