
"use client";

import { createContext, useContext, ReactNode, useState, useEffect, useRef } from "react";
import type { Product } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getCart, updateCart } from "@/actions/cart";
import { getUserDetails, type UserDetails } from "@/actions/users";


export type CartItem = {
  id: string;
  quantity: number;
};

type AppContextType = {
  user: User | null;
  userDetails: UserDetails | null;
  userLoading: boolean;
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId:string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  viewedProducts: string[];
  addToViewed: (productId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [viewedProducts, setViewedProducts] = useLocalStorage<string[]>(
    "viewedProducts",
    []
  );
  const { toast } = useToast();
  const isSyncing = useRef(false);

  // Set up Firebase auth listener once on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const details = await getUserDetails(currentUser.uid);
        setUserDetails(details);
      } else {
        setUserDetails(null);
      }
      setUserLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sync cart when user logs in
  useEffect(() => {
    const syncCart = async () => {
      if (user && !isSyncing.current) {
        isSyncing.current = true;
        setUserLoading(true);

        try {
          const localCart = JSON.parse(window.localStorage.getItem('cart') || '[]');
          const firestoreCart = await getCart(user.uid);

          const mergedCartMap = new Map<string, CartItem>();

          // Add firestore items first
          firestoreCart.forEach(item => mergedCartMap.set(item.id, item));
          
          // Merge local items
          localCart.forEach((localItem: CartItem) => {
            const firestoreItem = mergedCartMap.get(localItem.id);
            if (firestoreItem) {
                // If item exists in both, take the larger quantity
                mergedCartMap.set(localItem.id, {
                    ...localItem,
                    quantity: Math.max(localItem.quantity, firestoreItem.quantity)
                });
            } else {
                mergedCartMap.set(localItem.id, localItem);
            }
          });

          const finalCart = Array.from(mergedCartMap.values());
          
          // Update state and persistence layers
          setCart(finalCart);
          await updateCart(user.uid, finalCart);

        } catch (error) {
          console.error("Failed to sync cart with Firestore:", error);
        } finally {
          setUserLoading(false);
          isSyncing.current = false;
        }
      } else if (!user) {
        // Clear cart on logout
        setCart([]);
      }
    };

    if (user !== undefined) {
        syncCart();
    }
  }, [user, setCart]);


  const handleCartUpdate = (newCart: CartItem[]) => {
    setCart(newCart);
    if(user) {
      // Debounce or batch updates in a real app if this becomes too chatty
      updateCart(user.uid, newCart);
    }
  };


  const addToCart = (productId: string, quantity = 1) => {
    let newCart: CartItem[] = [];
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        newCart = cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
        newCart = [...cart, { id: productId, quantity }];
    }
    handleCartUpdate(newCart);

    toast({
        title: "Added to cart!",
        description: "The product has been added to your shopping cart.",
    });
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    handleCartUpdate(newCart);
    toast({
      title: "Item removed",
      description: "The product has been removed from your cart.",
    });
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item => item.id === productId ? { ...item, quantity } : item);
    handleCartUpdate(newCart);
  };

  const clearCart = () => {
    handleCartUpdate([]);
  };

  const addToViewed = (productId: string) => {
    setViewedProducts((prev) => {
      const newViewed = prev.filter(id => id !== productId);
      newViewed.unshift(productId);
      return newViewed.slice(0, 5);
    });
  };

  const value = {
    user,
    userDetails,
    userLoading,
    cart,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
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
