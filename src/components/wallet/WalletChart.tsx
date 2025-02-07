import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

interface WalletChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  onPeriodChange: (period: string) => void;
}

const WalletChart: React.FC<WalletChartProps> = ({ data, onPeriodChange }) => {
  const periods = ['1d', '1w', '1m', '3m', '1y'];

  return (
    <div className="bg-[#1A1B23] rounded-lg p-6 mb-8">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F7931A" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="#666"
              tick={{ fill: '#666' }}
            />
            <YAxis 
              stroke="#666"
              tick={{ fill: '#666' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F7931A"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className="px-4 py-2 rounded-md bg-[#2A2A3C] hover:bg-[#3A3A4C]"
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletChart;
