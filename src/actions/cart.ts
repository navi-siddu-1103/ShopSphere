
'use server';

import {db} from '@/lib/firebase';
import {doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import type { CartItem } from '@/context/app-context';

export async function getCart(uid: string): Promise<CartItem[]> {
    if (!uid) return [];
    try {
        const cartDoc = await getDoc(doc(db, 'carts', uid));
        if (cartDoc.exists()) {
            const data = cartDoc.data();
            // Ensure items is an array, default to empty array if not found
            return data.items || [];
        }
        return [];
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
}

export async function updateCart(uid: string, cart: CartItem[]): Promise<{success: boolean; error?: string}> {
     if (!uid) {
        return {success: false, error: "User is not authenticated."};
    }
    try {
        await setDoc(doc(db, 'carts', uid), {
            items: cart,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return {success: true};
    } catch (error: any) {
        console.error('Error updating cart:', error);
        return {success: false, error: error.message || 'Failed to update cart.'};
    }
}
