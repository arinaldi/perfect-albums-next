import { useEffect, useState } from 'react';

interface Payload {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function useDarkMode(): Payload {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window && localStorage.theme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  function toggleDarkMode() {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  }

  return { isDarkMode, toggleDarkMode };
}
