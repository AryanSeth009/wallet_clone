import axios from 'axios';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export interface StockData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export class StockService {
  static getDefaultStocks() {
    return [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'META', name: 'Meta Platforms Inc.' },
      { symbol: 'TSLA', name: 'Tesla Inc.' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation' },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
      { symbol: 'V', name: 'Visa Inc.' },
      { symbol: 'WMT', name: 'Walmart Inc.' }
    ];
  }

  static async getStockData(symbol: string): Promise<StockData[]> {
    try {
      // Validate inputs
      if (!symbol) {
        throw new Error('Stock symbol is required');
      }

      if (!FINNHUB_API_KEY) {
        throw new Error('Finnhub API key is not configured');
      }

      // Fetch current stock quote
      const quoteResponse = await axios.get(`${BASE_URL}/quote`, {
        params: {
          symbol: symbol.toUpperCase(),
          token: FINNHUB_API_KEY
        },
        timeout: 10000
      });

      // Fetch historical data
      const historicalResponse = await axios.get(`${BASE_URL}/stock/candle`, {
        params: {
          symbol: symbol.toUpperCase(),
          resolution: 'D',
          from: Math.floor(Date.now() / 1000 - 365 * 24 * 60 * 60),
          to: Math.floor(Date.now() / 1000),
          token: FINNHUB_API_KEY
        },
        timeout: 10000
      });

      // Validate responses
      if (!quoteResponse.data || !historicalResponse.data || historicalResponse.data.s !== 'ok') {
        console.warn(`Invalid response for stock ${symbol}. Using mock data.`);
        return this.generateMockStockData(symbol);
      }

      const quote = quoteResponse.data;
      const { c: closes, h: highs, l: lows, o: opens, v: volumes, t: timestamps } = historicalResponse.data;

      // Combine current quote with historical data
      const stockData: StockData[] = [
        {
          symbol,
          date: new Date().toISOString().split('T')[0],
          open: quote.o,
          high: quote.h,
          low: quote.l,
          close: quote.c,
          volume: quote.v
        },
        ...(timestamps ? timestamps.map((timestamp: number, index: number) => ({
          symbol,
          date: new Date(timestamp * 1000).toISOString().split('T')[0],
          open: opens[index],
          high: highs[index],
          low: lows[index],
          close: closes[index],
          volume: volumes[index]
        })) : [])
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return stockData.length > 0 ? stockData : this.generateMockStockData(symbol);
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      return this.generateMockStockData(symbol);
    }
  }

  private static generateMockStockData(symbol: string): StockData[] {
    // Generate more realistic mock data based on the stock symbol
    const mockPrices: { [key: string]: { open: number, high: number, low: number, close: number } } = {
      'AAPL': { open: 189.50, high: 192.75, low: 188.25, close: 191.30 },
      'MSFT': { open: 374.20, high: 379.50, low: 372.80, close: 376.45 },
      'GOOGL': { open: 128.75, high: 131.20, low: 127.50, close: 130.10 },
      'AMZN': { open: 146.30, high: 149.75, low: 145.20, close: 147.60 },
      'META': { open: 335.60, high: 340.25, low: 333.90, close: 338.15 },
      'TSLA': { open: 248.90, high: 252.50, low: 246.75, close: 250.30 },
      'NVDA': { open: 480.25, high: 485.75, low: 475.50, close: 482.60 },
      'JPM': { open: 170.40, high: 173.20, low: 169.50, close: 171.85 },
      'V': { open: 250.75, high: 254.30, low: 249.20, close: 252.45 },
      'WMT': { open: 165.20, high: 167.50, low: 164.10, close: 166.35 }
    };

    const stockData = mockPrices[symbol] || { 
      open: 100, 
      high: 110, 
      low: 95, 
      close: 105 
    };

    return [{
      symbol,
      date: new Date().toISOString().split('T')[0],
      open: stockData.open,
      high: stockData.high,
      low: stockData.low,
      close: stockData.close,
      volume: Math.floor(Math.random() * 5000000) + 500000 // Random volume between 500k and 5.5M
    }];
  }
}
