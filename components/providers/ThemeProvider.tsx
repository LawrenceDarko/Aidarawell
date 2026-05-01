/**
 * Theme Provider Component
 * 
 * Manages dark mode state and provides theme context to the application.
 * Respects the darkMode configuration from config.ts.
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { config } from '@/config';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Check if dark mode is enabled in config
    if (!config.theme.darkMode) {
      return;
    }

    // Check localStorage for user preference
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setIsDarkMode(stored === 'true');
    } else {
      // Default to system preference if config allows
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (!mounted || !config.theme.darkMode) {
      return;
    }

    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => {
    if (!config.theme.darkMode) return;
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (enabled: boolean) => {
    if (!config.theme.darkMode) return;
    setIsDarkMode(enabled);
  };

  // Always provide context, even when not mounted, to prevent errors
  // The context value will update once mounted
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
