"use client"

import { useState, useEffect } from "react"
import { useWalletStore } from "@/store/walletStore"
import { ethers } from "ethers"
import { format } from "date-fns"
import { WalletIcon, CalendarIcon, AdjustmentsHorizontalIcon, PencilIcon } from "@heroicons/react/24/outline"
import Sidebar from "@/components/Sidebar"

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timeStamp: string
  status: "pending" | "confirmed" | "failed"
  gasPrice: string
  gasUsed: string
  category?: string
  merchant?: string
  icon?: string
}

export default function TransactionsPage() {
  const { selectedWallet, wallets } = useWalletStore()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all")
  const [balance, setBalance] = useState("3.2458")
  const [currency, setCurrency] = useState("ETH")

  const currentWallet = wallets.find((w) => w.id === selectedWallet) || wallets[0]

  const fetchTransactions = async () => {
    if (!currentWallet?.address) return

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${currentWallet.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`,
      )

      const data = await response.json()

      if (data.status === "1") {
        // Enhance transactions with sample merchant data for UI purposes
        const categories = ["Exchange", "DeFi", "NFT", "Gaming", "Transfer"]
        const merchants = ["Uniswap", "Aave", "OpenSea", "Axie", "MetaMask"]

        const formattedTransactions = data.result.map((tx: any, index: number) => {
          const isSent = tx.from.toLowerCase() === currentWallet?.address?.toLowerCase()
          const randomCategory = categories[Math.floor(Math.random() * categories.length)]
          const randomMerchant = merchants[Math.floor(Math.random() * merchants.length)]

          return {
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: ethers.formatEther(tx.value),
            timeStamp: format(new Date(Number.parseInt(tx.timeStamp) * 1000), "MMMM d"),
            status: tx.isError === "1" ? "failed" : "confirmed",
            gasPrice: ethers.formatEther(tx.gasPrice),
            gasUsed: tx.gasUsed,
            category: randomCategory,
            merchant: randomMerchant,
            icon: randomMerchant.substring(0, 2).toUpperCase(),
          }
        })

        setTransactions(formattedTransactions)
      } else {
        setError("Failed to fetch transactions")
      }
    } catch (err) {
      setError("Error fetching transactions")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (currentWallet?.address) {
      fetchTransactions()
    } else {
      // For demo purposes, create sample transactions
      const sampleTransactions = [
        {
          hash: "0x123",
          from: "0xSampleAddress1",
          to: "0xSampleAddress2",
          value: "0.45",
          timeStamp: "August 18",
          status: "confirmed" as const,
          gasPrice: "0.0001",
          gasUsed: "21000",
          category: "Exchange",
          merchant: "Uniswap",
          icon: "UN",
        },
        {
          hash: "0x456",
          from: "0xSampleAddress1",
          to: "0xSampleAddress3",
          value: "1.25",
          timeStamp: "June 22",
          status: "confirmed" as const,
          gasPrice: "0.0001",
          gasUsed: "21000",
          category: "DeFi",
          merchant: "Aave",
          icon: "AA",
        },
        {
          hash: "0x789",
          from: "0xSampleAddress4",
          to: "0xSampleAddress1",
          value: "0.75",
          timeStamp: "May 11",
          status: "confirmed" as const,
          gasPrice: "0.0001",
          gasUsed: "21000",
          category: "NFT",
          merchant: "OpenSea",
          icon: "OS",
        },
      ]
      setTransactions(sampleTransactions)
      setIsLoading(false)
    }
  }, [currentWallet?.address])

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true
    if (filter === "sent") return tx.from.toLowerCase() === currentWallet?.address?.toLowerCase()
    if (filter === "received") return tx.to.toLowerCase() === currentWallet?.address?.toLowerCase()
    return true
  })

  if (!currentWallet && wallets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br pt-24 text-white p-6">
        
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl mb-4">No wallet selected</p>
          <p className="text-gray-400">Please select a wallet to view transactions</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24  bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white p-6">
      <div className="relative inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#8A2BE2]/20 to-[#00BFFF]/20 blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-[#00BFFF]/10 to-[#8A2BE2]/10 blur-3xl" />
      </div>
      <div className="max-w-6xl  mx-auto">
        
        {/* Balance Section */}
        <div className="mb-8 ">
          <h2 className="text-gray-400 font-medium mb-2">Your Balance</h2>
          <div className="flex items-center mb-4">
            <div className="relative mr-3">
              <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center overflow-hidden">
                <WalletIcon className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">
              {balance} {currency}
            </h1>

            <div className="ml-auto">
              <div className="bg-[#2a2a3e] p-1 rounded-full">
                <div className="flex space-x-1">
                  <button className="rounded-full px-6 py-1.5 bg-purple-600 text-white">Personal</button>
                  <button className="rounded-full px-6 py-1.5 text-gray-400">Business</button>
                  <button className="rounded-full px-6 py-1.5 text-gray-400">DeFi</button>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-4 mb-8">
            <div className="h-48 w-full relative">
              <svg viewBox="0 0 1000 200" className="w-full h-full">
                {/* Grid lines */}
                <line x1="0" y1="0" x2="1000" y2="0" stroke="#2a2a3e" strokeWidth="1" />
                <line x1="0" y1="50" x2="1000" y2="50" stroke="#2a2a3e" strokeWidth="1" />
                <line x1="0" y1="100" x2="1000" y2="100" stroke="#2a2a3e" strokeWidth="1" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="#2a2a3e" strokeWidth="1" />
                <line x1="0" y1="200" x2="1000" y2="200" stroke="#2a2a3e" strokeWidth="1" />

                {/* Main line chart */}
                <path
                  d="M0,100 L100,50 L200,150 L300,120 L400,80 L500,30 L600,90 L700,70 L800,150 L900,50 L1000,100"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="3"
                />

                {/* Area under the chart */}
                <path
                  d="M0,100 L100,50 L200,150 L300,120 L400,80 L500,30 L600,90 L700,70 L800,150 L900,50 L1000,100 L1000,200 L0,200 Z"
                  fill="url(#gradient)"
                  fillOpacity="0.2"
                />

                {/* Secondary line */}
                <path
                  d="M0,150 L100,130 L200,140 L300,160 L400,120 L500,140 L600,130 L700,150 L800,120 L900,140 L1000,130"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Transaction History</h2>
            <div className="flex space-x-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a2a3e] text-gray-400">
                <CalendarIcon className="h-4 w-4" />
                Choose Date
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a2a3e] text-gray-400">
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl ${
                filter === "all" ? "bg-purple-600 text-white" : "bg-[#2a2a3e] text-gray-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("sent")}
              className={`px-4 py-2 rounded-xl ${
                filter === "sent" ? "bg-purple-600 text-white" : "bg-[#2a2a3e] text-gray-400"
              }`}
            >
              Sent
            </button>
            <button
              onClick={() => setFilter("received")}
              className={`px-4 py-2 rounded-xl ${
                filter === "received" ? "bg-purple-600 text-white" : "bg-[#2a2a3e] text-gray-400"
              }`}
            >
              Received
            </button>
          </div>

          {/* Transactions Table */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No transactions found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-900/30">
                    <th className="text-left py-4 font-medium text-gray-400">Transactions</th>
                    <th className="text-left py-4 font-medium text-gray-400">Amount</th>
                    <th className="text-left py-4 font-medium text-gray-400">Date</th>
                    <th className="text-left py-4 font-medium text-gray-400">Category</th>
                    <th className="text-left py-4 font-medium text-gray-400">Status</th>
                    <th className="text-left py-4 font-medium text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => {
                    const isSent = tx.from.toLowerCase() === (currentWallet?.address?.toLowerCase() || "")
                    const amount = isSent ? `- ${tx.value}` : `+ ${tx.value}`
                    const amountColor = isSent ? "text-white" : "text-green-500"

                    return (
                      <tr key={tx.hash} className="border-b border-purple-900/20 hover:bg-[#2a2a3e] transition">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-md bg-purple-900/30 text-purple-400 flex items-center justify-center font-semibold mr-3">
                              {tx.icon}
                            </div>
                            <span className="font-medium">{tx.merchant}</span>
                          </div>
                        </td>
                        <td className={`py-4 ${amountColor} font-medium`}>{amount} ETH</td>
                        <td className="py-4 text-gray-400">{tx.timeStamp}</td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              tx.category === "Exchange"
                                ? "bg-purple-900/30 text-purple-400"
                                : tx.category === "DeFi"
                                  ? "bg-blue-900/30 text-blue-400"
                                  : "bg-pink-900/30 text-pink-400"
                            }`}
                          >
                            {tx.category}
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              tx.status === "confirmed"
                                ? "bg-green-900/30 text-green-400"
                                : "bg-red-900/30 text-red-400"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-gray-400 hover:text-purple-400">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
