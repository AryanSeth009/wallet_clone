import { ArrowRight } from 'lucide-react'

export default function CryptoLanding() {
  return (
    <div id='features' className="features min-h-screen bg-[#0A0B0F] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"
      />

      {/* Decorative Elements */}
      <Star className="absolute top-20 left-10 text-white/10 w-6 h-6" />
      <Star className="absolute bottom-40 right-20 text-white/10 w-8 h-8" />
      <Star className="absolute top-1/3 right-1/4 text-white/10 w-4 h-4" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-[80px] pt-16 md:text-7xl leading-tight font-bold mb-6">
            Your Secure{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Crypto Wallet
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-md">
            Store, trade, and manage your cryptocurrencies with advanced security features and real-time market data
          </p>
        </div>
        <a href="/signup" className='px-6 flex items-center justify-center'>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-200 text-sm font-medium">
            Create Wallet
          </button>
        </a>
        {/* Feature Cards */}
        <div className="grid pt-10 grid-cols-1 md:grid-cols-3 gap-6 pb-20">
          <FeatureCard
            icon={<ArrowsIcon />}
            title="Quick Trade"
            description="Swap cryptocurrencies instantly with real-time rates and minimal fees. Support for multiple tokens including BTC, ETH, USDT, and more."
            cta="Start Trading"
            href="/dashboard"
          />
          <FeatureCard
            icon={<WalletIcon />}
            title="Secure Storage"
            description="Your assets are protected with industry-leading security measures, including multi-signature support and encrypted private keys."
            cta="Learn More"
            href="/security"
          />
          <FeatureCard
            icon={<ChartIcon />}
            title="Portfolio Tracking"
            description="Monitor your investments with real-time price updates, transaction history, and detailed analytics for informed decision-making."
            cta="View Dashboard"
            href="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  cta,
  href
}: {
  icon: React.ReactNode
  title: string
  description: string
  cta: string
  href: string
}) {
  return (
    <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-colors duration-300">
      <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4 text-sm">{description}</p>
      <a
        href={href}
        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm"
      >
        {cta}
        <ArrowRight className="ml-2 w-4 h-4" />
      </a>
    </div>
  )
}

// Icons
function ArrowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l2.545 7.839h8.239l-6.664 4.839 2.545 7.839-6.664-4.839-6.664 4.839 2.545-7.839-6.664-4.839h8.239z" />
    </svg>
  )
}

