"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Simplified props that match the expected component props
interface ThemeProviderProps {
  children: React.ReactNode;
  [key: string]: any; // Allow any props that NextThemesProvider accepts
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Ensure dark theme is always used
  const themeProps = {
    ...props,
    defaultTheme: "dark",
    forcedTheme: "dark",
    enableSystem: false,
  };
  
  return <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
}
