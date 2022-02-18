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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains(DARK));
  }, []);

  function toggleDarkMode() {
    const root = window.document.documentElement;

    if (isDarkMode) {
      setIsDarkMode(false);
      root.classList.remove(DARK);
      localStorage.theme = LIGHT;
    } else {
      setIsDarkMode(true);
      root.classList.add(DARK);
      localStorage.theme = DARK;
    }
  }

  return { isDarkMode, toggleDarkMode };
}
