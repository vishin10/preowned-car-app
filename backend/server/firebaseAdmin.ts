import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { ServiceAccount } from 'firebase-admin';

const serviceAccountJSON = process.env.SERVICE_ACCOUNT_JSON_BASE64;

if (!serviceAccountJSON) {
  throw new Error("❌ Missing Firebase credentials in environment variable.");
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountJSON, 'base64').toString('utf-8')
) as ServiceAccount;

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'cardealer-york.firebasestorage.app',
});

export const db = getFirestore(app);
export const bucket = getStorage().bucket();
