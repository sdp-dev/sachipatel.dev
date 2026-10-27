import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme';

// index.html sets data-theme before first paint (saved choice, else system setting); read it back here.
export const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
