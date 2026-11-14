export const SIMULATOR_STORAGE_KEY = 'nagarjuna_campus_simulator_images_v1';

export interface SimulatorHotspotConfig {
  id: string;
  label: string;
  badge: string;
  title: string;
  desc: string;
  defaultImage: string;
  presets: string[];
}

export const DEFAULT_HOTSPOTS_CONFIG: SimulatorHotspotConfig[] = [
  {
    id: 'robotics',
    label: 'Robotics & AI Lab',
    badge: 'STEM & AI',
    title: 'Advanced Robotics & AI Center',
    desc: 'Arduino, LEGO Mindstorms, 3D printing, Python programming, and autonomous drone kits.',
    defaultImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
    presets: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    id: 'building',
    label: 'Main Campus',
    badge: 'Eco-Friendly',
    title: 'Nagarjuna Green Campus',
    desc: '15-acre sprawling Wi-Fi campus with solar architecture and climate-controlled academic facilities in Kandukur.',
    defaultImage: '/photos/campus/school-building-welcome-back.webp',
    presets: [
      '/photos/campus/school-building-welcome-back.webp',
      'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    id: 'smart_classroom',
    label: 'Smart Classrooms',
    badge: '4K Interactive',
    title: 'Digital Smart Classrooms',
    desc: 'Interactive 4K flat panels, ergonomic digital stations, and immersive visual curriculum modules.',
    defaultImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    presets: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    id: 'computer',
    label: 'Computer Center',
    badge: 'High-Tech',
    title: 'Digital Computer Labs',
    desc: 'High-speed gigabit workstations, cloud coding environments, and cyber safety training.',
    defaultImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    presets: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    id: 'playground',
    label: 'Sports Arena',
    badge: 'Olympic Turf',
    title: 'Multi-Sport Complex',
    desc: 'Football synthetic pitch, floodlit basketball courts, cricket nets, and running track.',
    defaultImage: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200&auto=format&fit=crop',
    presets: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    id: 'auditorium',
    label: 'Grand Auditorium',
    badge: 'Acoustic Hall',
    title: '1,200-Seat Grand Auditorium',
    desc: 'Acoustically engineered amphitheater for student theatre, annual day galas, and guest lectures.',
    defaultImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    presets: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    id: 'events',
    label: 'Campus Celebrations',
    badge: 'Live Events',
    title: 'Annual Day & Cultural Celebrations',
    desc: 'National festivities, Independence Day parade, sports meet, and vibrant cultural showcases.',
    defaultImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    presets: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1200&auto=format&fit=crop',
    ],
  },
];

export function getCustomSimulatorImages(): Record<string, string> {
  try {
    const raw = localStorage.getItem(SIMULATOR_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveCustomSimulatorImage(id: string, imageUrl: string): Record<string, string> {
  const current = getCustomSimulatorImages();
  const updated = { ...current, [id]: imageUrl };
  try {
    localStorage.setItem(SIMULATOR_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('simulator_images_updated', { detail: updated }));
  } catch (err) {
    console.error('Failed to save simulator image to localStorage', err);
  }
  return updated;
}

export function resetCustomSimulatorImage(id: string): Record<string, string> {
  const current = getCustomSimulatorImages();
  delete current[id];
  try {
    localStorage.setItem(SIMULATOR_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('simulator_images_updated', { detail: current }));
  } catch (err) {
    console.error('Failed to reset simulator image', err);
  }
  return current;
}

export function resetAllSimulatorImages(): void {
  try {
    localStorage.removeItem(SIMULATOR_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('simulator_images_updated', { detail: {} }));
  } catch (err) {
    console.error('Failed to reset all simulator images', err);
  }
}
