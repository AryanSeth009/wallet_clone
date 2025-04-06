import { ArrowRight } from 'lucide-react'

export default function CryptoTrading() {
  return (
    <div className="min-h-screen  from-[#0A0B0F] via-[#13141B] to-[#0A0B0F] text-white p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"
      />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#8A2BE2]/20 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00BFFF]/20 rounded-full blur-[120px] translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative">
        {/* Customer Support Section */}
        <div className="mb-24 flex  justify-between items-start gap-64">
          {/* 3D Shield */}
          <div className="relative  w-64 pt-24  flex items-center  h-72 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2] to-[#00BFFF] rounded-2xl transform rotate-12 scale-105 blur-xl opacity-50" />
            <div className="relative bg-gradient-to-br from-[#8A2BE2] to-[#00BFFF] w-64   h-64 rounded-2xl transform rotate-12">
              <div className="absolute inset-1 bg-black/50 rounded-xl" />
            </div>
            {/* Star decoration */}
            <div className="absolute top-4 -right-4">
              <StarIcon className="w-20 h-20 text-[#8A2BE2]" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-6xl leading-tight font-bold w-[500px] mb-4">
              24/7 access to full service customer support
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus Lorem ipsum dolor at non consectetur
            </p>
            <button onClick={() => window.location.href = '/signup'} className="px-6 py-2 hover:bg-gradient-to-br border-white bg-transparent border border-to-r from-[#8A2BE2] to-[#00BFFF] rounded-full text-sm font-medium hover:opacity-90 hover:
             transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>

        {/* Trading Section */}
        <div className="mb-12 flex justify-center flex-col items-center">
          <h2 className="text-6xl leading-tight flex justify-center text-center  font-bold mb-4">
            Buy and sell with the lowest<br />fees in the industry
          </h2>
          <p className="text-gray-400 mb-4  text-center max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus
          </p>
          <a href="#" className="text-[#8A2BE2] hover:text-[#00BFFF] transition-colors duration-200 text-sm inline-flex items-center">
            Learn More
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        {/* Crypto Price Table */}
        <div className="space-y-2">
          <CryptoRow 
            symbol="BTC" 
            name="Bitcoin" 
            price="56,355.20" 
            change="+1.68%" 
            chartData={[30, 40, 35, 50, 35, 45]} 
            isPositive={true}
            image="/crypto-icons/btc.svg"
          />
          <CryptoRow 
            symbol="ETH" 
            name="Ethereum" 
            price="4,234.01" 
            change="+4.56%" 
            chartData={[20, 35, 30, 45, 40, 50]} 
            isPositive={true}
            image="/crypto-icons/eth.svg"
          />
          <CryptoRow 
            symbol="ADA" 
            name="0KB" 
            price="1.48" 
            change="+3.43%" 
            chartData={[25, 30, 35, 25, 30, 35]} 
            isPositive={true}
            image="/crypto-icons/okb.svg"
          />
          <CryptoRow 
            symbol="SHARD" 
            name="Shard" 
            price="0.97" 
            change="-0.82%" 
            chartData={[40, 35, 30, 25, 20, 15]} 
            isPositive={false}
            image="/crypto-icons/shard.svg"
          />
          <CryptoRow 
            symbol="TRON" 
            name="Tron" 
            price="42.22" 
            change="+2.96%" 
            chartData={[25, 35, 30, 40, 35, 45]} 
            isPositive={true}
            image="/crypto-icons/tron.svg"
          />
           <CryptoRow 
            symbol="AVG" 
            name="AVG" 
            price="4,234.01" 
            change="+4.56%" 
            chartData={[20, 35, 30, 45, 40, 50]} 
            isPositive={true}
            image="/crypto-icons/avg.svg"
          />
        </div>
      </div>
    </div>
  )
}

function CryptoRow({ 
  symbol, 
  name, 
  price, 
  change, 
  chartData,
  isPositive,
  image
}: { 
  symbol: string
  name: string
  price: string
  change: string
  chartData: number[]
  isPositive: boolean
  image: string
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1A1B23] rounded-xl border border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <img 
            src={image} 
            alt={`${symbol} logo`} 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-400">{symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">${price}</div>
        <div className={`text-sm ${isPositive ? 'text-[#00BFFF]' : 'text-red-400'}`}>
          {change}
        </div>
      </div>
      <div className="w-32">
        <SparklineChart data={chartData} color={isPositive ? '#00BFFF' : '#F87171'} />
      </div>
      <button className="text-sm text-[#fff] hover:text-[#00BFFF] transition-colors duration-200">
        Trade Now
      </button>
    </div>
  )
}

function SparklineChart({ data, color }: { data: number[], color: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min
  
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E90FF" /> {/* Deep Blue */}
          <stop offset="100%" stopColor="#87CEEB" /> {/* Light Blue */}
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color === '#00BFFF' ? "url(#blueGradient)" : color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l2.545 7.839h8.239l-6.664 4.839 2.545 7.839-6.664-4.839-6.664 4.839 2.545-7.839-6.664-4.839h8.239z" />
    </svg>
  )
}
