"use server";

import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { CartItem } from "@/context/app-context";
import { products } from "@/lib/data";

type OrderPayload = {
  userId: string;
  items: CartItem[];
  total: number;
};

export async function createOrder(payload: OrderPayload): Promise<{ orderId: string } | { error: string }> {
  if (!payload.userId) {
    return { error: "User is not authenticated." };
  }
  if (!payload.items || payload.items.length === 0) {
    return { error: "Cannot create an empty order." };
  }

  try {
    const itemsWithPrice = payload.items.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        return {
            ...cartItem,
            price: product?.price || 0,
        }
    });

    const docRef = await addDoc(collection(db, "orders"), {
      userId: payload.userId,
      items: itemsWithPrice,
      total: payload.total,
      createdAt: serverTimestamp(),
    });
    return { orderId: docRef.id };
  } catch (error: any) {
    console.error("Error creating order:", error);
    return { error: error.message || "Failed to create order." };
  }
}
