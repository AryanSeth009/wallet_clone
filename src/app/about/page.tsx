"use client"

import { useState } from 'react'
import Router from 'next/router'
import { motion } from 'framer-motion'
import { Shield, Zap, Globe, Users, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
const features = [
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description: "Your assets are protected by state-of-the-art encryption and multi-factor authentication.",
        color: "text-green-500"
    },
    {
        icon: Zap,
        title: "Lightning Fast Transactions",
        description: "Experience near-instantaneous transfers across multiple blockchain networks.",
        color: "text-yellow-500"
    },
    {
        icon: Globe,
        title: "Multi-Currency Support",
        description: "Manage Bitcoin, Ethereum, and over 100 other cryptocurrencies in one place.",
        color: "text-blue-500"
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Join a vibrant community of crypto enthusiasts and get 24/7 support.",
        color: "text-purple-500"
    }
]

export default function AboutSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="py-2    bg-[#0A0B0F] from-background to-secondary/20 overflow-hidden">
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"
            />
            <div className="fixed p-4  inset-0 z-0 select-none pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full">
                    {/* Purple gradient lines */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_45%,rgba(123,97,255,0.1)_45%,rgba(123,97,255,0.1)_55%,transparent_55%)]" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_35%,rgba(123,97,255,0.1)_35%,rgba(123,97,255,0.1)_45%,transparent_45%)]" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(123,97,255,0.1)_25%,rgba(123,97,255,0.1)_35%,transparent_35%)]" />
                </div>
            </div>
            <nav className="relative  z-20 w-full py-4 pb-20 px-8">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="text-purple-500 text-3xl">⚡</div>
                        <span className="text-xl font-semibold">CryptoWallet</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/home" className="text-gray-300 hover:text-white transition-colors">
                            Home
                        </Link>
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
            <div className="container relative mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                        About CryptoSafe Wallet
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Secure, fast, and user-friendly. Your gateway to the world of cryptocurrencies.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card
                                className="h-full rounded-2xl border border-[#1E1E2F]/20 bg-[#12131A]/20 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <CardContent className="p-6 relative z-10">
                                    <feature.icon className={`w-12 h-12 ${feature.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`} />
                                    <h3 className="text-xl font-semibold mb-2 text-white/90">{feature.title}</h3>
                                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature.description}</p>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4"
                                        >
                                            <Button variant="link" className="p-0 text-white/80 hover:text-white">
                                                Learn more <ChevronRight className="ml-1 w-4 h-4" />
                                            </Button>
                                        </motion.div>
                                    )}
                                </CardContent>
                                {/* Subtle background blur effect */}
                                <div className="absolute inset-0 bg-[#12131A]/10 backdrop-blur-sm z-0"></div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <Tabs defaultValue="beginners" className="w-full max-w-3xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2 rounded-2xl   bg-[#12131A]/80 backdrop-blur-lg shadow-lg border-[#1E1E2F]/20">
                            <TabsTrigger value="beginners" className="w-full rounded-xl   hover:bg-[#12131A]/80 backdrop-blur-lg shadow-lg border-[#1E1E2F]/20">For Beginners</TabsTrigger>
                            <TabsTrigger value="advanced" className="w-full rounded-xl">For Advanced Users</TabsTrigger>
                        </TabsList>
                        <TabsContent value="beginners" className="mt-4 rounded-2xl">
                            <Card className='rounded-2xl  bg-[#12131A]/20 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'>
                                <CardContent className="p-6 ">
                                    <h3 className="text-2xl font-bold mb-4">New to Crypto?</h3>
                                    <p className="mb-4">CryptoSafe Wallet is the perfect starting point for your crypto journey. We offer:</p>
                                    <ul className="list-disc pl-5 mb-4">
                                        <li>Easy-to-use interface</li>
                                        <li>Educational resources</li>
                                        <li>Step-by-step guides</li>
                                        <li>24/7 customer support</li>
                                    </ul>
                                    <Button className='rounded-full hover:bg-transparent hover:border-white hover:border hover:text-white' onClick={() => window.location.href =('/signup')} >Get Started</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="advanced" className="mt-4">
                            <Card className='rounded-2xl  bg-[#12131A]/20 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'>
                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold mb-4">For the Crypto Pros</h3>
                                    <p className="mb-4">Take your crypto management to the next level with advanced features:</p>
                                    <ul className="list-disc pl-5 mb-4">
                                        <li>Multi-signature wallets</li>
                                        <li>Hardware wallet integration</li>
                                        <li>Advanced trading tools</li>
                                        <li>API access for developers</li>
                                    </ul>
                                    <Button className='rounded-full hover:bg-transparent hover:border-white hover:border hover:text-white'>Explore Advanced Features</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-primary text-primary-foreground rounded-xl p-8 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDYwTDYwIDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-10"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Ready to dive into the world of crypto?</h3>
                        <p className="mb-6 max-w-2xl mx-auto text-primary-foreground/80">
                            Whether you're a seasoned trader or just getting started, CryptoSafe Wallet provides the tools and security you need to manage your digital assets with confidence.
                        </p>
                        <Button onClick={() => window.location.href = ('/signup')} variant="secondary" size="lg" className="animate-pulse rounded-full">
                            Get Started Now
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

