
"use client";

import { createContext, useContext, ReactNode, useState, useEffect, useCallback, useRef } from "react";
import type { Product } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getCart, updateCart } from "@/actions/cart";
import { getUserDetails, type UserDetails } from "@/actions/users";
import { useRouter } from "next/navigation";


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
  buyNow: (productId: string) => void;
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
  const router = useRouter();

  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const isSyncing = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const details = await getUserDetails(currentUser.uid);
        setUserDetails(details);
      } else {
        setUserDetails(null);
        // Do not clear cart on logout, so guest cart persists until login
      }
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const syncCart = async () => {
      if (user && !isSyncing.current) {
        isSyncing.current = true;
        setUserLoading(true);

        try {
          const localCart = JSON.parse(window.localStorage.getItem('cart') || '[]');
          const firestoreCart = await getCart(user.uid);

          const mergedCartMap = new Map<string, CartItem>();
          
          firestoreCart.forEach(item => mergedCartMap.set(item.id, item));
          
          localCart.forEach((localItem: CartItem) => {
            const firestoreItem = mergedCartMap.get(localItem.id);
            if (firestoreItem) {
                mergedCartMap.set(localItem.id, {
                    ...localItem,
                    quantity: Math.max(localItem.quantity, firestoreItem.quantity)
                });
            } else {
                mergedCartMap.set(localItem.id, localItem);
            }
          });

          const finalCart = Array.from(mergedCartMap.values());
          
          setCart(finalCart);
          await updateCart(user.uid, finalCart);

        } catch (error) {
          console.error("Failed to sync cart with Firestore:", error);
        } finally {
          setUserLoading(false);
          isSyncing.current = false;
        }
      }
    };

    if (user && !userLoading) {
      syncCart();
    }
  }, [user, userLoading, setCart]);

  const handleCartUpdate = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    if (userRef.current) {
      updateCart(userRef.current.uid, newCart);
    }
  }, [setCart]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart(prevCart => {
      let newCart: CartItem[];
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
          newCart = prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
          newCart = [...prevCart, { id: productId, quantity }];
      }
      if (userRef.current) {
        updateCart(userRef.current.uid, newCart);
      }
      toast({
          title: "Added to cart!",
          description: "The product has been added to your shopping cart.",
      });
      return newCart;
    });
  }, [setCart, toast]);

  const removeFromCart = useCallback((productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    handleCartUpdate(newCart);
    toast({
      title: "Item removed",
      description: "The product has been removed from your cart.",
    });
  }, [cart, handleCartUpdate, toast]);

  const updateItemQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item => item.id === productId ? { ...item, quantity } : item);
    handleCartUpdate(newCart);
  }, [cart, handleCartUpdate, removeFromCart]);

  const clearCart = useCallback(() => {
    handleCartUpdate([]);
  }, [handleCartUpdate]);
  
  const buyNow = useCallback((productId: string) => {
    const newCart = [{ id: productId, quantity: 1 }];
    handleCartUpdate(newCart);
    router.push('/checkout');
  }, [handleCartUpdate, router]);

  const addToViewed = useCallback((productId: string) => {
    setViewedProducts((prev) => {
      const newViewed = prev.filter(id => id !== productId);
      newViewed.unshift(productId);
      return newViewed.slice(0, 5);
    });
  }, [setViewedProducts]);

  const value = {
    user,
    userDetails,
    userLoading,
    cart,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    buyNow,
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
