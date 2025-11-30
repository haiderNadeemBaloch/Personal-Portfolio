'use client';

import { useEffect, useState } from 'react';
import {
  getThemePreference,
  applyTheme,
  setThemePreference,
  type Theme,
} from '@/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('auto');

  useEffect(() => {
    setMounted(true);
    const initialTheme = getThemePreference();
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemePreference(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

import { createContext, useContext } from 'react';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'auto',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
