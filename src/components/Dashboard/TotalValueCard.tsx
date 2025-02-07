import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface TotalValueCardProps {
  totalValue: number;
  change: number;
  changePercentage: number;
}

const TotalValueCard: React.FC<TotalValueCardProps> = ({ totalValue, change, changePercentage }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-[#13141B] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl p-6">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mb-1 bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-transparent bg-clip-text">
          Total Portfolio Value
        </h2>
        <p className="text-[#A0AEC0] text-sm mb-4">
          Your total asset value
        </p>
        
        <div className="flex items-end gap-4">
          <span className="text-3xl font-bold">
            ${totalValue.toLocaleString()}
          </span>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-[#00FA9A]' : 'text-[#FF4444]'}`}>
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span>${Math.abs(change).toLocaleString()}</span>
            <span>({changePercentage}%)</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="mt-6 h-1 bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] rounded-full opacity-20" />
    </div>
  );
};

export default TotalValueCard;
