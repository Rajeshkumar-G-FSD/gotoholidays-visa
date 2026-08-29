import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDgimLhzvrHAj8yhMaKnAXwKnpv1Sr8n5E',
  authDomain: 'gotoprojects-68f2c.firebaseapp.com',
  projectId: 'gotoprojects-68f2c',
  storageBucket: 'gotoprojects-68f2c.firebasestorage.app',
  messagingSenderId: '762459897239',
  appId: '1:762459897239:web:d21291c31353b7aaaad8d2',
  measurementId: 'G-W2SFZDZGL9',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics only runs in supported browser contexts — guard so it never throws.
isSupported()
  .then((ok) => {
    if (ok) getAnalytics(app);
  })
  .catch(() => {
    /* analytics unavailable — ignore */
  });

export const ADMIN_EMAIL = 'gotoholidaysvisa@gmail.com';
export const ADMIN_PASSWORD = '123456';
