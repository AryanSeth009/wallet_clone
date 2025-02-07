import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface AssetsListProps {
  assets: Asset[];
}

export default function AssetsList({ assets }: AssetsListProps) {
  // Mapping of symbols to icon filenames
  const assetIcons: { [key: string]: string } = {
    'BTC': '/crypto-icons/btc.svg',
    'ETH': '/crypto-icons/eth.svg',
    'OKB': '/crypto-icons/okb.svg',
    'AVAX': '/crypto-icons/avg.svg',
    'TRX': '/crypto-icons/tron.svg'
  };

  // Mapping of crypto symbols to Finnhub stock symbols
  const symbolMapping: { [key: string]: string } = {
    'BTC': 'BINANCE:BTCUSDT',
    'ETH': 'BINANCE:ETHUSDT',
    'OKB': 'BINANCE:OKBUSDT',
    'AVAX': 'BINANCE:AVAXUSDT',
    'TRX': 'BINANCE:TRXUSDT'
  };

  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchPrices = async () => {
      const newPrices: { [key: string]: number } = {};

      for (const asset of assets) {
        const symbol = symbolMapping[asset.symbol];
        if (!symbol) continue;

        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
          );
          const data = await response.json();
          
          if (data.c) {
            newPrices[asset.symbol] = data.c;
          }
        } catch (error) {
          console.error(`Error fetching price for ${asset.symbol}:`, error);
        }
      }

      setPrices(newPrices);
    };

    // Fetch prices immediately and then every 30 seconds
    fetchPrices();
    const intervalId = setInterval(fetchPrices, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [assets]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1 bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-transparent bg-clip-text">
            Assets
          </h2>
          <p className="text-[#A0AEC0] text-sm">
            Your cryptocurrency holdings
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#A0AEC0] text-sm">
              <th className="text-left pb-4">Asset</th>
              <th className="text-right pb-4">Price</th>
              <th className="text-right pb-4">24h Change</th>
              <th className="text-right pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.1)]">
            {assets.map((asset) => (
              <tr key={asset.symbol} className="text-white">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A1B23] flex items-center justify-center">
                      <Image 
                        src={assetIcons[asset.symbol] || '/crypto-icons/default.svg'} 
                        alt={`${asset.name} icon`} 
                        width={24} 
                        height={24} 
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-[#A0AEC0]">{asset.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="text-right py-4">
                  ${prices[asset.symbol]?.toLocaleString() || 'Loading...'}
                </td>
                <td className="text-right py-4">
                  <div className={`flex items-center justify-end gap-1 ${
                    asset.change >= 0 ? 'text-[#00FA9A]' : 'text-[#FF4444]'
                  }`}>
                    {asset.change >= 0 ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    <span>{Math.abs(asset.change)}%</span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-sm bg-[#1A1B23] text-[#A0AEC0] hover:bg-[#1A1B23]/80 transition-colors">
                      Buy
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-sm bg-[#1A1B23] text-[#A0AEC0] hover:bg-[#1A1B23]/80 transition-colors">
                      Trade
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
