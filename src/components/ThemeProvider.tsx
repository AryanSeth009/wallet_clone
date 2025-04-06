"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Simplified props that match the expected component props
interface ThemeProviderProps {
  children: React.ReactNode;
  [key: string]: any; // Allow any props that NextThemesProvider accepts
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
