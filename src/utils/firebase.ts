import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { getFirestore, Firestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Check local storage config cache or environment variables
const STORAGE_CONFIG_KEY = 'nagarjuna_firebase_custom_config';

export const getFirebaseConfig = (): FirebaseClientConfig | null => {
  // 1. Check if user configured in env variables
  const envConfig: FirebaseClientConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };

  if (envConfig.apiKey && envConfig.projectId && envConfig.storageBucket) {
    return envConfig;
  }

  // 2. Check if user saved their config via staff settings in browser
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom firebase config:', e);
  }

  return null;
};

export const saveCustomFirebaseConfig = (config: FirebaseClientConfig) => {
  localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
};

export const clearCustomFirebaseConfig = () => {
  localStorage.removeItem(STORAGE_CONFIG_KEY);
};

let cachedApp: FirebaseApp | null = null;
let cachedStorage: FirebaseStorage | null = null;
let cachedFirestore: Firestore | null = null;

export const getFirebaseApp = (): FirebaseApp | null => {
  const config = getFirebaseConfig();
  if (!config) return null;

  try {
    if (getApps().length > 0) {
      return getApp();
    }
    cachedApp = initializeApp(config);
    return cachedApp;
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return null;
  }
};

export const getFirebaseStorageInstance = (): FirebaseStorage | null => {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!cachedStorage) {
    try {
      cachedStorage = getStorage(app);
    } catch (e) {
      console.error('Error getting storage:', e);
    }
  }
  return cachedStorage;
};

export const getFirebaseFirestoreInstance = (): Firestore | null => {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!cachedFirestore) {
    try {
      cachedFirestore = getFirestore(app);
    } catch (e) {
      console.error('Error getting firestore:', e);
    }
  }
  return cachedFirestore;
};

export const isFirebaseConfigured = (): boolean => {
  const config = getFirebaseConfig();
  return Boolean(config && config.apiKey && config.projectId && config.storageBucket);
};

/**
 * Upload an event photo to Firebase Storage
 * Returns the public download URL
 */
export const uploadEventPhotoToFirebase = async (
  file: File | Blob,
  filename?: string,
  folder: string = 'events'
): Promise<string> => {
  const storage = getFirebaseStorageInstance();
  if (!storage) {
    throw new Error('Firebase Storage is not configured. Please supply your Firebase config.');
  }

  const cleanName = filename ? filename.replace(/[^a-zA-Z0-9.-]/g, '_') : 'photo.jpg';
  const uniquePath = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanName}`;
  const storageRef = ref(storage, uniquePath);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
};
