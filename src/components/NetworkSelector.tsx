import { useWalletStore } from '../store/walletStore';

const NETWORKS = [
  { id: 'homestead', name: 'Ethereum Mainnet' },
  { id: 'goerli', name: 'Goerli Testnet' },
  { id: 'sepolia', name: 'Sepolia Testnet' },
];

export const NetworkSelector = () => {
  const network = useWalletStore((state) => state.network);
  const setNetwork = useWalletStore((state) => state.setNetwork);

  return (
    <select
      value={network}
      onChange={(e) => setNetwork(e.target.value)}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      {NETWORKS.map((net) => (
        <option key={net.id} value={net.id}>
          {net.name}
        </option>
      ))}
    </select>
  );
};
