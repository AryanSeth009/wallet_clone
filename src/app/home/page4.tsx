import NewsletterForm from '@/components/NewsletterForm';

export default function Footer() {
    return (
      <div className="min-h-screen pt-4 bg-[#0A0B0F] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"
        />
        
        {/* Gradient Effects */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-teal-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Hero Section */}
          <div className="grid relative lg:grid-cols-2 gap-12 items-center pt-20 pb-24">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Your secure gateway to the world of cryptocurrency
              </h1>
              <p className="text-gray-400 mb-8 max-w-lg">
                Store, trade, and manage your digital assets with our advanced wallet platform featuring multi-signature security, real-time market data, and seamless transactions
              </p>
              <button onClick={() => window.location.href = '/signup'} className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-200 text-sm font-medium">
                Create Your Wallet
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
              <div className="relative">
                <img 
                  src="/suitcase.png" 
                  alt="3D Cryptocurrency Coin" 
                  className="w-full max-w-lg mx-auto animate-float"
                />
                <StarIcon className="absolute top-10 right-20 text-white/80 w-6 h-6 animate-pulse" />
                <StarIcon className="absolute bottom-20 left-20 text-white/60 w-4 h-4 animate-pulse delay-300" />
              </div>
            </div>
          </div>
  
          {/* Subscription Section */}
          <div className="text-center max-w-xl mx-auto py-14">
            <h2 className="text-6xl w-full font-bold mb-4">Stay updated with market insights</h2>
            <NewsletterForm className="mb-2" />
            <p className="text-sm text-gray-500">
              Unsubscribe at any time. <a href="#" className="text-purple-400 hover:text-purple-300">Privacy policy →</a>
            </p>
          </div>
  
          {/* Footer */}
          <footer className="grid md:grid-cols-4 gap-8 py-20 border-t border-gray-800">
            <div>
              <h3 className="font-bold mb-4">Wallet</h3>
              <ul className="space-y-2">
                <li><a href="/dashboard" className="text-gray-400 hover:text-white text-sm">Dashboard</a></li>
                <li><a href="/transactions" className="text-gray-400 hover:text-white text-sm">Transactions</a></li>
                <li><a href="/profile" className="text-gray-400 hover:text-white text-sm">Profile</a></li>
                <li><a href="/settings" className="text-gray-400 hover:text-white text-sm">Settings</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-white text-sm">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal & Security</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Security Measures</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Compliance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Disclaimers</a></li>
              </ul>
            </div>
  
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400 mb-6">
                Our secure crypto wallet platform provides you with the tools to manage your digital assets with confidence. Built with advanced security features and real-time market data.
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Subscribe to receive updates on new features, security enhancements, and market insights.
              </p>
              <NewsletterForm />
              <p className="text-xs text-gray-500 mt-4">© 2021-2024 Secure Crypto Wallet. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    )
  }
  
  function StarIcon({ className }: { className?: string }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0l2.545 7.839h8.239l-6.664 4.839 2.545 7.839-6.664-4.839-6.664 4.839 2.545-7.839-6.664-4.839h8.239z" />
      </svg>
    )
  }
  
  function ArrowRightIcon({ className }: { className?: string }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    )
  }
  
  