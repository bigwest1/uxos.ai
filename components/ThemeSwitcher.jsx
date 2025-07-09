import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Toggle between light and dark themes.
 */
export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-700 hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
