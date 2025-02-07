import { useWalletStore } from '../store/walletStore';

export const CreateAccount = () => {
  const createAccount = useWalletStore((state) => state.createAccount);
  const importAccount = useWalletStore((state) => state.importAccount);
  
  const handleImport = () => {
    const privateKey = prompt('Enter private key:');
    if (privateKey) {
      importAccount(privateKey);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={createAccount}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Create New Account
      </button>
      <button
        onClick={handleImport}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Import Account
      </button>
    </div>
  );
};
