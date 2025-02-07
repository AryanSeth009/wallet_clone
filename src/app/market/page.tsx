'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function MarketPage() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample stock symbols (you can expand this list)
  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // You'll need to replace this with a real stock API
        const promises = stockSymbols.map(async (symbol) => {
          const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`);
          return {
            symbol,
            name: symbol, // In a real app, you'd fetch the full name separately
            price: response.data.c,
            change: response.data.d,
            changePercent: response.data.dp
          };
        });

        const stockData = await Promise.all(promises);
        setStocks(stockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#13141B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#13141B] flex items-center justify-center text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#13141B] p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Stock Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <div 
            key={stock.symbol} 
            className="bg-[#1A1B23] rounded-lg p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">{stock.symbol}</h2>
              <span className={`
                font-bold 
                ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}
              `}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-white text-2xl font-bold">
              ${stock.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
