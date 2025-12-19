import { createContext, useContext } from 'react';

// Theme context for dark mode state
export const DarkModeContext = createContext({
  isDarkMode: true,
  setIsDarkMode: () => {}
});

// Hook to access dark mode state
export const useDarkMode = () => useContext(DarkModeContext).isDarkMode;

// Hook to access the full context (including setter)
export const useDarkModeContext = () => useContext(DarkModeContext);
