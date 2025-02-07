// Helper functions for wallet styling and display

/**
 * Get the background color class for a wallet type
 */
export function getWalletColor(type?: string | null): string {
  const colors = {
    btc: 'bg-[#F7931A]',
    eth: 'bg-[#627EEA]',
    bnb: 'bg-[#F3BA2F]',
    shard: 'bg-[#1E88E5]',
    mrx: 'bg-[#9C27B0]',
  };
  return colors[type?.toLowerCase() as keyof typeof colors] || 'bg-gray-400';
}

/**
 * Get the symbol for a wallet type
 */
export function getWalletSymbol(type?: string | null): string {
  const symbols = {
    btc: 'BTC',
    eth: 'ETH',
    bnb: 'BNB',
    shard: 'SHARD',
    mrx: 'MRX',
  };
  return symbols[type?.toLowerCase() as keyof typeof symbols] || type?.toUpperCase() || '';
}

/**
 * Get the path to the wallet icon
 */
export function getWalletIconPath(type: string | undefined): string {
  if (!type) return '/crypto-icons/default.svg';
  return `/crypto-icons/${type.toLowerCase()}.svg`;
}
