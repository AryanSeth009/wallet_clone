import React, { useState, useEffect } from "react";
import { useWalletStore } from "@/store/walletStore";
import { format } from "date-fns";
import {
  WalletIcon,
  PlusIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import ImportWalletModal from "./ImportWalletModal";
import { ethers } from "ethers";
import SendTransaction from "./SendTransaction";
import TransactionHistory from "./TransactionHistory";

export default function WalletDashboard() {
  const {
    wallets,
    selectedWallet,
    selectWallet,
    isLoading,
    error,
    createWallet,
  } = useWalletStore();

  const [isImportWalletModalOpen, setIsImportWalletModalOpen] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // Current selected wallet or first wallet
  const currentWallet = wallets.find((w) => w.id === selectedWallet) || wallets[0];

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  // Copy wallet address to clipboard
  const copyAddressToClipboard = () => {
    if (currentWallet?.address) {
      navigator.clipboard.writeText(currentWallet.address);
    }
  };

  const generateNewWallet = async () => {
    try {
      const walletName = `Wallet ${Date.now().toString().slice(-6)}`;
      const password = prompt("Enter a password to encrypt your wallet:");
      
      if (password) {
        await createWallet(walletName, password);
      }
    } catch (error) {
      console.error("Error generating new wallet:", error);
    }
  };

  if (!currentWallet) {
    return (
      <div className="min-h-screen bg-gradient-to-br pt-24 text-white p-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl mb-4">No wallet found</p>
          <button
            onClick={generateNewWallet}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Create New Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-24 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Wallet Selector and Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <WalletIcon className="w-8 h-8 text-purple-500" />
            <select
              value={selectedWallet || ""}
              onChange={(e) => selectWallet(e.target.value)}
              className="bg-[#2a2a3e] text-white p-2 rounded-xl"
            >
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name || "Unnamed Wallet"}
                </option>
              ))}
            </select>

            {/* Wallet Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => setIsImportWalletModalOpen(true)}
                className="bg-purple-600/20 hover:bg-purple-600/40 p-2 rounded-full transition"
                title="Import Wallet"
              >
                <PlusIcon className="w-5 h-5 text-purple-400" />
              </button>
              <button
                onClick={generateNewWallet}
                className="bg-green-600/20 hover:bg-green-600/40 p-2 rounded-full transition"
                title="Generate New Wallet"
              >
                <WalletIcon className="w-5 h-5 text-green-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-300">
              Wallet Balance
            </h2>
            <button
              onClick={copyAddressToClipboard}
              className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition"
            >
              <DocumentDuplicateIcon className="w-4 h-4" />
              <span>
                {currentWallet?.address?.slice(0, 6)}...
                {currentWallet?.address?.slice(-4)}
              </span>
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-white">{currentWallet.balance || "0"} ETH</p>
          </div>
        </div>

        {/* Send Transaction */}
        {provider && currentWallet?.address && (
          <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-6">
            <SendTransaction 
              provider={provider}
              address={currentWallet.address}
            />
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-6">
          <TransactionHistory address={currentWallet.address} />
        </div>
      </div>

      {/* Import Wallet Modal */}
      <ImportWalletModal
        isOpen={isImportWalletModalOpen}
        onClose={() => setIsImportWalletModalOpen(false)}
      />
    </div>
  );
}
