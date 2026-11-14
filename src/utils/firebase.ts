import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator, Firestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc, onSnapshot, writeBatch, query, limit } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';
import type { EventItem } from '../types';

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

// Only for local testing against the Firebase emulators; never set in production.
const useEmulator = import.meta.env.VITE_FIREBASE_EMULATOR === 'true';

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
      if (useEmulator) connectFirestoreEmulator(cachedFirestore, '127.0.0.1', 8085);
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

// ---------------------------------------------------------------------------
// Staff authentication (Firebase Authentication, email + password)
// ---------------------------------------------------------------------------

let cachedAuth: Auth | null = null;

export const getFirebaseAuthInstance = (): Auth | null => {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!cachedAuth) {
    try {
      cachedAuth = getAuth(app);
      if (useEmulator) connectAuthEmulator(cachedAuth, 'http://127.0.0.1:9099', { disableWarnings: true });
    } catch (e) {
      console.error('Error getting auth:', e);
    }
  }
  return cachedAuth;
};

export const signInWithFirebase = (email: string, password: string): Promise<UserCredential> => {
  const auth = getFirebaseAuthInstance();
  if (!auth) return Promise.reject(new Error('Firebase is not configured.'));
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutFirebase = async (): Promise<void> => {
  const auth = getFirebaseAuthInstance();
  if (auth) await signOut(auth);
};

export const onFirebaseAuthChanged = (callback: (user: User | null) => void): (() => void) => {
  const auth = getFirebaseAuthInstance();
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
};

export interface StaffProfileDoc {
  name?: string;
  role?: string;
  department?: string;
}

/**
 * A signed-in user counts as staff only if an administrator created a
 * document at staff/{uid} in Firestore. Returns null when there is none.
 */
export const fetchStaffProfile = async (uid: string): Promise<StaffProfileDoc | null> => {
  const db = getFirebaseFirestoreInstance();
  if (!db) return null;
  const snap = await getDoc(doc(db, 'staff', uid));
  return snap.exists() ? (snap.data() as StaffProfileDoc) : null;
};

// ---------------------------------------------------------------------------
// Shared events (Firestore collection "events")
// ---------------------------------------------------------------------------

const EVENTS_COLLECTION = 'events';

// Firestore rejects `undefined` values, so strip them before writing.
const cleanForFirestore = (event: EventItem): Record<string, unknown> =>
  JSON.parse(JSON.stringify(event));

export const subscribeToEventsCollection = (
  onData: (events: EventItem[]) => void,
  onError: (err: Error) => void
): (() => void) => {
  const db = getFirebaseFirestoreInstance();
  if (!db) return () => {};
  return onSnapshot(
    collection(db, EVENTS_COLLECTION),
    (snap) => onData(snap.docs.map((d) => ({ ...(d.data() as EventItem), id: d.id }))),
    (err) => onError(err)
  );
};

export const saveEventDoc = async (event: EventItem): Promise<void> => {
  const db = getFirebaseFirestoreInstance();
  if (!db) throw new Error('Firebase is not configured.');
  await setDoc(doc(db, EVENTS_COLLECTION, event.id), cleanForFirestore(event));
};

export const deleteEventDoc = async (id: string): Promise<void> => {
  const db = getFirebaseFirestoreInstance();
  if (!db) throw new Error('Firebase is not configured.');
  await deleteDoc(doc(db, EVENTS_COLLECTION, id));
};

/** Copies the starter events into Firestore the first time a staff member signs in. */
export const seedEventsIfEmpty = async (events: EventItem[]): Promise<boolean> => {
  const db = getFirebaseFirestoreInstance();
  if (!db) return false;
  const existing = await getDocs(query(collection(db, EVENTS_COLLECTION), limit(1)));
  if (!existing.empty) return false;
  const batch = writeBatch(db);
  events.forEach((e) => batch.set(doc(db, EVENTS_COLLECTION, e.id), cleanForFirestore(e)));
  await batch.commit();
  return true;
};

/** Deletes every event document and writes the given list in its place. */
export const replaceAllEventDocs = async (events: EventItem[]): Promise<void> => {
  const db = getFirebaseFirestoreInstance();
  if (!db) throw new Error('Firebase is not configured.');
  const existing = await getDocs(collection(db, EVENTS_COLLECTION));
  const batch = writeBatch(db);
  existing.docs.forEach((d) => batch.delete(d.ref));
  events.forEach((e) => batch.set(doc(db, EVENTS_COLLECTION, e.id), cleanForFirestore(e)));
  await batch.commit();
};
