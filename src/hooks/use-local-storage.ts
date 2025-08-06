
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// A Custom Hook that synchronizes state with localStorage.
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  
  const [storedValue, setStoredValue] = useState<T>(() => {
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

  // This ref will hold the latest storedValue, but updating it won't cause a re-render.
  const valueRef = useRef(storedValue);
  useEffect(() => {
    valueRef.current = storedValue;
  }, [storedValue]);

  // The setValue function is now wrapped in useCallback with an empty dependency array.
  // This ensures it has a stable identity across re-renders.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // It uses the ref to get the current value, avoiding a dependency on `storedValue`.
      const valueToStore = value instanceof Function ? value(valueRef.current) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
}
