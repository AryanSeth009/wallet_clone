import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { useWallet } from '@/contexts/WalletContext';

interface ImportWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportWalletModal({ 
  isOpen, 
  onClose 
}: ImportWalletModalProps) {
  const [walletName, setWalletName] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const { importWalletFromPrivateKey } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletName || !privateKey) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsImporting(true);
      
      await importWalletFromPrivateKey(privateKey.trim(), walletName);
      
      toast.success('Wallet imported successfully');
      
      // Reset form
      setWalletName('');
      setPrivateKey('');
      
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to import wallet');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-[#2A2A3C] p-6 w-full">
          <Dialog.Title className="text-lg font-medium text-white mb-4">
            Import Ethereum Wallet
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
                className="mt-1 block w-full rounded-md bg-[#1E1E2F] border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="My Imported Wallet"
              />
            </div>

            <div>
              <label htmlFor="privateKey" className="block text-sm font-medium text-gray-300">
                Private Key
              </label>
              <textarea
                id="privateKey"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="mt-1 block w-full rounded-md bg-[#1E1E2F] border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 h-24"
                placeholder="Paste your Ethereum private key here"
              />
              <p className="text-xs text-yellow-400 mt-2">
                ⚠️ WARNING: Never share your private key with anyone
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isImporting}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isImporting}
                className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#2A2A3C] disabled:opacity-50"
              >
                {isImporting ? 'Importing...' : 'Import Wallet'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
