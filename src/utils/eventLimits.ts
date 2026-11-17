// Limits for events posted by staff. The photo size limit matches storage.rules
// (10 MB); the text limits are tighter than firestore.rules (200 / 20000).
export const EVENT_LIMITS = {
  title: { min: 3, max: 120 },
  description: { min: 20, max: 5000 },
  location: { max: 120 },
  photos: {
    minCount: 1, // every event needs at least a cover photo
    maxGallery: 20, // photos in one album
    minBytes: 10 * 1024, // 10 KB: anything smaller is an icon or a broken file
    maxBytes: 10 * 1024 * 1024, // 10 MB per photo
    types: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const;

const formatSize = (bytes: number): string =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

/** Returns an explanation if the photo can't be used, or null if it is fine. */
export const checkPhoto = (file: { name: string; size: number; type: string }): string | null => {
  const { types, minBytes, maxBytes } = EVENT_LIMITS.photos;
  if (!(types as readonly string[]).includes(file.type)) {
    return `"${file.name}" is not a JPG, PNG or WebP photo.`;
  }
  if (file.size > maxBytes) {
    return `"${file.name}" is ${formatSize(file.size)}; the maximum is ${formatSize(maxBytes)} per photo.`;
  }
  if (file.size < minBytes) {
    return `"${file.name}" is only ${formatSize(file.size)}; the minimum is ${formatSize(minBytes)}.`;
  }
  return null;
};

/** Pulls the 11-character video id out of any normal YouTube link. */
export const parseYouTubeId = (input: string): string | null => {
  const text = input.trim();
  if (!text) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, '').toLowerCase();
  let id: string | null = null;
  if (host === 'youtu.be') {
    id = url.pathname.split('/')[1] || null;
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') {
      id = url.searchParams.get('v');
    } else {
      const m = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
      id = m ? m[1] : null;
    }
  }
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
};

export const youTubeWatchUrl = (id: string): string => `https://www.youtube.com/watch?v=${id}`;
export const youTubeEmbedUrl = (id: string): string => `https://www.youtube-nocookie.com/embed/${id}`;
