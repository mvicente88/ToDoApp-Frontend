import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
     if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', darkMode ? 'light' : 'dark');
  };

  const themeColors = {
    light: {
      background: '#FFFDF4',
      text: '#D6D6D6',
      icons: '#DFBD43',
    },
    dark: {
      background: '#444444',
      text: '#D6D6D6',
      icons: '#DFBD43',
    },
  };

  const theme = darkMode ? themeColors.dark : themeColors.light;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useCustomTheme = () => useContext(ThemeContext);

export { CustomThemeProvider, useCustomTheme };
