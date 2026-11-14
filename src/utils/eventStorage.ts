import { EventItem } from '../types';
import { EVENTS } from '../data/schoolData';
import {
  isFirebaseConfigured,
  signInWithFirebase,
  signOutFirebase,
  onFirebaseAuthChanged,
  fetchStaffProfile,
  subscribeToEventsCollection,
  saveEventDoc,
  deleteEventDoc,
  seedEventsIfEmpty,
  replaceAllEventDocs,
} from './firebase';

const STORAGE_KEY = 'nagarjuna_school_events_v2';
const SHARED_CACHE_KEY = 'nagarjuna_shared_events_cache_v1';

export interface StaffUser {
  id: string;
  name: string;
  department: string;
  role: string;
  avatar: string;
  token: string;
}

export const PRESET_EVENT_IMAGES = [
  {
    label: 'Independence Day & National Celebrations',
    url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1000&auto=format&fit=crop',
    category: 'Celebration',
  },
  {
    label: 'Robotics, Coding & Drone Innovation',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    category: 'Robotics & AI',
  },
  {
    label: 'Sports Day, Relay & Track Races',
    url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop',
    category: 'Sports',
  },
  {
    label: 'Science Project & Working Models',
    url: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1000&auto=format&fit=crop',
    category: 'Exhibition',
  },
  {
    label: 'Cultural Music, Choir & Symphony',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    category: 'Cultural',
  },
  {
    label: 'Stage Drama & Theatrical Play',
    url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1000&auto=format&fit=crop',
    category: 'Cultural',
  },
  {
    label: 'Prize Distribution & Convocation',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop',
    category: 'Annual Day',
  },
  {
    label: 'Inter-School Football Championship',
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    category: 'Sports',
  },
  {
    label: 'Art, Painting & Pottery Showcase',
    url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop',
    category: 'Exhibition',
  },
];

// ---------------------------------------------------------------------------
// Events
//
// When Firebase is configured, events live in the Firestore "events"
// collection and every visitor sees the same list. Only signed-in staff can
// change it (enforced by firestore.rules, not just by this UI). Until the
// first snapshot arrives we show the last cached copy, or the starter events.
//
// Without Firebase the site falls back to this browser's localStorage.
// ---------------------------------------------------------------------------

const EVENTS_CHANGED = 'nagarjuna_events_changed';
const EVENTS_SYNC_ERROR = 'nagarjuna_events_sync_error';

let sharedEvents: EventItem[] | null = (() => {
  try {
    const raw = localStorage.getItem(SHARED_CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
})();

const sortNewestFirst = (list: EventItem[]): EventItem[] =>
  [...list].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));

const setSharedEvents = (list: EventItem[]): void => {
  sharedEvents = list;
  try {
    localStorage.setItem(SHARED_CACHE_KEY, JSON.stringify(list));
  } catch {
    // Cache is only a convenience; ignore quota errors.
  }
  window.dispatchEvent(new CustomEvent(EVENTS_CHANGED));
};

const reportSyncError = (err: unknown): void => {
  const message = err instanceof Error ? err.message : String(err);
  console.error('Shared events error:', err);
  window.dispatchEvent(new CustomEvent(EVENTS_SYNC_ERROR, { detail: message }));
};

// Runs a Firestore write in the background; failures are reported to the UI.
const persist = (work: Promise<unknown>): void => {
  work.catch(reportSyncError);
};

export const onEventsChanged = (handler: () => void): (() => void) => {
  window.addEventListener(EVENTS_CHANGED, handler);
  return () => window.removeEventListener(EVENTS_CHANGED, handler);
};

export const onEventsSyncError = (handler: (message: string) => void): (() => void) => {
  const listener = (e: Event) => handler(String((e as CustomEvent<string>).detail));
  window.addEventListener(EVENTS_SYNC_ERROR, listener);
  return () => window.removeEventListener(EVENTS_SYNC_ERROR, listener);
};

let syncStarted = false;

/** Starts the live link to Firebase (events + staff sign-in). Safe to call more than once. */
export const startFirebaseSync = (): void => {
  if (syncStarted || !isFirebaseConfigured()) return;
  syncStarted = true;

  subscribeToEventsCollection(
    (events) => {
      // An empty collection means "not seeded yet": keep showing the starter events.
      if (events.length > 0) setSharedEvents(sortNewestFirst(events));
    },
    reportSyncError
  );

  onFirebaseAuthChanged(async (user) => {
    if (!user) {
      setActiveStaff(null);
      return;
    }
    try {
      const profile = await fetchStaffProfile(user.uid);
      if (!profile) {
        // Signed in, but not on the staff list: treat as a visitor.
        await signOutFirebase();
        setActiveStaff(null);
        return;
      }
      setActiveStaff(buildStaffUser(user.uid, user.email, profile));
      await seedEventsIfEmpty(EVENTS);
    } catch (err) {
      reportSyncError(err);
    }
  });
};

const readLocalEvents = (): EventItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(EVENTS));
      return EVENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : EVENTS;
  } catch (err) {
    console.error('Error reading events from localStorage:', err);
    return EVENTS;
  }
};

export const getStoredEvents = (): EventItem[] => {
  if (isFirebaseConfigured()) {
    startFirebaseSync();
    return sharedEvents && sharedEvents.length > 0 ? sharedEvents : EVENTS;
  }
  return readLocalEvents();
};

export const saveStoredEvents = (events: EventItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (err) {
    console.error('Error saving events to localStorage:', err);
  }
};

export const addStoredEvent = (event: Omit<EventItem, 'id'>): EventItem => {
  const newEvent: EventItem = {
    ...event,
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    publishedAt: new Date().toISOString(),
    isPublished: true,
  };
  if (isFirebaseConfigured()) {
    setSharedEvents(sortNewestFirst([newEvent, ...getStoredEvents()]));
    persist(saveEventDoc(newEvent));
  } else {
    saveStoredEvents([newEvent, ...getStoredEvents()]);
  }
  return newEvent;
};

export const updateStoredEvent = (id: string, updates: Partial<EventItem>): EventItem | null => {
  const current = getStoredEvents();
  const index = current.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updated: EventItem = { ...current[index], ...updates, id };
  const next = [...current];
  next[index] = updated;

  if (isFirebaseConfigured()) {
    setSharedEvents(sortNewestFirst(next));
    persist(saveEventDoc(updated));
  } else {
    saveStoredEvents(next);
  }
  return updated;
};

export const deleteStoredEvent = (id: string): boolean => {
  const current = getStoredEvents();
  const filtered = current.filter((e) => e.id !== id);
  if (filtered.length === current.length) return false;

  if (isFirebaseConfigured()) {
    setSharedEvents(filtered);
    persist(deleteEventDoc(id));
  } else {
    saveStoredEvents(filtered);
  }
  return true;
};

export const resetStoredEvents = async (): Promise<EventItem[]> => {
  if (isFirebaseConfigured()) {
    await replaceAllEventDocs(EVENTS);
    setSharedEvents(sortNewestFirst(EVENTS));
  } else {
    saveStoredEvents(EVENTS);
  }
  return EVENTS;
};

// ---------------------------------------------------------------------------
// Staff authentication (Firebase Authentication + staff/{uid} allow-list)
//
// There are no passwords in this code. Staff accounts are created by an
// administrator in the Firebase console; see STAFF_SETUP.md.
// ---------------------------------------------------------------------------

const AUTH_CHANGED = 'nagarjuna_staff_auth_changed';

let activeStaff: StaffUser | null = null;

const initialAvatar = (name: string): string => {
  const letter = (name.trim()[0] || 'S').toUpperCase().replace(/[<>&"']/g, 'S');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#2563eb"/>` +
    `<text x="48" y="62" font-size="44" font-family="Arial" font-weight="bold" fill="white" text-anchor="middle">${letter}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const buildStaffUser = (
  uid: string,
  email: string | null,
  profile: { name?: string; role?: string; department?: string }
): StaffUser => {
  const name = profile.name || email || 'Staff';
  return {
    id: uid,
    name,
    department: profile.department || 'School Staff',
    role: profile.role || 'Staff',
    avatar: initialAvatar(name),
    token: '',
  };
};

const setActiveStaff = (user: StaffUser | null): void => {
  activeStaff = user;
  window.dispatchEvent(new CustomEvent(AUTH_CHANGED, { detail: user }));
};

export const getActiveStaffUser = (): StaffUser | null => {
  if (isFirebaseConfigured()) startFirebaseSync();
  return activeStaff;
};

/** Pass null to sign out. Signing in goes through signInStaff(). */
export const setStaffUserSession = (user: StaffUser | null): void => {
  if (user === null) {
    setActiveStaff(null);
    signOutFirebase().catch(reportSyncError);
  }
};

export const signInStaff = async (
  emailInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: StaffUser; error?: string }> => {
  const email = emailInput.trim();
  if (!email || !passwordInput) {
    return { success: false, error: 'Please enter your staff email and password.' };
  }
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: 'Staff sign-in is not set up yet. The school administrator needs to connect Firebase first.',
    };
  }
  startFirebaseSync();

  try {
    const cred = await signInWithFirebase(email, passwordInput);
    const profile = await fetchStaffProfile(cred.user.uid);
    if (!profile) {
      await signOutFirebase();
      return {
        success: false,
        error: 'This account is not on the school staff list. Ask the administrator to add it.',
      };
    }
    const user = buildStaffUser(cred.user.uid, cred.user.email, profile);
    setActiveStaff(user);
    return { success: true, user };
  } catch (err) {
    const code = (err as { code?: string })?.code || '';
    if (
      code === 'auth/invalid-credential' ||
      code === 'auth/wrong-password' ||
      code === 'auth/user-not-found' ||
      code === 'auth/invalid-email'
    ) {
      return { success: false, error: 'Incorrect email or password.' };
    }
    if (code === 'auth/too-many-requests') {
      return { success: false, error: 'Too many attempts. Please wait a few minutes and try again.' };
    }
    if (code === 'auth/network-request-failed') {
      return { success: false, error: 'Network problem. Check your connection and try again.' };
    }
    console.error('Staff sign-in error:', err);
    return { success: false, error: 'Could not sign in. Please try again.' };
  }
};
