import React from 'react';
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
    onTagClick: (tag: string) => void;
}

export default function Footer({ onTagClick }: FooterProps) {
    const cryptoTags = [
        'Bitcoin', 'Ethereum', 'Blockchain', 'NFT', 'DeFi', 'Web3',
        'Cryptocurrency', 'Smart Contracts', 'Metaverse', 'DAO', 'DApps',
        'Mining', 'Staking', 'Wallet', 'Exchange', 'Layer 2', 'GameFi',
        'Yield Farming', 'Tokenomics', 'Crypto Mining'
    ];

    const categories = {
        Business: ['Crypto Markets', 'DeFi Projects', 'NFT Trading', 'Mining Operations', 'Exchange News'],
        Technology: ['Blockchain', 'Smart Contracts', 'Layer 2 Solutions', 'Web3', 'DApps'],
        Features: ['Project Reviews', 'Market Analysis', 'Technical Deep Dives', 'Expert Interviews'],
        Community: ['Discord Groups', 'Telegram Channels', 'Reddit Forums', 'Twitter Spaces']
    };

    return (
        <footer className=" border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                {/* Trending Tags Section */}
                <div className="mb-12">
                    <h2 className="flex items-center gap-2 font-sans text-xl font-bold text-white mb-6">
                        {React.createElement(Tag, { className: "h-5 w-5 font-sans leading-none   text-purple-500" })}
                        Trending in Crypto & Web3
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {cryptoTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-[#231d30] hover:bg-purple-600 text-gray-300 hover:text-white cursor-pointer transition-colors border border-gray-800"
                                onClick={() => onTagClick(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                    {Object.entries(categories).map(([category, items]) => (
                        <div key={category}>
                            <h3 className="text-white font-semibold mb-4">{category}</h3>
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <li
                                        key={item}
                                        className="text-gray-400 hover:text-purple-500 cursor-pointer transition-colors"
                                        onClick={() => onTagClick(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Social Links & Copyright */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-400">
                            2024 Crypto News Hub. All rights reserved.
                        </div>
                        <div className="flex gap-6">
                            <a href="">
                                {React.createElement(Facebook, { className: "w-5 h-5 text-gray-400 hover:text-purple-500 cursor-pointer transition-colors" })}
                            </a>
                            <a href="">
                                {React.createElement(Twitter, { className: "w-5 h-5 text-gray-400 hover:text-purple-500 cursor-pointer transition-colors" })}

                            </a>
                            <a href="">
                                {React.createElement(Youtube, { className: "w-5 h-5 text-gray-400 hover:text-purple-500 cursor-pointer transition-colors" })}

                            </a>
                            <a href="">
                                {React.createElement(Instagram, { className: "w-5 h-5 text-gray-400 hover:text-purple-500 cursor-pointer transition-colors" })}

                            </a>


                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}