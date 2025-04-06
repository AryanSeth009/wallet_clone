import { create } from 'zustand';
import { StockService, StockData } from '@/services/StockService';

export interface StockState {
  stocks: { [symbol: string]: StockData[] };
  selectedStock: string | null;
  isLoading: boolean;
  error: string | null;
  fetchStockData: (symbol: string) => Promise<void>;
  fetchAllStockData: () => Promise<void>;
  setSelectedStock: (symbol: string) => void;
  startStockDataPolling: () => void;
  stopStockDataPolling: () => void;
}

export const useStockStore = create<StockState>((set, get) => {
  let pollingInterval: NodeJS.Timeout | null = null;

  return {
    stocks: {},
    selectedStock: null,
    isLoading: false,
    error: null,
    
    fetchStockData: async (symbol: string) => {
      try {
        set({ isLoading: true, error: null });
        const data = await StockService.getStockData(symbol);
        
        // Add some small random fluctuation to mock data
        const processedData = data.map(stockItem => {
          // Only modify if it looks like mock data (all values are very similar)
          if (
            stockItem.open === stockItem.high && 
            stockItem.low === stockItem.close && 
            stockItem.open === 100
          ) {
            const basePrice = 100 + Math.random() * 50;
            return {
              ...stockItem,
              open: basePrice,
              high: basePrice + Math.random() * 10,
              low: basePrice - Math.random() * 10,
              close: basePrice + Math.random() * 5 - 2.5,
              volume: Math.floor(Math.random() * 5000000) + 500000
            };
          }
          return stockItem;
        });

        set((state) => ({
          stocks: {
            ...state.stocks,
            [symbol]: processedData
          }
        }));
      } catch (error) {
        set({ 
          error: `Failed to fetch stock data for ${symbol}: ` + (error as Error).message,
          isLoading: false 
        });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchAllStockData: async () => {
      const defaultStocks = StockService.getDefaultStocks();
      const fetchPromises = defaultStocks.map(stock => get().fetchStockData(stock.symbol));
      
      try {
        await Promise.all(fetchPromises);
        
        // Set first stock as selected if no stock is currently selected
        if (!get().selectedStock && defaultStocks.length > 0) {
          get().setSelectedStock(defaultStocks[0].symbol);
        }
      } catch (error) {
        set({ 
          error: 'Failed to fetch all stock data: ' + (error as Error).message 
        });
      }
    },

    setSelectedStock: (symbol: string) => {
      set({ selectedStock: symbol });
    },

    startStockDataPolling: () => {
      // Stop any existing polling
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }

      // Initial fetch of all stocks
      get().fetchAllStockData();

      // Poll every 1 minute (reduced from 5 for more frequent updates)
      pollingInterval = setInterval(() => {
        get().fetchAllStockData();
      }, 1 * 60 * 1000); // 1 minute

      return () => {
        if (pollingInterval) {
          clearInterval(pollingInterval);
        }
      };
    },

    stopStockDataPolling: () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
      }
    }
  };
});
