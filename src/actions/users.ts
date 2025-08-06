'use server';

import {db} from '@/lib/firebase';
import {doc, setDoc} from 'firebase/firestore';

export type UserDetails = {
  uid: string;
  email: string;
  firstName: string;
  phone: string;
  address: string;
};

export async function createUserDetails(
  details: UserDetails
): Promise<{success: boolean; error?: string}> {
  try {
    await setDoc(doc(db, 'users', details.uid), {
      email: details.email,
      firstName: details.firstName,
      phone: details.phone,
      address: details.address,
    });
    return {success: true};
  } catch (error: any) {
    console.error('Error creating user details:', error);
    return {success: false, error: error.message || 'Failed to save user details.'};
  }
}
