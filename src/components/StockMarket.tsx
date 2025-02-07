'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { useStockStore } from '@/store/stockStore'
import { StockService } from '@/services/StockService'

const TIME_PERIODS = [
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1Y', value: '1Y' },
  { label: '5Y', value: '5Y' },
  { label: 'ALL', value: 'ALL' },
]

const filterDataByPeriod = (data, period) => {
  const today = new Date()
  const periodMap = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    '5Y': 1825,
    'ALL': Infinity,
  }

  const periodInDays = periodMap[period]
  return data.filter((item) => {
    const dateDiff = (today.getTime() - new Date(item.date).getTime()) / (1000 * 3600 * 24)
    return dateDiff <= periodInDays
  })
}

export default function StockMarket() {
  const [selectedPeriod, setSelectedPeriod] = useState('1W')
  const { 
    stocks, 
    selectedStock, 
    isLoading, 
    error, 
    fetchStockData, 
    setSelectedStock, 
    fetchAllStockData 
  } = useStockStore()

  // Debug logging
  useEffect(() => {
    console.log('Current Stocks:', stocks)
    console.log('Selected Stock:', selectedStock)
    console.log('Is Loading:', isLoading)
    console.log('Error:', error)
  }, [stocks, selectedStock, isLoading, error])

  // Fetch all stocks on initial load
  useEffect(() => {
    fetchAllStockData()
  }, [])

  // Fetch data for the selected stock
  useEffect(() => {
    if (selectedStock) {
      fetchStockData(selectedStock)
    }
  }, [selectedStock, fetchStockData])

  const formatChartData = () => {
    if (!selectedStock || !stocks[selectedStock]) return []
    
    const filteredData = filterDataByPeriod(stocks[selectedStock], selectedPeriod)
    return filteredData.map(data => ({
      date: new Date(data.date).toLocaleDateString(),
      price: data.close,
    }))
  }

  const chartData = formatChartData()
  const latestStockData = stocks[selectedStock]?.[0]
  const priceChange = latestStockData 
    ? ((latestStockData.close - latestStockData.open) / latestStockData.open) * 100 
    : 0

  // Prepare default stocks for selection
  const defaultStocks = StockService.getDefaultStocks()

  // If no stock is selected, auto-select first stock
  useEffect(() => {
    if (!selectedStock && defaultStocks.length > 0) {
      setSelectedStock(defaultStocks[0].symbol)
    }
  }, [selectedStock, defaultStocks])

  return (
    <Card className="w-full bg-[#0A0B0D] border-[#1A1B23] shadow-2xl rounded-2xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Stock Selection and Period Selector */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Select 
              value={selectedStock} 
              onValueChange={(stock) => {
                setSelectedStock(stock)
                fetchStockData(stock)
              }}
              className="w-[250px]"
            >
              <SelectTrigger className="bg-[#1A1B23] border-[#2A2A3C] text-white">
                <SelectValue placeholder="Select a stock">
                  {selectedStock && (
                    <div className="flex items-center">
                      <span className="font-bold mr-2">{selectedStock}</span>
                      {latestStockData && (
                        <span className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${latestStockData.close.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-[#1A1B23] border-[#2A2A3C]">
                {defaultStocks.map((stock) => (
                  <SelectItem 
                    key={stock.symbol} 
                    value={stock.symbol}
                    className="hover:bg-[#2A2A3C] focus:bg-[#2A2A3C]"
                  >
                    <div className="flex justify-between w-full">
                      <span>{stock.name}</span>
                      <span className="text-gray-400">({stock.symbol})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Period Selector */}
          <div className="flex gap-2 bg-[#1A1B23] rounded-lg p-1">
            {TIME_PERIODS.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? "default" : "ghost"}
                className={`
                  h-8 px-3 
                  ${selectedPeriod === period.value 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:bg-[#2A2A3C] hover:text-white'}
                  transition-colors duration-200
                `}
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        {isLoading || !selectedStock ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="h-[400px] bg-[#1A1B23] rounded-2xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(255,255,255,0.05)" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                  orientation="right"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0B0D',
                    border: '1px solid #1A1B23',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={false}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Stock Statistics */}
        {latestStockData && (
          <div className="grid grid-cols-4 gap-4">
            {[
              { 
                label: 'Open', 
                value: latestStockData.open, 
                className: 'text-blue-400' 
              },
              { 
                label: 'High', 
                value: latestStockData.high, 
                className: 'text-green-400' 
              },
              { 
                label: 'Low', 
                value: latestStockData.low, 
                className: 'text-red-400' 
              },
              { 
                label: 'Volume', 
                value: latestStockData.volume, 
                className: 'text-purple-400',
                formatter: (val: number) => val.toLocaleString() 
              }
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="
                  bg-[#1A1B23] 
                  rounded-2xl 
                  p-4 
                  shadow-md 
                  border 
                  border-[#2A2A3C] 
                  hover:border-blue-600 
                  transition-all 
                  duration-300
                "
              >
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                  {stat.label}
                </div>
                <div className={`
                  text-lg 
                  font-bold 
                  ${stat.className}
                `}>
                  {stat.label === 'Volume' 
                    ? stat.formatter?.(stat.value) ?? stat.value 
                    : `$${stat.value.toFixed(2)}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
