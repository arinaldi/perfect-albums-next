import { useEffect, useState } from 'react';

interface Payload {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

const { DARK, LIGHT } = THEME;

export default function useDarkMode(): Payload {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : LIGHT,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === DARK ? LIGHT : DARK);
    root.classList.add(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  function toggleDarkMode() {
    setTheme(theme === DARK ? LIGHT : DARK);
  }

  return { isDarkMode: theme === DARK, toggleDarkMode };
}
