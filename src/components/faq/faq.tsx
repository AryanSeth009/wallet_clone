'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  category: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    category: "general",
    question: "Is there a free trial available?",
    answer: "Yes! You can try our wallet services for free for 30 days. During this period, you'll have access to all basic features and can store up to 5 different cryptocurrencies. We'll also provide you with a free 30-minute onboarding call to help you get started."
  },
  {
    category: "general",
    question: "What cryptocurrencies are supported?",
    answer: "Our wallet currently supports Bitcoin (BTC), Ethereum (ETH), and all ERC-20 tokens. We regularly add support for new cryptocurrencies based on community demand and security considerations."
  },
  {
    category: "security",
    question: "How secure is my crypto wallet?",
    answer: "We implement industry-leading security measures including multi-signature technology, 2FA, and cold storage options. All data is encrypted using AES-256 encryption, and we regularly undergo security audits by third-party firms."
  },
  {
    category: "security",
    question: "What happens if I lose my private key?",
    answer: "We provide a secure recovery process using your backup phrase (24 words) that you received during wallet setup. Store this phrase safely offline - it's your ultimate backup option."
  },
  {
    category: "pricing",
    question: "What are the transaction fees?",
    answer: "Transaction fees vary by network. We charge a small 0.1% service fee for exchanges. Network fees (gas fees for Ethereum, mining fees for Bitcoin) are displayed before you confirm any transaction."
  },
  {
    category: "pricing",
    question: "Are there any monthly charges?",
    answer: "Basic wallet features are free. Premium features like advanced analytics, priority support, and hardware wallet integration are available for $9.99/month."
  },
  {
    category: "features",
    question: "Can I connect to DeFi protocols?",
    answer: "Yes! Our wallet integrates with major DeFi protocols. You can connect directly to popular DEXs, lending platforms, and yield farming opportunities while maintaining full custody of your assets."
  },
  {
    category: "features",
    question: "Is there a mobile app available?",
    answer: "Yes, our mobile app is available for both iOS and Android devices. It syncs seamlessly with your web wallet and includes all core features plus mobile-specific security features."
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general")
  
  const filteredFAQs = faqData.filter(
    faq => activeCategory === "all" || faq.category === activeCategory
  )

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-12 ">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2">Frequently asked questions</h1>
        <p className="text-muted-foreground">
          These are the most commonly asked questions about our crypto wallet.
          Can't find what you're looking for?{' '}
          <a href="#" className="text-primary hover:underline">
            Chat to our friendly team
          </a>
        </p>
      </div>

      <Tabs defaultValue="general" className="mb-8">
        <TabsList className="w-full justify-start gap-1">
          <TabsTrigger
            value="general"
            onClick={() => setActiveCategory('general')}
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="security"
            onClick={() => setActiveCategory('security')}
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            onClick={() => setActiveCategory('pricing')}
          >
            Pricing
          </TabsTrigger>
          <TabsTrigger
            value="features"
            onClick={() => setActiveCategory('features')}
          >
            Features
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Accordion type="single" collapsible className="w-full">
        {filteredFAQs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>
    </div>
  )
}

