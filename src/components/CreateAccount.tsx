import { useWalletStore } from '../store/walletStore';
import { useState } from 'react';

export const CreateAccount = () => {
  const [walletName, setWalletName] = useState('');
  const [password, setPassword] = useState('');
  const createWallet = useWalletStore((state) => state.createWallet);
  const importWalletWithPrivateKey = useWalletStore((state) => state.importWalletWithPrivateKey);
  
  const handleCreate = () => {
    const name = prompt('Enter wallet name:') || 'My Wallet';
    const pass = prompt('Create a password:') || '';
    if (name && pass) {
      createWallet(name, pass);
    }
  };

  const handleImport = () => {
    const name = prompt('Enter wallet name:') || 'Imported Wallet';
    const privateKey = prompt('Enter private key:');
    const pass = prompt('Create a password:') || '';
    if (privateKey && name && pass) {
      importWalletWithPrivateKey(name, privateKey, pass);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleCreate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Create New Wallet
      </button>
      <button
        onClick={handleImport}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Import Wallet
      </button>
    </div>
  );
};
