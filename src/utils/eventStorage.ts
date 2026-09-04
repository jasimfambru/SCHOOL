import { EventItem } from '../types';
import { EVENTS } from '../data/schoolData';

const STORAGE_KEY = 'nagarjuna_school_events';
const AUTH_KEY = 'nagarjuna_staff_auth';

export interface StaffUser {
  id: string;
  name: string;
  department: string;
  role: string;
  avatar: string;
  token: string;
}

export const STAFF_CREDENTIALS = {
  email: 'staff@nagarjuna.school',
  altEmail: 'satff@nagarjuna.school',
  password: 'staff@2026',
};

export const PRIMARY_STAFF_ACCOUNT: StaffUser = {
  id: 'staff@nagarjuna.school',
  name: 'Faculty Coordinator',
  department: 'Academic & Events Committee',
  role: 'Staff Coordinator & Editor',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  token: 'token-staff-2026',
};

export const DEMO_STAFF_ACCOUNTS: StaffUser[] = [PRIMARY_STAFF_ACCOUNT];

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

// Load all events from local storage or fallback to initial defaults
export const getStoredEvents = (): EventItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(EVENTS));
      return EVENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return EVENTS;
  } catch (err) {
    console.error('Error reading events from localStorage:', err);
    return EVENTS;
  }
};

// Save events array to localStorage
export const saveStoredEvents = (events: EventItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (err) {
    console.error('Error saving events to localStorage:', err);
  }
};

// Add a new event
export const addStoredEvent = (event: Omit<EventItem, 'id'>): EventItem => {
  const currentEvents = getStoredEvents();
  const newEvent: EventItem = {
    ...event,
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    publishedAt: new Date().toISOString(),
    isPublished: true,
  };
  const updated = [newEvent, ...currentEvents];
  saveStoredEvents(updated);
  return newEvent;
};

// Update an existing event
export const updateStoredEvent = (id: string, updates: Partial<EventItem>): EventItem | null => {
  const currentEvents = getStoredEvents();
  const index = currentEvents.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updatedItem: EventItem = {
    ...currentEvents[index],
    ...updates,
  };
  currentEvents[index] = updatedItem;
  saveStoredEvents(currentEvents);
  return updatedItem;
};

// Delete an event
export const deleteStoredEvent = (id: string): boolean => {
  const currentEvents = getStoredEvents();
  const filtered = currentEvents.filter((e) => e.id !== id);
  if (filtered.length === currentEvents.length) return false;
  saveStoredEvents(filtered);
  return true;
};

// Reset events to default
export const resetStoredEvents = (): EventItem[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(EVENTS));
  return EVENTS;
};

// Staff authentication helpers
export const getActiveStaffUser = (): StaffUser | null => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setStaffUserSession = (user: StaffUser | null): void => {
  try {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
    window.dispatchEvent(new CustomEvent('nagarjuna_staff_auth_changed', { detail: user }));
  } catch (err) {
    console.error('Error saving staff auth:', err);
  }
};

export const validateStaffCredentials = (
  emailInput: string,
  passInput: string
): { success: boolean; user?: StaffUser; error?: string } => {
  const email = emailInput.trim().toLowerCase();
  const pass = passInput.trim();

  if (!email) {
    return { success: false, error: 'Please enter the staff email (satff@nagarjuna.school).' };
  }
  if (!pass) {
    return { success: false, error: 'Please enter the staff password (staff@2026).' };
  }

  const isEmailMatch =
    email === STAFF_CREDENTIALS.email.toLowerCase() ||
    email === STAFF_CREDENTIALS.altEmail.toLowerCase();
  const isPasswordMatch = pass === STAFF_CREDENTIALS.password;

  if (!isEmailMatch || !isPasswordMatch) {
    return {
      success: false,
      error: 'Invalid credentials! Please use satff@nagarjuna.school and password staff@2026.',
    };
  }

  return { success: true, user: PRIMARY_STAFF_ACCOUNT };
};

