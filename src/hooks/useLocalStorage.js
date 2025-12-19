import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for persisting state to localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if nothing in storage
 * @returns {[any, Function]} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided default
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

/**
 * Load multiple keys from localStorage at once
 * @param {Object} keys - Object with key names and default values
 * @returns {Object} - Object with loaded values
 */
export const loadFromStorage = (keys) => {
  const result = {};

  Object.entries(keys).forEach(([name, { key, defaultValue }]) => {
    try {
      const item = localStorage.getItem(key);
      result[name] = item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      result[name] = defaultValue;
    }
  });

  return result;
};

/**
 * Save multiple values to localStorage at once
 * @param {Array} items - Array of { key, value } objects
 */
export const saveToStorage = (items) => {
  items.forEach(({ key, value }) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  });
};

/**
 * Clear specific keys from localStorage
 * @param {Array<string>} keys - Array of keys to clear
 */
export const clearStorage = (keys) => {
  keys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  });
};
