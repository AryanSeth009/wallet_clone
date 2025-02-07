import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function TradeBox() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1 bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-transparent bg-clip-text">
            Quick Trade
          </h2>
          <p className="text-[#A0AEC0] text-sm">
            Swap tokens instantly
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1A1B23] rounded-lg p-4 border border-[rgba(255,255,255,0.1)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#A0AEC0]">From</span>
            <span className="text-sm text-[#A0AEC0]">Balance: 2.45 ETH</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-[#13141B] rounded-lg p-3 text-white placeholder-[#A0AEC0] outline-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-[#8A2BE2]">
                MAX
              </button>
            </div>
            <button className="flex items-center gap-2 bg-[#13141B] rounded-lg px-3 py-2 text-white">
              <div className="w-6 h-6 rounded-full bg-[#1A1B23] flex items-center justify-center">
                <span className="text-sm">Ξ</span>
              </div>
              <span>ETH</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="p-2 rounded-lg bg-[#1A1B23] text-[#A0AEC0] hover:bg-[#1A1B23]/80 transition-colors">
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-[#1A1B23] rounded-lg p-4 border border-[rgba(255,255,255,0.1)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#A0AEC0]">To</span>
            <span className="text-sm text-[#A0AEC0]">Balance: 0.00 BTC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-[#13141B] rounded-lg p-3 text-white placeholder-[#A0AEC0] outline-none"
              />
            </div>
            <button className="flex items-center gap-2 bg-[#13141B] rounded-lg px-3 py-2 text-white">
              <div className="w-6 h-6 rounded-full bg-[#1A1B23] flex items-center justify-center">
                <span className="text-sm">₿</span>
              </div>
              <span>BTC</span>
            </button>
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          Swap Now
        </button>
      </div>
    </div>
  );
}
