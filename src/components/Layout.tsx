import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
} 