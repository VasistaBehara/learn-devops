import { useEffect, useMemo } from 'react';
import { THEME_KEY } from '../constants';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export function useTheme() {
  const preferred = useMemo(() => getPreferredTheme(), []);
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, preferred);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, toggleTheme, setTheme };
}
