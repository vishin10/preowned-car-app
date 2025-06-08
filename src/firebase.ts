// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4Et0h1lA4_iXMPt8N29axBqCIzaa08Sg",
  authDomain: "cardealer-york.firebaseapp.com",
  projectId: "cardealer-york",
  storageBucket: "cardealer-york.firebasestorage.app",
    messagingSenderId: "518249951508",
  appId: "1:518249951508:web:bdf527cab3e623de281201",
  measurementId: "G-SJVCDGGXMK"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
