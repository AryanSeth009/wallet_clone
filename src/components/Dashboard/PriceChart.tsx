import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timeWindows = {
  "24H": "1",
  "7D": "7",
  "1M": "30",
  "3M": "90",
  "1Y": "365",
  ALL: "max",
};

const currencySymbols = {
  usd: "$",
  inr: "₹",
};

interface PriceData {
  time: string;
  price: number;
}

const CustomTooltip = ({ active, payload, label, selectedCurrency }: any) => {
  if (active && payload && payload.length) {
    const currencySymbol =
      currencySymbols[selectedCurrency as keyof typeof currencySymbols];
    return (
      <div className="bg-[#1A1B23] border border-[rgba(255,255,255,0.1)] p-3 rounded-lg backdrop-blur-xl">
        <p className="text-[#A0AEC0] text-sm">{label}</p>
        <p className="text-white font-medium">
          {currencySymbol}
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const PriceChart = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [chartData, setChartData] = useState<PriceData[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("24H");
  const [selectedCurrency, setSelectedCurrency] = useState<"usd" | "inr">(
    "usd"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<
    "ethereum" | "bitcoin" | "solana" | "avalanche"
  >("ethereum");

  const fetchPriceData = async (timeWindow: string, currency: string) => {
    try {
      setLoading(true);
      setError(null);
      const days = timeWindows[timeWindow as keyof typeof timeWindows];

      // Fetch historical data through our proxy API
      const response = await fetch(
        `/api/crypto?coin=${selectedCoin}&days=${days}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch price data");
      }

      const data = await response.json();

      if (!data.prices || !Array.isArray(data.prices)) {
        throw new Error("Invalid data format received");
      }

      // Process historical data
      const formattedData = data.prices.map(
        ([timestamp, price]: [number, number]) => ({
          time: new Date(timestamp).toLocaleString(),
          price: price,
        })
      );

      setChartData(formattedData);

      // Set current price and change from the latest data point
      if (formattedData.length > 0) {
        const latestPrice = formattedData[formattedData.length - 1].price;
        const previousPrice = formattedData[0].price;
        const change = ((latestPrice - previousPrice) / previousPrice) * 100;

        setCurrentPrice(latestPrice);
        setPriceChange(change);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching price data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch price data"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceData(selectedTime, selectedCurrency);
    const interval = setInterval(() => {
      fetchPriceData(selectedTime, selectedCurrency);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [selectedTime, selectedCurrency, selectedCoin]);

  return (
    <div className="bg-[#0A0B0F] rounded-xl p-4">
      <div className="flex items-center gap-3 mb-6">
        <select
          value={selectedCoin}
          onChange={(e) =>
            setSelectedCoin(
              e.target.value as "ethereum" | "bitcoin" | "solana" | "avalanche"
            )
          }
          className="bg-[#1A1B23] bg-blur-md text-sm font-normal text-white rounded p-2"
        >
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="solana">Solana (SOL)</option>
          {/* Add more options as needed */}
        </select>
        <span className="text-lg text-white font-medium">
          $
          {currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {error ? (
        <div className="text-red-500 bg-red-500/10 p-4 rounded-lg mb-4">
          Error: {error}
        </div>
      ) : loading ? (
        <div className="h-[240px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : chartData.length > 0 ? (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 11 }}
                tickFormatter={(time) => {
                  const date = new Date(time);
                  return selectedTime === "24H"
                    ? date.getHours().toString()
                    : date.getDate().toString();
                }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4B5563", fontSize: 11 }}
                tickFormatter={(value) => value.toLocaleString()}
                domain={["dataMin - 100", "dataMax + 100"]}
                padding={{ top: 20, bottom: 20 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1A1B23] border border-gray-800 p-2 rounded-lg shadow-xl">
                        <p className="text-white/80 text-xs font-medium">
                          $
                          {Number(payload[0].value).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="url(#lineGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#06b6d4",
                  stroke: "#0A0B0F",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[240px] flex items-center justify-center text-gray-400">
          No price data available
        </div>
      )}
    </div>
  );
};

export default PriceChart;
