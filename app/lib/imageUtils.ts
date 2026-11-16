/**
 * Normalizes image URLs, automatically converting Google Drive share links
 * into direct embeddable high-resolution image CDN URLs.
 */
export function normalizeImageUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // Match Google Drive /file/d/<FILE_ID>/...
  const fileDMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch?.[1]) {
    return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}=w1600`;
  }

  // Match Google Drive ?id=<FILE_ID> (open?id=... or uc?id=... or thumbnail?id=...)
  if (trimmed.includes("drive.google.com")) {
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch?.[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1600`;
    }
  }

  return trimmed;
}

