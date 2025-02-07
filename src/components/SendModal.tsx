import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: any;
}

const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose, wallet }) => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethers.isAddress(toAddress)) {
      toast.error("Invalid recipient address");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Invalid amount");
      return;
    }

    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const walletData = JSON.parse(localStorage.getItem(`wallet_${wallet.address}`) || "");
      const signer = new ethers.Wallet(walletData.privateKey, provider);
      
      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount)
      });

      await tx.wait();
      toast.success("Transaction sent successfully!");
      setToAddress("");
      setAmount("");
      onClose();
    } catch (error: any) {
      console.error("Send transaction error:", error);
      toast.error(error.message || "Failed to send transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-6 text-left align-middle shadow-xl transition-all border border-gray-800/50">
                <Dialog.Title className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
                  Send ETH
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="toAddress" className="block text-sm font-medium text-gray-300 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      id="toAddress"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f1229]/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300"
                      placeholder="0x..."
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                      Amount (ETH)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.000000000000000001"
                      min="0"
                      className="w-full px-4 py-3 bg-[#0f1229]/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300"
                      placeholder="0.0"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-800/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-medium transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    >
                      {isLoading ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SendModal;
