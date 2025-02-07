'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: Array<{
    time: string;
    price: number;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1B23] border border-[rgba(255,255,255,0.1)] p-3 rounded-lg">
        <p className="text-[#A0AEC0]">{`Time: ${label}`}</p>
        <p className="text-white font-medium">{`Price: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function Chart({ data }: ChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            stroke="#A0AEC0"
            tick={{ fill: '#A0AEC0' }}
          />
          <YAxis 
            stroke="#A0AEC0"
            tick={{ fill: '#A0AEC0' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00BFFF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#gradient)"
            strokeWidth={2}
            dot={false}
            fill="url(#colorPrice)"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8A2BE2" />
              <stop offset="100%" stopColor="#00BFFF" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
