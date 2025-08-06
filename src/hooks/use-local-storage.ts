
"use client";

import { useState, useEffect, useCallback } from "react";

// A Custom Hook that synchronizes state with localStorage.
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  
  // State to store our value. 
  // It's initialized from localStorage if available, otherwise with the initialValue.
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This function is only executed on the initial render.
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // A function to update the state. It's wrapped in useCallback to avoid
  // unnecessary re-creations of the function.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}
