"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  DocumentDuplicateIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useWallet } from "@/contexts/WalletContext";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";
import SendModal from "@/components/SendModal";

export default function WalletSidebar() {
  const { data: session } = useSession();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [metamaskAddress, setMetamaskAddress] = useState<string | null>(null);
  const [metamaskBalance, setMetamaskBalance] = useState<string>("0");
  const [selectedWalletForSend, setSelectedWalletForSend] = useState<any>(null);
  const {
    createWallet,
    isLoading,
    wallets,
    setSelectedWallet,
    selectedWallet,
  } = useWallet();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const address = accounts[0];
          setMetamaskAddress(address);
          await updateMetaMaskBalance(address);
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const updateMetaMaskBalance = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      setMetamaskBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const connectMetaMask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setMetamaskAddress(address);
        await updateMetaMaskBalance(address);
        toast.success("MetaMask connected successfully!");

        // Listen for account changes
        window.ethereum.on('accountsChanged', async (newAccounts: string[]) => {
          if (newAccounts.length > 0) {
            setMetamaskAddress(newAccounts[0]);
            await updateMetaMaskBalance(newAccounts[0]);
          } else {
            setMetamaskAddress(null);
            setMetamaskBalance("0");
          }
        });
      } else {
        toast.error("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast.error("Failed to connect to MetaMask");
    }
  };

  console.log("createWallet function:", createWallet);

  const handleCopyAddress = (address: string) => {
    try {
      // Copy to clipboard
      navigator.clipboard
        .writeText(address)
        .then(() => {
          // Optional: Show a temporary tooltip or toast
          toast.success("Address copied to clipboard", {
            position: "bottom-right",
            duration: 2000,
            style: {
              background: "#4CAF50",
              color: "white",
            },
          });
        })
        .catch((err) => {
          console.error("Failed to copy address:", err);
          toast.error("Failed to copy address");
        });
    } catch (error) {
      console.error("Clipboard copy error:", error);
      toast.error("Clipboard access failed");
    }
  };

  const handleCreateWallet = async () => {
    if (!walletName.trim()) {
      toast.error("Please enter a wallet name");
      return;
    }

    try {
      await createWallet(walletName);
      setWalletName("");
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create wallet");
    }
  };

  if (!session?.user?.id) {
    return (
      <div className="w-96 bg-gray-900 h-full p-4 flex items-center justify-center">
        <p className="text-gray-500">Please sign in to manage wallets</p>
      </div>
    );
  }

  return (
    <div className="w-[320px] pt-14 h-full bg-gradient-to-b from-[#0a0a1a] to-[#131326] border-r border-gray-800/50 shadow-2xl flex flex-col overflow-hidden">
      {/* Wallet Header */}
      <div className="bg-gradient-to-r from-[#1a1a2e]/80 to-[#16213e]/80 p-8 border-b border-gray-800/30 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2
              className="text-3xl font-sans font-bold
             text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-wider animate-gradient"
            >
              My Wallets
            </h2>
            <p className="text-sm text-gray-400 mt-2 flex items-center space-x-2">
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                Network: Sepolia
              </span>
              <span className="text-gray-600">|</span>
              <span>Total Wallets: {wallets?.length || 0}</span>
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="group relative p-4 bg-[#0f1229]/80 hover:bg-[#1a1e3c] rounded-xl transition-all duration-300 ease-in-out hover:scale-105 backdrop-blur-sm border border-gray-700/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
              {wallets?.length || 0}
            </span>
          </button>
        </div>
      </div>

      {/* Wallet List */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4 scrollbar-thin scrollbar-track-[#0a0a1a] scrollbar-thumb-gray-700">
        {/* MetaMask Wallet */}
        {metamaskAddress ? (
          <div className="group p-4 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm border bg-[#1a1a2e]/50 border-orange-500/30 hover:border-orange-500/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500/20">
                  <img
                    src="./MetamaskIcon.png"
                    alt="MetaMask"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">MetaMask</h3>
                  <p className="text-sm text-gray-400">Connected</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-200">
                  {parseFloat(metamaskBalance).toFixed(4)} ETH
                </p>
                <p className="text-sm text-gray-400">≈ $0.00</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyAddress(metamaskAddress);
                }}
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-200"
              >
                <span>
                  {metamaskAddress.slice(0, 10)}...{metamaskAddress.slice(-4)}
                </span>
                <DocumentDuplicateIcon className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  <ArrowDownIcon className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                  <ArrowUpIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={connectMetaMask}
            className="w-full p-4 rounded-xl transition-all duration-300 backdrop-blur-sm border bg-[#1a1a2e]/50 border-orange-500/30 hover:border-orange-500/50"
          >
            <div className="flex items-center justify-center space-x-3">
              <Image
                src="/metamask.svg"
                alt="MetaMask"
                width={24}
                height={24}
              />
              <span className="text-gray-200 font-semibold">
                Connect MetaMask
              </span>
            </div>
          </button>
        )}

        {/* Existing wallets */}
        {wallets?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No Wallets Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first wallet to start managing your crypto assets
            </p>
          </div>
        ) : (
          wallets?.map((wallet) => (
            <div
              key={wallet._id}
              onClick={() => setSelectedWallet(wallet._id)}
              className={`group p-4 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm border
                ${
                  selectedWallet === wallet._id
                    ? "bg-purple-500/10 border-purple-500/50"
                    : "bg-[#1a1a2e]/50 border-gray-800/30 hover:border-purple-500/30"
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      selectedWallet === wallet._id
                        ? "bg-purple-500/20"
                        : "bg-gray-800/50 group-hover:bg-purple-500/10"
                    }`}
                  >
                    <span className="text-xl">⟠</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200">
                      {wallet.name}
                    </h3>
                    <p className="text-sm text-gray-400">ETH</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-200">
                    {wallet.balance || "0.00"} ETH
                  </p>
                  <p className="text-sm text-gray-400">≈ $0.00</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyAddress(wallet.address);
                  }}
                  className="flex items-center space-x-1 text-gray-400 hover:text-gray-200"
                >
                  <span>
                    {wallet.address.slice(0, 10)}...
                    {wallet.address.slice(-4)}
                  </span>
                  <DocumentDuplicateIcon className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20">
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWalletForSend(wallet);
                      setIsSendModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                  >
                    <ArrowUpIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Wallet CTA */}
      <div className="p-6 bg-[#0f1229]/80 border-t border-gray-800/30 backdrop-blur-sm">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="
            w-full flex items-center justify-center space-x-3 
            p-5 rounded-xl 
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
            hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
            text-white font-bold tracking-wider 
            transform hover:scale-[1.02] 
            transition-all duration-300 
            shadow-xl hover:shadow-2xl hover:shadow-purple-500/20
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0f1229]
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-lg">Create New Wallet</span>
        </button>
      </div>

      {/* Modals */}
      <SendModal
        isOpen={isSendModalOpen}
        onClose={() => {
          setIsSendModalOpen(false);
          setSelectedWalletForSend(null);
        }}
        wallet={selectedWalletForSend}
      />

      {/* Wallet Creation Modal with enhanced styling */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-2xl w-[400px] p-8 border border-gray-800/50"
            >
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
                Create New Wallet
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                  <label
                    htmlFor="walletName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Wallet Name
                  </label>
                  <input
                    type="text"
                    id="walletName"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                    placeholder="Enter wallet name (optional)"
                    className="
                      w-full px-4 py-3 
                      bg-[#0f1229]/80 
                      border border-gray-700/50
                      focus:border-purple-500/50 
                      rounded-xl
                      text-white 
                      placeholder-gray-500
                      transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-purple-500/20
                    "
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="
                      flex-1 px-4 py-3 
                      border border-gray-700 
                      rounded-xl
                      text-gray-300 
                      hover:bg-gray-800/50
                      transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-gray-500/20
                    "
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleCreateWallet}
                    className="
                      flex-1 px-4 py-3
                      bg-gradient-to-r from-blue-600 to-purple-600
                      hover:from-blue-700 hover:to-purple-700
                      rounded-xl
                      text-white font-medium
                      transform hover:scale-[1.02]
                      transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed
                      focus:outline-none focus:ring-2 focus:ring-purple-500/20
                    "
                  >
                    {isLoading ? "Creating..." : "Create Wallet"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
