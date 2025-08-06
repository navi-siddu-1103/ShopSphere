
'use server';

import {db} from '@/lib/firebase';
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore';

export type UserDetails = {
  uid: string;
  email: string;
  firstName: string;
  phone?: string;
  address?: string;
};

export async function getAllUsers(): Promise<UserDetails[]> {
  try {
    const usersCollection = collection(db, 'users');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        email: data.email,
        firstName: data.firstName,
        phone: data.phone,
        address: data.address,
      };
    });
    return userList;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
}

export async function getUserDetails(
  uid: string
): Promise<UserDetails | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return {
        uid,
        email: userDoc.data().email,
        firstName: userDoc.data().firstName,
        phone: userDoc.data().phone,
        address: userDoc.data().address,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

export async function createUserDetails(
  details: UserDetails
): Promise<{success: boolean; error?: string}> {
  try {
    // Check if user details already exist to prevent overwriting
    const userDoc = await getDoc(doc(db, 'users', details.uid));
    if (userDoc.exists()) {
      return {success: true}; // User details already exist, do nothing.
    }

    await setDoc(doc(db, 'users', details.uid), {
      email: details.email,
      firstName: details.firstName,
      phone: details.phone || '',
      address: details.address || '',
    });
    return {success: true};
  } catch (error: any) {
    console.error('Error creating user details:', error);
    return {success: false, error: error.message || 'Failed to save user details.'};
  }
}
