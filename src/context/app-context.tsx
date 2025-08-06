"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Product } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

export type CartItem = {
  id: string;
  quantity: number;
};

type AppContextType = {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId:string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  viewedProducts: string[];
  addToViewed: (productId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [viewedProducts, setViewedProducts] = useLocalStorage<string[]>(
    "viewedProducts",
    []
  );
  const { toast } = useToast();

  const addToCart = (productId: string, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { id: productId, quantity }];
    });
    toast({
        title: "Added to cart!",
        description: "The product has been added to your shopping cart.",
    })
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast({
      title: "Item removed",
      description: "The product has been removed from your cart.",
    })
  }

  const clearCart = () => {
    setCart([]);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  const addToViewed = (productId: string) => {
    setViewedProducts((prev) => {
      if (prev.includes(productId)) {
        // Move to the end to signify most recently viewed
        return [...prev.filter(id => id !== productId), productId];
      }
      // Keep list to a reasonable size, e.g., 10
      const updatedList = [...prev, productId];
      return updatedList.slice(-10);
    });
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    viewedProducts,
    addToViewed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
