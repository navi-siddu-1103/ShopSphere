
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// A Custom Hook that synchronizes state with localStorage.
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This part runs only on the client, and only on the initial render.
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

  // This effect runs whenever `storedValue` changes.
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);


  return [storedValue, setStoredValue];
}
