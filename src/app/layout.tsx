'use client';

import { Poppins } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Providers from "@/components/Providers";
import NavbarWrapper from "@/components/NavbarWrapper";
import ClientLayout from "@/components/ClientLayout";
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from "@/components/ThemeProvider";
import { ThemeProvider as CustomThemeProvider } from "@/context/ThemeContext";
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${poppins.className} bg-[#0A0B0F]`}
        suppressHydrationWarning
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CustomThemeProvider>
            <SessionProvider>
              <Providers>
                <NavbarWrapper />
                <ClientLayout>
                  <PageTransition>
                    <div className="min-h-screen">{children}</div>
                  </PageTransition>
                </ClientLayout>
              </Providers>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  success: {
                    style: {
                      background: '#212333',
                      color: '#4ADE80',
                      border: '1px solid #10B981',
                    },
                  },
                  error: {
                    style: {
                      background: '#212333',
                      color: '#F87171',
                      border: '1px solid #EF4444',
                    },
                  },
                }}
              />
            </SessionProvider>
          </CustomThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}