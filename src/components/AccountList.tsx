import { useWalletStore } from '../store/walletStore';
import QRCode from 'react-qr-code';

export const AccountList = () => {
  const accounts = useWalletStore((state) => state.accounts);
  const selectedAccount = useWalletStore((state) => state.selectedAccount);
  const selectAccount = useWalletStore((state) => state.selectAccount);

  if (accounts.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No accounts created yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accounts.map((account, index) => (
        <div
          key={account.address}
          className={`p-4 rounded-lg border-2 cursor-pointer ${
            index === selectedAccount
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => selectAccount(index)}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="font-medium">Account {index + 1}</div>
              <div className="text-sm text-gray-500 break-all">
                {account.address}
              </div>
              <div className="text-lg font-bold">
                {account.balance} ETH
              </div>
            </div>
            {index === selectedAccount && (
              <div className="p-2 bg-white rounded">
                <QRCode value={account.address} size={64} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
