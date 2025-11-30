'use client';

export type Theme = 'light' | 'dark' | 'auto';

export function getThemePreference(): Theme {
  if (typeof window === 'undefined') return 'auto';
  const stored = localStorage.getItem('theme') as Theme | null;
  return stored || 'auto';
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;

  root.classList.remove('light', 'dark');
  root.classList.add(effectiveTheme);
}

export function setThemePreference(theme: Theme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}
