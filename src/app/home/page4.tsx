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
                Take your first step into safe, secure crypto investing
              </h1>
              <p className="text-gray-400 mb-8 max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus Lorem ipsum dolor at amet, consectetur adipiscing elit, sed do eiusmod tempus
              </p>
              <button onClick={() => window.location.href = '/signup'} className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-200 text-sm font-medium">
                Get Started
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
            <h2 className="text-6xl w-full font-bold mb-4">Receive transmissions</h2>
            <div className="relative mb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 bg-gray-900/50 border  border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <ArrowRightIcon className="w-5 h-5 text-purple-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Unsubscribe at any time. <a href="#" className="text-purple-400 hover:text-purple-300">Privacy policy →</a>
            </p>
          </div>
  
          {/* Footer */}
          <footer className="grid md:grid-cols-4 gap-8 py-20 border-t border-gray-800">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Benefits</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Media</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Privacy Policy and Terms of Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">CoinFlip Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">CoinFlip Business Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">CoinFlip Financial Privacy Notice</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">CoinFlip Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">CoinFlip Trade Desk Terms of Service</a></li>
              </ul>
            </div>
  
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400 mb-6">
                CoinFlip, the world's leading Bitcoin ATM operator. Enable a fair, global, and open financial system.
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Sign up to get the latest in CoinFlip news, discounts, and more.
              </p>
              <div className="relative mb-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                  <ArrowRightIcon className="w-5 h-5 text-purple-500" />
                </button>
              </div>
              <p className="text-xs text-gray-500">© 2021-2024 CoinFlip. USD COIN (USDC)</p>
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
  
  