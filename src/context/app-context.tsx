
"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
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
  const [isCartSynced, setIsCartSynced] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUserLoading(true);
      setUser(currentUser);
      if (currentUser) {
        const details = await getUserDetails(currentUser.uid);
        setUserDetails(details);
        setIsCartSynced(false); 
      } else {
        setUserDetails(null);
        setCart([]); 
        setIsCartSynced(true); 
      }
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, [setCart]);

  useEffect(() => {
    if (user && !isCartSynced) {
      const syncCart = async () => {
        try {
          // Use the value directly from localStorage to avoid stale state issues
          const localCart = JSON.parse(window.localStorage.getItem('cart') || '[]');
          const firestoreCart = await getCart(user.uid);

          const mergedCartMap = new Map<string, CartItem>();

          firestoreCart.forEach(item => mergedCartMap.set(item.id, item));
          
          localCart.forEach(localItem => {
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
            setIsCartSynced(true);
        }
      };
      syncCart();
    }
  }, [user, isCartSynced, setCart]);


  const handleCartUpdate = (newCart: CartItem[]) => {
    setCart(newCart);
    if(user) {
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
