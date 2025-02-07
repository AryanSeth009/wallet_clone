'use client';

import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Providers from "@/components/Providers";
import NavbarWrapper from "@/components/NavbarWrapper";
import ClientLayout from "@/components/ClientLayout";
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.className} dark:bg-background bg-white`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
                success: {
                  style: {
                    background: '#4CAF50',
                    color: 'white',
                  },
                },
                error: {
                  style: {
                    background: '#F44336',
                    color: 'white',
                  },
                },
              }}
            />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}