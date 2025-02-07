import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  DocumentDuplicateIcon 
} from '@heroicons/react/24/solid';
import { useWalletStore } from '@/store/walletStore';
import toast, { Toaster } from 'react-hot-toast';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'send' | 'receive';
  selectedWallet?: SerializedWallet;
}

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  type, 
  selectedWallet 
}: TransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const { accounts } = useWalletStore();

  const handleCopyAddress = () => {
    if (selectedWallet?.address) {
      navigator.clipboard.writeText(selectedWallet.address);
      toast.success('Address copied to clipboard!', {
        style: {
          background: '#23252A',
          color: '#4ADE80',
          border: '1px solid #10B981'
        }
      });
    }
  };

  const handleTransaction = () => {
    try {
      if (type === 'send') {
        // Validate send transaction
        if (!address || !amount) {
          toast.error('Please enter a valid address and amount', {
            style: {
              background: '#23252A',
              color: '#F87171',
              border: '1px solid #EF4444'
            }
          });
          return;
        }
        // Implement send logic
        toast.success('Transaction sent successfully!', {
          style: {
            background: '#23252A',
            color: '#4ADE80',
            border: '1px solid #10B981'
          }
        });
      } else {
        // Receive logic (typically just showing the wallet address)
        toast.success('Receive address generated!', {
          style: {
            background: '#23252A',
            color: '#4ADE80',
            border: '1px solid #10B981'
          }
        });
      }
      onClose();
    } catch (error) {
      toast.error('Transaction failed', {
        style: {
          background: '#23252A',
          color: '#F87171',
          border: '1px solid #EF4444'
        }
      });
      console.error(error);
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#23252A',
            color: '#ffffff',
            border: '1px solid #2A2C31'
          }
        }}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={onClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#23252A] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title 
                    as="h3" 
                    className="text-2xl font-bold leading-6 text-white mb-6 flex items-center"
                  >
                    {type === 'send' ? (
                      <>
                        <ArrowUpIcon className="h-6 w-6 mr-2 text-red-500" />
                        Send {selectedWallet?.type?.toUpperCase()}
                      </>
                    ) : (
                      <>
                        <ArrowDownIcon className="h-6 w-6 mr-2 text-green-500" />
                        Receive {selectedWallet?.type?.toUpperCase()}
                      </>
                    )}
                  </Dialog.Title>

                  <div className="space-y-4">
                    {type === 'send' ? (
                      <>
                        <div>
                          <label className="block text-white mb-2">Recipient Address</label>
                          <input 
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter recipient address"
                            className="w-full bg-[#1A1B1F] text-white px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
                          />
                        </div>
                        <div>
                          <label className="block text-white mb-2">Amount</label>
                          <input 
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full bg-[#1A1B1F] text-white px-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F7931A]"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="bg-[#1A1B1F] p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Your {selectedWallet?.type?.toUpperCase()} Address</p>
                          <p className="text-gray-400 text-sm break-all">
                            {selectedWallet?.address || 'No address generated'}
                          </p>
                        </div>
                        <button 
                          onClick={handleCopyAddress}
                          className="bg-[#23252A] text-white p-2 rounded-full hover:bg-[#2A2C31] transition-colors"
                        >
                          <DocumentDuplicateIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-[#2A2C31] text-gray-400 py-3 rounded-lg hover:bg-[#1A1B1F] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleTransaction}
                      className="flex-1 py-3 rounded-lg transition-colors bg-[#F7931A] text-white hover:bg-[#FF9D3F]"
                    >
                      {type === 'send' ? 'Send' : 'Copy Address'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
