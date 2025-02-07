"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Phone, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FAQPage from '@/components/faq/faq'
import Link from 'next/link'
export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [donationAmount, setDonationAmount] = useState('');
    const [showQR, setShowQR] = useState(false);

    const generateDonationQR = () => {
        // Validate amount and show QR
        if (donationAmount && parseFloat(donationAmount) > 0) {
            setShowQR(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0B0F] h-screen-full  ">
            <div
                className=" absolute  inset-0 bg-[linear-gradient(to_right,#1a1a3a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a3a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"
            />
            <div className="fixed p-4  inset-0 z-0 select-none pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full">
                    {/* Purple gradient lines */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_45%,rgba(123,97,255,0.1)_45%,rgba(123,97,255,0.1)_55%,transparent_55%)]" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_35%,rgba(123,97,255,0.1)_35%,rgba(123,97,255,0.1)_45%,transparent_45%)]" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(123,97,255,0.1)_25%,rgba(123,97,255,0.1)_35%,transparent_35%)]" />
                </div>
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
            <div className="container relative mx-auto px-4 py-16">
                {/* Elegant Gradient Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] 
                        bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
                        rotate-[-45deg] opacity-30 blur-3xl"></div>
                </div>

                <div className="relative z-10 text-center space-y-6 mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-6xl font-bold 
                        bg-gradient-to-r from-purple-400 to-purple-600 
                        text-transparent bg-clip-text"
                    >
                        Support Center
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-xl max-w-3xl mx-auto text-white/80"
                    >
                        Comprehensive support tailored to your needs. Get instant help, explore FAQs, or connect with our expert team.
                    </motion.p>

                    {/* Enhanced Search Input */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="relative max-w-2xl mx-auto group"
                    >
                        <Input
                            type="search"
                            placeholder="Search help articles, topics, or questions..."
                            className="pl-12 pr-4 py-3 
                            bg-white/5 border-white/10 
                            focus:border-purple-500/50 
                            focus:ring-2 focus:ring-purple-500/30 
                            rounded-full 
                            text-white 
                            placeholder-white/50
                            transition-all duration-300 
                            group-hover:bg-white/10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 
                            text-white/50 group-hover:text-white/80 
                            transition-colors duration-300" />
                    </motion.div>
                </div>

                <Tabs defaultValue="support" className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    >
                        <TabsList className="grid w-full grid-cols-2 
                            bg-white/5 backdrop-blur-xl 
                            border border-white/10 
                            rounded-full p-1 mb-8 
                            max-w-md mx-auto">
                            <TabsTrigger
                                value="support"
                                className="rounded-full data-[state=active]:bg-gradient-to-r 
                                data-[state=active]:from-purple-500 
                                data-[state=active]:to-purple -500 
                                data-[state=active]:text-white 
                                text-white/70 
                                hover:bg-white/10 
                                transition-all duration-300"
                            >
                                Support Options
                            </TabsTrigger>
                            <TabsTrigger
                                value="faq"
                                className="rounded-full data-[state=active]:bg-gradient-to-r 
                                data-[state=active]:from-purple-500 
                                data-[state=active]:to-purple -500 
                                data-[state=active]:text-white 
                                text-white/70 
                                hover:bg-white/10 
                                transition-all duration-300"
                            >
                                FAQ
                            </TabsTrigger>
                        </TabsList>
                    </motion.div>

                    <TabsContent value="support">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {/* Email Support */}
                            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 
                                hover:border-purple-500/30 
                                transition-all duration-300 
                                group 
                                transform hover:scale-105 
                                hover:shadow-2xl">
                                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                    <Mail className="w-10 h-10 text-purple-500 group-hover:scale-110 transition-transform" />
                                    <CardTitle className="text-xl text-white">Email Support</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-white/70">
                                        Reach out to our dedicated support team via email for comprehensive assistance.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full rounded-full 
                                        bg-white/5 border-white/10 
                                        text-white hover:bg-purple-500/20 
                                        transition-colors duration-300">
                                        Contact Support
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Live Chat */}
                            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 
                                hover:border-purple-500/30 
                                transition-all duration-300 
                                group 
                                transform hover:scale-105 
                                hover:shadow-2xl">
                                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                    <MessageCircle className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform" />
                                    <CardTitle className="text-xl text-white">Live Chat</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-white/70">
                                        Get instant help through our real-time live chat support.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full rounded-full 
                                        bg-white/5 border-white/10 
                                        text-white hover:bg-green-500/20 
                                        transition-colors duration-300">
                                        Start Chat
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Phone Support */}
                            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 
                                hover:border-purple-500/30 
                                transition-all duration-300 
                                group 
                                transform hover:scale-105 
                                hover:shadow-2xl">
                                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                    <Phone className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
                                    <CardTitle className="text-xl text-white">Phone Support</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-white/70">
                                        Call our dedicated support hotline for immediate assistance.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full rounded-full 
                                        bg-white/5 border-white/10 
                                        text-white hover:bg-blue-500/20 
                                        transition-colors duration-300">
                                        Call Support
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="faq">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                        >
                            <FAQPage />
                        </motion.div>
                    </TabsContent>
                </Tabs>

                {/* Donation Section */}
                <div className="mt-16 text-center bg-[#0A0B0F]/60 border-white/10 backdrop-blur-xl  rounded-lg p-8 border border-white/10 bg-[#12131A]/20 backdrop-blur-2xl shadow-lg hover:shadow-xl">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Support Our Mission</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        Help us continue improving our services. Your donation makes a difference!
                    </p>

                    <div className="max-w-md mx-auto mb-6 space-y-4">
                        <div>
                            <label
                                htmlFor="donationAmount"
                                className="text-muted-foreground block mb-2"
                            >
                                Enter Donation Amount (INR)
                            </label>
                            <Input
                                id="donationAmount"
                                type="number"
                                placeholder="Enter amount in INR"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                className="mt-2 bg-[#12131A]/40 backdrop-blur-lg border-[#1E1E2F]/20"
                                min="1"
                            />
                        </div>

                        {showQR && donationAmount && (
                            <div className="mt-4 flex flex-col items-center">
                                <div className="w-64 h-64 bg-transparent border p-4 rounded-lg flex items-center justify-center">
                                    <Image
                                        src="/upi-qr.jpg"  // Replace with your actual UPI QR code image
                                        alt="UPI Donation QR Code"
                                        width={250}
                                        height={250}
                                        className="object-contain"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Scan to donate ₹{donationAmount}
                                </p>
                                <div className="mt-2 text-xs text-gray-500">
                                    <p>
                                        UPI ID:{" "}
                                        <span
                                            onClick={() => {
                                                navigator.clipboard.writeText("setharyan53@okaxis");
                                                alert("UPI ID copied to clipboard: setharyan53@okaxis");
                                            }}
                                            className="text-blue-500 font-semibold cursor-pointer underline"
                                        >
                                            setharyan53@okaxis
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        size="lg"
                        onClick={generateDonationQR}
                        disabled={!donationAmount}
                        className="hover:bg-primary bg-transparent border border-primary rounded-full hover:bg-primary/90 text-primary-foreground"
                    >
                        Generate Donation QR
                    </Button>
                </div>
            </div>

        </div>
    )
}
