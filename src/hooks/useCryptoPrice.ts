import { useState, useEffect } from 'react';

interface PriceData {
  prices: [number, number][];
  current_price: number;
  price_change_percentage_24h: number;
}

export const useCryptoPrice = (coinId: string, days: string = '1') => {
  const [data, setData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch price data
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days === '1' ? 'hourly' : 'daily'}`
        );
        const priceData = await response.json();

        // Fetch current price and 24h change
        const currentDataResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`
        );
        const currentData = await currentDataResponse.json();

        setData({
          prices: priceData.prices,
          current_price: currentData[coinId].usd,
          price_change_percentage_24h: currentData[coinId].usd_24h_change
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch price data');
        console.error('Error fetching price data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 1 minute
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [coinId, days]);

  return { data, loading, error };
};
