"use client"

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingCard, PricingCardContent, PricingCardFooter, PricingCardHeader, PricingCardTitle } from "@/components/ui/pricing-card"
import Link from 'next/link'
const pricingPlans = [
    {
        name: "Starter",
        price: 0,
        features: [
            "Basic Wallet Management",
            "Limited Transaction History",
            "Community Support"
        ],
        unavailableFeatures: [
            "Advanced Analytics",
            "Priority Support",
            "Multi-Wallet Integration"
        ]
    },
    {
        name: "Pro",
        price: 19.99,
        features: [
            "Advanced Wallet Management",
            "Comprehensive Transaction History",
            "Priority Support",
            "Multi-Wallet Integration"
        ],
        unavailableFeatures: [
            "Enterprise-Level Security",
            "Dedicated Account Manager"
        ]
    },
    {
        name: "Enterprise",
        price: 49.99,
        features: [
            "Full Wallet Management",
            "Unlimited Transaction History",
            "Enterprise-Level Security",
            "Dedicated Account Manager",
            "Custom Integrations"
        ],
        unavailableFeatures: []
    }
]

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#0A0B0F] text-white">
            {/* Elegant Gradient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] 
                    bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
                    rotate-[-45deg] opacity-30 blur-3xl"></div>
            </div>
            <nav className="relative border-b border-[#1F2937]/10 pb-10 z-20 w-full py-6 px-8">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="text-purple-500 text-3xl">⚡</div>
                        <span className="text-xl font-semibold">CryptoWallet</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'Features', 'About', 'Pricing', 'Support'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

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
            <div className="fixed p-4  inset-0 z-0 select-none pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full">
                    {/* Purple gradient lines */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_45%,rgba(123,97,255,0.1)_45%,rgba(123,97,255,0.1)_55%,transparent_55%)]" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_35%,rgba(123,97,255,0.1)_35%,rgba(123,97,255,0.1)_45%,transparent_45%)]" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(123,97,255,0.1)_25%,rgba(123,97,255,0.1)_35%,transparent_35%)]" />
                </div>
            </div>

            <div className="container relative mx-auto px-4 py-16 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold 
                        bg-gradient-to-r from-purple-400 to-purple-600
                        text-transparent bg-clip-text pb-2">
                        Pricing Plans
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto text-white/80 mt-4">
                        Choose the perfect plan that fits your crypto management needs.
                        Flexible, scalable, and designed for your success.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={plan.name}
                            className={`bg-white/5 backdrop-blur-xl border border-white/10 
                                hover:border-purple-500/30 
                                transition-all duration-300 
                                group 
                                transform hover:scale-105 
                                hover:shadow-2xl
                                ${plan.name === 'Pro' ? 'border-2 border-purple-500/50' : ''}`}
                        >
                            <PricingCardHeader className="pb-4">
                                <div className="flex justify-between items-center">
                                    <PricingCardTitle className="text-2xl text-white">
                                        {plan.name}
                                    </PricingCardTitle>
                                    {plan.name === 'Pro' && (
                                        <span className="bg-purple-500/20 text-purple-300 
                                            px-3 py-1 rounded-full text-xs">
                                            Most Popular
                                        </span>
                                    )}
                                </div>
                            </PricingCardHeader>
                            <PricingCardContent className="space-y-6">
                                <div className="text-4xl font-bold">
                                    {plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-white/80">Features</h3>
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center space-x-2 text-white/70"
                                        >
                                            <Check className="w-5 h-5 text-green-500" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}

                                    {plan.unavailableFeatures.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center space-x-2 text-white/40 line-through"
                                        >
                                            <X className="w-5 h-5 text-red-500/50" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </PricingCardContent>
                            <PricingCardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full rounded-full 
                                        bg-white/5 border-white/10 
                                        text-white hover:bg-purple-500/20 
                                        transition-colors duration-300
                                        group-hover:bg-purple-500/30"
                                >
                                    {plan.price === 0 ? 'Get Started' : 'Choose Plan'}
                                </Button>
                            </PricingCardFooter>
                        </PricingCard>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                    className="mt-16 text-center bg-[#0A0B0F]/60 backdrop-blur-xl rounded-lg p-8 
                        border border-white/10 shadow-lg hover:shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Need a Custom Solution?
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto mb-6">
                        Looking for something unique? Our team can create a tailored pricing plan
                        that perfectly matches your enterprise requirements.
                    </p>
                    <Button
                        className="bg-gradient-to-r from-purple-500 to-purple-500 
                            text-white rounded-full px-8 py-3 
                            hover:from-purple-600 hover:to-purple-600 
                            transition-all duration-300"
                    >
                        Contact Sales
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}
