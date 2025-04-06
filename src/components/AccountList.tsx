import { useWalletStore } from '../store/walletStore';
import QRCode from 'react-qr-code';

export const AccountList = () => {
  const wallets = useWalletStore((state) => state.wallets);
  const selectedWallet = useWalletStore((state) => state.selectedWallet);
  const selectWallet = useWalletStore((state) => state.selectWallet);

  if (wallets.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No accounts created yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {wallets.map((wallet, index) => (
        <div
          key={wallet.address}
          className={`p-4 rounded-lg border-2 cursor-pointer ${
            wallet.id === selectedWallet
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => selectWallet(wallet.id)}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="font-medium">{wallet.name}</div>
              <div className="text-sm text-gray-500 break-all">
                {wallet.address}
              </div>
              <div className="text-lg font-bold">
                {wallet.balance} ETH
              </div>
            </div>
            {wallet.id === selectedWallet && (
              <div className="p-2 bg-white rounded">
                <QRCode value={wallet.address} size={64} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
