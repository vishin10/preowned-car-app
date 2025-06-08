import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { ServiceAccount } from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket: "cardealer-york.firebasestorage.app",});

export const db = getFirestore(app);
export const bucket = getStorage().bucket();
