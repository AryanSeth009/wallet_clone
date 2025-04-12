'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

interface SendTransactionProps {
  provider: ethers.BrowserProvider;
  address: string;
}

export default function SendTransaction({ provider, address }: SendTransactionProps) {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('0.1');
  const [isSending, setIsSending] = useState(false);

  const handleSendTransaction = async () => {
    if (!recipientAddress || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSending(true);
      
      // Get the signer
      const signer = await provider.getSigner();
      
      // Convert amount to wei
      const amountInWei = ethers.parseEther(amount);
      
      // Send transaction
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountInWei
      });
      
      // Wait for transaction to be mined
      await tx.wait();
      
      toast.success(`Transaction sent! Hash: ${tx.hash}`);
      
      // Clear form
      setRecipientAddress('');
      setAmount('0.1');
    } catch (error) {
      console.error('Error sending transaction:', error);
      toast.error('Failed to send transaction');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-purple-300">Send Transaction</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          From Address
        </label>
        <input
          type="text"
          value={address}
          readOnly
          className="w-full px-4 py-2 bg-[#2a2a3e] text-gray-400 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          To Address
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
        onClick={handleSendTransaction}
        disabled={isSending}
        className={`w-full px-4 py-2 rounded-lg ${
          isSending
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        } text-white`}
      >
        {isSending ? 'Sending...' : 'Send Transaction'}
      </button>
    </div>
  );
}
