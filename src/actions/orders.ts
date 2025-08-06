
"use server";

import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { CartItem } from "@/context/app-context";
import { products } from "@/lib/data";

type OrderPayload = {
  userId: string; // Can be UID or "guest"
  items: CartItem[];
  total: number;
  shippingDetails: {
      name: string;
      email: string;
      phone?: string;
      address: string;
  }
};

export async function createOrder(payload: OrderPayload): Promise<{ orderId: string } | { error: string }> {
  if (!payload.userId) {
    return { error: "User identifier is missing." };
  }
  if (!payload.items || payload.items.length === 0) {
    return { error: "Cannot create an empty order." };
  }
  if (!payload.shippingDetails || !payload.shippingDetails.name || !payload.shippingDetails.email || !payload.shippingDetails.address) {
    return { error: "Shipping details are incomplete." };
  }

  try {
    const itemsWithPrice = payload.items.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        return {
            ...cartItem,
            price: product?.price || 0,
            name: product?.name || "Unknown Product"
        }
    });

    const docRef = await addDoc(collection(db, "orders"), {
      userId: payload.userId,
      items: itemsWithPrice,
      total: payload.total,
      shippingDetails: payload.shippingDetails,
      createdAt: serverTimestamp(),
      status: "pending"
    });
    return { orderId: docRef.id };
  } catch (error: any) {
    console.error("Error creating order:", error);
    return { error: error.message || "Failed to create order." };
  }
}
