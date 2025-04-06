import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface WalletActionsProps {
  onSend: () => void;
  onReceive: () => void;
  onSwap: () => void;
}

const WalletActions: React.FC<WalletActionsProps> = ({ onSend, onReceive, onSwap }) => {
  return (
    <div className="flex justify-center gap-6 mb-8">
      <button
        onClick={onSend}
        className="flex flex-col items-center p-4 bg-[#2A2A3C] rounded-lg hover:bg-[#3A3A4C]"
      >
        <ArrowUpIcon className="h-6 w-6 mb-2" />
        <span>Send</span>
      </button>
      <button
        onClick={onReceive}
        className="flex flex-col items-center p-4 bg-[#2A2A3C] rounded-lg hover:bg-[#3A3A4C]"
      >
        <ArrowDownIcon className="h-6 w-6 mb-2" />
        <span>Receive</span>
      </button>
      <button
        onClick={onSwap}
        className="flex flex-col items-center p-4 bg-[#2A2A3C] rounded-lg hover:bg-[#3A3A4C]"
      >
        <ArrowsRightLeftIcon className="h-6 w-6 mb-2" />
        <span>Swap</span>
      </button>
    </div>
  );
};

export default WalletActions;
