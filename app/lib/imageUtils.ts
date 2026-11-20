/**
 * Utility functions for handling and normalizing external/internal image URLs,
 * specifically Google Drive links, Firebase Storage, and local public images.
 */

/**
 * Extracts the Google Drive file ID from various sharing, preview, and embed link formats:
 * - https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
 * - https://drive.google.com/file/d/<FILE_ID>/view
 * - https://drive.google.com/file/d/<FILE_ID>
 * - https://drive.google.com/open?id=<FILE_ID>
 * - https://drive.google.com/uc?id=<FILE_ID>
 * - https://drive.google.com/uc?export=view&id=<FILE_ID>
 * - https://drive.google.com/thumbnail?id=<FILE_ID>
 * - https://lh3.googleusercontent.com/d/<FILE_ID>
 */
export function extractGoogleDriveId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Check /file/d/<ID>
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch?.[1]) return fileDMatch[1];

  // Check /d/<ID> (e.g. lh3.googleusercontent.com/d/<ID>)
  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch?.[1]) return dMatch[1];

  // Check ?id=<ID> or &id=<ID>
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch?.[1]) return idMatch[1];

  return null;
}

/**
 * Generates an alternative fallback URL for Google Drive images
 * using Google's high-resolution thumbnail endpoint.
 */
export function getGoogleDriveFallbackUrl(url?: string): string | null {
  const fileId = extractGoogleDriveId(url);
  if (!fileId) return null;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}

/**
 * Normalizes image URLs, automatically converting Google Drive share links
 * into direct embeddable high-resolution CDN URLs.
 */
export function normalizeImageUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // If already an lh3 or direct Google User Content URL without extra params
  const fileId = extractGoogleDriveId(trimmed);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

/**
 * Reusable image onError handler to gracefully fall back from lh3.googleusercontent.com
 * to drive.google.com/thumbnail if the CDN endpoint is blocked or slow.
 */
export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  const driveId = extractGoogleDriveId(target.src);
  if (driveId && !target.src.includes("drive.google.com/thumbnail")) {
    target.src = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1600`;
  }
}
