
import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    } catch (error) {
      console.error(`Failed to read "${key}" from localStorage:`, error);

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save "${key}" to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

