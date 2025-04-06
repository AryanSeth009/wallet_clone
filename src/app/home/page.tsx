'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CryptoLanding from './page2';
import CryptoTrading from './page3';
import { Card } from "@/components/ui/card"

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import Footer from './page4';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
    else if (status === 'unauthenticated') {
      console.log('User is not authenticated');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen mb-auto select-none  bg-[#0A0B0F] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-20 w-full py-6 px-8">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-purple-500 text-3xl">⚡</div>
            <span className="text-xl font-semibold">CryptoWallet</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
              Support
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-6 py-2 bg-white text-[#8A2BE2] rounded-full hover:bg-white/5 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-[#8A2BE2] text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Background Gradient Lines */}
      <div className="fixed p-4  inset-0 z-0 select-none pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full">
          {/* Purple gradient lines */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_45%,rgba(123,97,255,0.1)_45%,rgba(123,97,255,0.1)_55%,transparent_55%)]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_35%,rgba(123,97,255,0.1)_35%,rgba(123,97,255,0.1)_45%,transparent_45%)]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(123,97,255,0.1)_25%,rgba(123,97,255,0.1)_35%,transparent_35%)]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative  z-10 container mx-auto px-6 pt-10">
        <div className="grid ml-4 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-[5.1rem]  w-[400px] font-regular leading-none mb-6">
              Crypto for Everyone
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Safe and easy crypto trading for everyone.
              <br />
              Invest in cryptocurrency with Fyra
            </p>
            <button className="px-8 py-4 bg-white text-black  rounded-full text-lg font-medium hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-colors">
              Get Started
            </button>
          </div>

          {/* Right Column - Cards Grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-min p-6">
            {/* Portfolio Balance Card */}
            <Card className="col-span-8 bg-[#0A0B0F]/60 backdrop-blur-xl border-white/10 overflow-hidden relative 
                hover:bg-[#0A0B0F]/70 transition-all duration-300 
                shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />
              <div className="relative p-6 z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base text-white/90">Portfolio Balance</span>
                  <div className="flex bg-white/20 rounded-full p-0.5">
                    <span className="px-4 py-1.5 bg-white text-black rounded-full text-xs font-medium">USD</span>
                    <span className="px-4 py-1.5 text-white/70 text-xs">BTC</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-bold text-white tracking-tight">$32,147</span>
                  <span className="text-green-400 text-sm flex items-center">
                    <ArrowUpIcon className="w-3 h-3 mr-0.5" />
                    3.12
                  </span>
                </div>
                {/* Enhanced Chart */}
                <div className="h-32 w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-2xl" />
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgb(139, 92, 246)', stopOpacity: 0.5 }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(139, 92, 246)', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 80 C50 40, 100 100, 150 60 S250 80, 300 50 S400 70, 450 40"
                      stroke="rgb(139, 92, 246)"
                      strokeWidth="2"
                      fill="none"
                      className="drop-shadow-[0_0_4px_rgba(139,92,246,0.5)]"
                    />
                    <path
                      d="M0 80 C50 40, 100 100, 150 60 S250 80, 300 50 S400 70, 450 40 L450 150 L0 150 Z"
                      fill="url(#gradient)"
                      opacity="0.2"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            {/* Crypto Cards Container */}
            <div className="col-span-4 space-y-4">
              {/* ETH Card */}
              <Card className="bg-[#0A0B0F]/60 backdrop-blur-xl border-white/10 
                hover:bg-[#0A0B0F]/70 transition-all duration-300 
                shadow-xl hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-medium text-white">ETH</span>
                      <svg className="w-6 h-6" viewBox="0 0 33 53" fill="none">
                        <path d="M16.3576 0L16 0.121771V36.1961L16.3576 36.5537L32.7153 27.1215L16.3576 0Z" fill="#343434" />
                        <path d="M16.3578 0L0 27.1215L16.3578 36.5537V19.5728V0Z" fill="#8C8C8C" />
                        <path d="M16.3576 39.6293L16.1523 39.8778V52.3805L16.3576 53L32.7153 30.1971L16.3576 39.6293Z" fill="#3C3C3B" />
                        <path d="M16.3578 53V39.6293L0 30.1971L16.3578 53Z" fill="#8C8C8C" />
                        <path d="M16.3576 36.5537L32.7153 27.1215L16.3576 19.5728V36.5537Z" fill="#141414" />
                        <path d="M0 27.1215L16.3578 36.5537V19.5728L0 27.1215Z" fill="#393939" />
                      </svg>
                    </div>
                    <ArrowDownIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Amount</span>
                    <div className="text-xl font-medium text-white font-mono">34.25323</div>
                  </div>
                </div>
              </Card>

              {/* SOL Card */}
              <Card className="bg-[#0A0B0F]/60 backdrop-blur-xl border-white/10 
                hover:bg-[#0A0B0F]/70 transition-all duration-300 
                shadow-xl hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-medium text-white">SOL</span>
                      <svg className="w-6 h-6" viewBox="0 0 397 311" fill="none">
                        <path d="M64.6406 237.916L98.6427 273.436C99.7767 274.614 101.255 275.394 102.866 275.666L317.36 308.511C318.438 308.702 319.539 308.62 320.581 308.272C321.622 307.924 322.577 307.319 323.371 306.504C324.165 305.69 324.775 304.686 325.155 303.578C325.535 302.47 325.674 301.287 325.561 300.115L315.304 178.334C315.259 177.897 315.261 177.456 315.31 177.02L329.064 50.2222C329.185 48.9635 328.998 47.6977 328.522 46.5266C328.046 45.3555 327.294 44.3126 326.328 43.4837C325.362 42.6547 324.209 42.0624 322.964 41.7534C321.719 41.4444 320.419 41.427 319.166 41.7027L117.648 77.4738C116.116 77.8005 114.712 78.5385 113.596 79.6065L15.3689 174.022C14.5019 174.851 13.8248 175.852 13.3825 176.957C12.9403 178.062 12.7435 179.244 12.8056 180.426C12.8677 181.608 13.1872 182.761 13.7419 183.81C14.2966 184.858 15.0734 185.775 16.0167 186.495L64.6406 237.916Z" fill="url(#paint0_linear_1_2)" />
                        <path d="M333.639 133.031L375.435 174.937C376.364 175.866 377.49 176.573 378.728 177.005C379.966 177.437 381.282 177.584 382.58 177.434L391.023 176.397C392.19 176.263 393.312 175.873 394.312 175.251C395.311 174.629 396.163 173.79 396.809 172.792C397.455 171.795 397.88 170.661 398.054 169.473C398.228 168.285 398.147 167.072 397.816 165.918L366.332 71.4536C366.083 70.5591 365.654 69.7201 365.069 68.9826L318.505 3.36257C317.703 2.2581 316.627 1.37542 315.383 0.796494C314.139 0.217571 312.766 -0.0433981 311.392 0.0251641C310.018 0.0937263 308.683 0.489621 307.505 1.1812C306.328 1.87278 305.348 2.83938 304.657 3.98595L277.278 48.7117C276.25 50.4075 275.925 52.4195 276.367 54.3403L332.722 130.496C332.961 130.991 333.27 131.448 333.639 131.854V133.031Z" fill="url(#paint1_linear_1_2)" />
                        <path d="M145.945 116.132L300.971 88.7372C302.3 88.5015 303.537 87.9261 304.564 87.0637C305.591 86.2013 306.375 85.0807 306.843 83.8175C307.311 82.5543 307.446 81.1939 307.236 79.8644C307.025 78.535 306.475 77.2829 305.638 76.2311L277.556 43.5474C276.85 42.6847 275.974 41.9663 274.981 41.4395C273.988 40.9127 272.899 40.5891 271.775 40.4883L87.0825 23.6728C85.8385 23.5604 84.5848 23.7489 83.4259 24.2237C82.267 24.6985 81.2386 25.4463 80.4252 26.4061C79.6118 27.3659 79.0371 28.5071 78.7517 29.7361C78.4664 30.965 78.4785 32.2426 78.7872 33.4659L94.3695 92.8312C94.7771 94.3861 95.6543 95.7825 96.8903 96.8309L142.974 115.852L145.945 116.132Z" fill="url(#paint2_linear_1_2)" />
                        <defs>
                          <linearGradient id="paint0_linear_1_2" x1="42.9097" y1="282.505" x2="305.861" y2="77.5441" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FFA3" />
                            <stop offset="1" stopColor="#DC1FFF" />
                          </linearGradient>
                          <linearGradient id="paint1_linear_1_2" x1="311.545" y1="14.9359" x2="366.296" y2="164.635" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FFA3" />
                            <stop offset="1" stopColor="#DC1FFF" />
                          </linearGradient>
                          <linearGradient id="paint2_linear_1_2" x1="122.466" y1="108.685" x2="274.687" y2="48.8965" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FFA3" />
                            <stop offset="1" stopColor="#DC1FFF" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <ArrowDownIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Amount</span>
                    <div className="text-xl font-medium text-white font-mono">265.2896</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bitcoin Price Card */}
            <Card className="col-span-12 bg-[#0A0B0F]/60 backdrop-blur-xl border-white/10 
                hover:bg-[#0A0B0F]/70 transition-all duration-300 
                shadow-xl hover:shadow-2xl">
              <div className="p-6">
                <div className="text-xs text-white/70 uppercase tracking-wider mb-2">Bitcoin Price</div>
                <div className="text-2xl font-bold text-white mb-8">US$ 57,450</div>
                <div className="grid grid-cols-7 gap-4 text-xs text-gray-500 mb-4">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
                <div className="relative h-24">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M0 50 L60 45 L120 55 L180 40 L240 60 L300 30 L360 50"
                      stroke="rgb(139, 92, 246)"
                      strokeWidth="2"
                      fill="none"
                      className="drop-shadow-[0_0_4px_rgba(139,92,246,0.5)]"
                    />
                    <circle cx="300" cy="30" r="4" fill="rgb(139, 92, 246)" className="drop-shadow-[0_0_4px_rgba(139,92,246,0.8)]" />
                    <line x1="300" y1="30" x2="300" y2="90" stroke="rgb(139, 92, 246)" strokeWidth="1" strokeDasharray="4" />
                  </svg>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <CryptoLanding />
          <CryptoTrading />
          <Footer />
        </div>
      </div>


    </main>
  );
}
