import React, { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { format } from "date-fns";
import {
  WalletIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowsRightLeftIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import SendModal from "./SendModal";
import ImportWalletModal from "./ImportWalletModal";
import { ethers } from "ethers";

export default function WalletDashboard() {
  const {
    wallets,
    selectedWallet,
    setSelectedWallet,
    connectMetaMask,
    transactions,
    refreshTransactions,
    error,
    isLoading,
  } = useWallet();

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isImportWalletModalOpen, setIsImportWalletModalOpen] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState("all");

  // Current selected wallet or first wallet
  const currentWallet =
    wallets.find((w) => w._id === selectedWallet) || wallets[0];
  const balance = currentWallet?.balance || "0";

  // Filtered transactions
  const filteredTransactions = (transactions || []).filter((tx) => {
    if (transactionFilter === "all") return true;
    return tx.type === transactionFilter;
  });

  // Copy wallet address to clipboard
  const copyAddressToClipboard = () => {
    if (currentWallet?.address) {
      navigator.clipboard.writeText(currentWallet.address);
    }
  };

  const generateNewWallet = async () => {
    try {
      // Generate a new wallet
      const wallet = ethers.Wallet.createRandom();

      // Prepare wallet object
      const newWallet = {
        walletAddress: wallet.address,
        encryptedPrivateKey: wallet.privateKey, // You should encrypt this before saving
        name: `Wallet ${wallet.address.slice(0, 6)}...`, // Give it a default name
        balance: "0", // Initial balance
        userId: "your_user_id_here", // Replace with actual user ID
        mnemonic: wallet.mnemonic?.phrase, // Optional: store the mnemonic
      };

      // Save the wallet using WalletService
      const savedWallet = await WalletService.saveWallet(newWallet);
      setSelectedWallet(savedWallet.walletAddress);
    } catch (error) {
      console.error("Error generating new wallet:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-24 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Wallet Selector and Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <WalletIcon className="w-8 h-8 text-purple-500" />
            <select
              value={selectedWallet || ""}
              onChange={(e) => setSelectedWallet(e.target.value)}
              className="bg-[#2a2a3e] text-white p-2 rounded-xl"
            >
              {wallets.map((wallet) => (
                <option key={wallet._id} value={wallet._id}>
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
              <button
                onClick={connectMetaMask}
                className="bg-blue-600/20 hover:bg-blue-600/40 p-2 rounded-full transition"
                title="Connect MetaMask"
              >
                <img
                  src="./MetamaskIcon.png"
                  alt="MetaMask"
                  className="w-5 h-5"
                />
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
            <p className="text-4xl font-bold text-white">{balance} ETH</p>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <button
              onClick={() => setIsSendModalOpen(true)}
              className="flex flex-col items-center justify-center bg-purple-600/10 hover:bg-purple-600/20 p-4 rounded-xl transition"
            >
              <ArrowUpIcon className="w-6 h-6 text-purple-400 mb-2" />
              <span className="text-sm">Send</span>
            </button>
            {/* <button className="flex flex-col items-center justify-center bg-green-600/10 hover:bg-green-600/20 p-4 rounded-xl transition">
              <ArrowDownIcon className="w-6 h-6 text-green-400 mb-2" />
              <span className="text-sm">Receive</span>
            </button> */}
            <button className="flex flex-col items-center justify-center bg-blue-600/10 hover:bg-blue-600/20 p-4 rounded-xl transition">
              <ArrowsRightLeftIcon className="w-6 h-6 text-blue-400 mb-2" />
              <span className="text-sm">Swap</span>
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-purple-300">
              Transaction History
            </h3>
            <div className="flex space-x-2">
              {["all", "send", "receive"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTransactionFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm capitalize transition ${
                    transactionFilter === filter
                      ? "bg-purple-600 text-white"
                      : "bg-[#2a2a3e] text-gray-400 hover:bg-purple-600/20"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.hash}
                  className="flex items-center justify-between bg-[#2a2a3e] p-4 rounded-lg hover:bg-[#3a3a4e] transition"
                >
                  <div className="flex items-center space-x-4">
                    {tx.type === "send" ? (
                      <ArrowUpIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <ArrowDownIcon className="w-6 h-6 text-green-500" />
                    )}
                    <div>
                      <p className="text-white capitalize">
                        {tx.type} Transaction
                      </p>
                      <p className="text-sm text-gray-400">
                        {format(new Date(tx.timestamp), "MMM dd, yyyy HH:mm")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        tx.type === "send" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {tx.amount} ETH
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No transactions found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
     
      <ImportWalletModal
        isOpen={isImportWalletModalOpen}
        onClose={() => setIsImportWalletModalOpen(false)}
      />
    </div>
  );
}
