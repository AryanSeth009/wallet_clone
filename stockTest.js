import * as dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

console.log('Finnhub API Key:', FINNHUB_API_KEY);

async function testStockDataFetching() {
  console.log('Starting Stock Data Test...');
  console.log('Full Environment:', JSON.stringify(process.env, null, 2));

  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' }
  ];

  for (const stock of stocks) {
    try {
      console.log(`\nFetching data for ${stock.symbol} (${stock.name})`);
      
      const response = await axios.get(`${BASE_URL}/stock/candle`, {
        params: {
          symbol: stock.symbol,
          resolution: 'D',
          from: Math.floor(Date.now() / 1000 - 365 * 24 * 60 * 60),
          to: Math.floor(Date.now() / 1000),
          token: FINNHUB_API_KEY
        },
        headers: {
          'X-Finnhub-Token': FINNHUB_API_KEY
        }
      });

      if (response.data.s === 'ok') {
        console.log('Data retrieved successfully:');
        console.log(`Total data points: ${response.data.t.length}`);
        
        // Print latest data point
        const latestIndex = response.data.t.length - 1;
        console.log('Latest Stock Data:');
        console.log(`Date: ${new Date(response.data.t[latestIndex] * 1000).toISOString().split('T')[0]}`);
        console.log(`Open: $${response.data.o[latestIndex].toFixed(2)}`);
        console.log(`High: $${response.data.h[latestIndex].toFixed(2)}`);
        console.log(`Low: $${response.data.l[latestIndex].toFixed(2)}`);
        console.log(`Close: $${response.data.c[latestIndex].toFixed(2)}`);
        console.log(`Volume: ${response.data.v[latestIndex].toLocaleString()}`);
      } else {
        console.error(`No data found for ${stock.symbol}`);
      }
    } catch (error) {
      console.error(`Error fetching data for ${stock.symbol}:`, error.response ? error.response.data : error.message);
      console.error('Full error:', JSON.stringify(error, null, 2));
    }
  }
}

testStockDataFetching();
