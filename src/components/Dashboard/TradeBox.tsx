'use client';

import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Token {
  symbol: string;
  name: string;
  price: number;
  balance: number;
  icon: string;
}

const AVAILABLE_TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', price: 1631.20, balance: 2.45, icon: 'Ξ' },
  { symbol: 'BTC', name: 'Bitcoin', price: 26606.25, balance: 0.00, icon: '₿' },
  { symbol: 'USDT', name: 'Tether', price: 1.00, balance: 1000.00, icon: '$' },
  { symbol: 'BNB', name: 'Binance Coin', price: 245.80, balance: 5.20, icon: 'BNB' },
];

export default function TradeBox() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState<Token>(AVAILABLE_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(AVAILABLE_TOKENS[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);

  // Calculate conversion rate
  const getConversionRate = () => {
    return fromToken.price / toToken.price;
  };

  // Update toAmount when fromAmount changes
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const rate = getConversionRate();
      const converted = Number(fromAmount) * rate;
      setToAmount(converted.toFixed(6));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  // Update fromAmount when toAmount changes
  useEffect(() => {
    if (toAmount && !isNaN(Number(toAmount))) {
      const rate = getConversionRate();
      const converted = Number(toAmount) / rate;
      setFromAmount(converted.toFixed(6));
    } else {
      setFromAmount('');
    }
  }, [toAmount, fromToken, toToken]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleMaxAmount = () => {
    setFromAmount(fromToken.balance.toString());
  };

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) {
      toast.error('Please enter an amount to swap');
      return;
    }

    if (Number(fromAmount) > fromToken.balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update balances (in a real app, this would come from the API)
      const newFromBalance = fromToken.balance - Number(fromAmount);
      const newToBalance = toToken.balance + Number(toAmount);
      
      // Update token balances in the list
      AVAILABLE_TOKENS.find(t => t.symbol === fromToken.symbol)!.balance = newFromBalance;
      AVAILABLE_TOKENS.find(t => t.symbol === toToken.symbol)!.balance = newToBalance;
      
      // Update current token states
      setFromToken({ ...fromToken, balance: newFromBalance });
      setToToken({ ...toToken, balance: newToBalance });
      
      // Clear amounts
      setFromAmount('');
      setToAmount('');
      
      toast.success('Swap executed successfully!');
    } catch (error) {
      toast.error('Failed to execute swap');
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="bg-[#1A1B23] rounded-xl p-4 border border-[rgba(255,255,255,0.1)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#A0AEC0]">From</span>
            <span className="text-sm text-[#A0AEC0]">Balance: {fromToken.balance} {fromToken.symbol}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-[#13141B] rounded-lg p-3 text-white placeholder-[#A0AEC0] outline-none"
                min="0"
                step="0.000001"
              />
              <button 
                onClick={handleMaxAmount}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-[#8A2BE2] hover:bg-[#8A2BE2]/10 rounded"
              >
                MAX
              </button>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFromTokens(!showFromTokens)}
                className="flex items-center gap-2 bg-[#13141B] rounded-lg px-3 py-2 text-white hover:bg-[#13141B]/80"
              >
                <div className="w-6 h-6 rounded-full bg-[#1A1B23] flex items-center justify-center">
                  <span className="text-sm">{fromToken.icon}</span>
                </div>
                <span>{fromToken.symbol}</span>
              </button>
              {showFromTokens && (
                <div className="absolute right-0 mt-2 w-48 bg-[#13141B] rounded-lg border border-[rgba(255,255,255,0.1)] shadow-lg z-10">
                  {AVAILABLE_TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setFromToken(token);
                        setShowFromTokens(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#1A1B23] text-white"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#1A1B23] flex items-center justify-center">
                        <span className="text-sm">{token.icon}</span>
                      </div>
                      <span>{token.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleSwapTokens}
            className="p-2 rounded-xl bg-[#1A1B23] text-[#A0AEC0] hover:bg-[#1A1B23]/80 transition-colors"
          >
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-[#1A1B23] rounded-xl p-4 border border-[rgba(255,255,255,0.1)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#A0AEC0]">To</span>
            <span className="text-sm text-[#A0AEC0]">Balance: {toToken.balance} {toToken.symbol}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-[#13141B] rounded-lg p-3 text-white placeholder-[#A0AEC0] outline-none"
                min="0"
                step="0.000001"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowToTokens(!showToTokens)}
                className="flex items-center gap-2 bg-[#13141B] rounded-lg px-3 py-2 text-white hover:bg-[#13141B]/80"
              >
                <div className="w-6 h-6 rounded-full bg-[#1A1B23] flex items-center justify-center">
                  <span className="text-sm">{toToken.icon}</span>
                </div>
                <span>{toToken.symbol}</span>
              </button>
              {showToTokens && (
                <div className="absolute right-0 mt-2 w-48 bg-[#13141B] rounded-lg border border-[rgba(255,255,255,0.1)] shadow-lg z-10">
                  {AVAILABLE_TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setToToken(token);
                        setShowToTokens(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#1A1B23] text-white"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#1A1B23] flex items-center justify-center">
                        <span className="text-sm">{token.icon}</span>
                      </div>
                      <span>{token.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleSwap}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-white !rounded-2xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Swapping...' : 'Swap Now'}
        </button>
      </div>
    </div>
  );
}
