import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { ServiceAccount } from 'firebase-admin';
import fs from 'fs';

// ✅ Use the exact filename from Render's Secret Files
const secretPath = '/etc/secrets/cardealer-york-firebase-adminsdk-fbsvc-55a6c05a9f.json';

if (!fs.existsSync(secretPath)) {
  throw new Error('❌ Firebase service account key file not found at ' + secretPath);
}

const serviceAccount = JSON.parse(fs.readFileSync(secretPath, 'utf-8')) as ServiceAccount;

const app = initializeApp({
  credential: cert(serviceAccount),
storageBucket: "cardealer-york.firebasestorage.app",
});

export const db = getFirestore(app);
export const bucket = getStorage().bucket();
