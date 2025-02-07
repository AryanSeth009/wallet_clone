import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useWalletStore } from '../stores/walletStore';
import { generateWallet } from '../utils/walletGenerator';
import { toast } from 'react-hot-toast';
import { useWallet } from '@/contexts/WalletContext';
interface CreateWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletCreated: (privateKey: string) => void;
}

export default function CreateWalletModal({ 
  isOpen, 
  onClose, 
  onWalletCreated 
}: CreateWalletModalProps) {
  const [walletName, setWalletName] = useState('');
  const [walletType, setWalletType] = useState('btc');
  const [isCreating, setIsCreating] = useState(false);
  const { createWallet } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletName || !walletType) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsCreating(true);
      const result = await createWallet(walletName, walletType);
      
      // Callback to parent component with private key
      onWalletCreated(result.privateKey);
      
      toast.success('Wallet created successfully');
      
      // Reset form
      setWalletName('');
      setWalletType('btc');
      onClose();
    } catch (error) {
      toast.error('Failed to create wallet');
      console.error('Failed to create wallet:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const walletTypes = [
    { id: 'btc', name: 'Bitcoin (BTC)' },
    { id: 'eth', name: 'Ethereum (ETH)' },
    { id: 'bnb', name: 'Binance Coin (BNB)' },
    { id: 'shard', name: 'Shard (SHARD)' },
    { id: 'mrx', name: 'Metrix (MRX)' },
  ];

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-[#2A2A3C] p-6 w-full">
          <Dialog.Title className="text-lg font-medium text-white mb-4">
            Create New Wallet
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="walletName" className="block text-sm font-medium text-gray-300">
                Wallet Name
              </label>
              <input
                type="text"
                id="walletName"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-[#1E1E2F] border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F7931A]"
                placeholder="My Bitcoin Wallet"
              />
            </div>

            <div>
              <label htmlFor="walletType" className="block text-sm font-medium text-gray-300">
                Wallet Type
              </label>
              <select
                id="walletType"
                value={walletType}
                onChange={(e) => setWalletType(e.target.value)}
                className="mt-1 block w-full rounded-md bg-[#1E1E2F] border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F7931A]"
              >
                {walletTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-4 py-2 rounded-md bg-[#F7931A] text-white hover:bg-[#E88A19] disabled:opacity-50"
              >
                {isCreating ? 'Creating...' : 'Create Wallet'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
