'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  WalletIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export const sidebarLinks = [
  {
    name: 'Wallet',
    href: '/wallet',
    icon: WalletIcon,
  },
  {
    name: 'Transfer',
    href: '/transfer',
    icon: ArrowsRightLeftIcon,
  },
  {
    name: 'Stocks',
    href: '/stocks',
    icon: ChartBarIcon,
  },
];

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-sidebar-toggle]')
      ) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      <div ref={sidebarRef}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
