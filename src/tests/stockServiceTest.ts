import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { StockService } = require('../services/StockService');

async function testStockDataFetching() {
  console.log('Starting Stock Data Test...');
  console.log('Finnhub API Key:', process.env.NEXT_PUBLIC_FINNHUB_API_KEY);

  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' }
  ];

  for (const stock of stocks) {
    try {
      console.log(`\nFetching data for ${stock.symbol} (${stock.name})`);
      
      const stockData = await StockService.getStockData(stock.symbol);
      
      console.log('Data points retrieved:', stockData.length);
      
      if (stockData.length > 0) {
        const latestData = stockData[0];
        console.log('Latest Stock Data:');
        console.log(`Date: ${latestData.date}`);
        console.log(`Open: $${latestData.open.toFixed(2)}`);
        console.log(`High: $${latestData.high.toFixed(2)}`);
        console.log(`Low: $${latestData.low.toFixed(2)}`);
        console.log(`Close: $${latestData.close.toFixed(2)}`);
        console.log(`Volume: ${latestData.volume.toLocaleString()}`);
      } else {
        console.warn(`No data found for ${stock.symbol}`);
      }
    } catch (error) {
      console.error(`Error fetching data for ${stock.symbol}:`, error);
    }
  }
}

// Run the test
testStockDataFetching();
