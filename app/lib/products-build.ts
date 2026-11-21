import { Product } from "./types";
import { defaultProducts } from "./defaultData";
import { getProducts as getFirestoreProducts } from "./firestoreService";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "developer-sandaruwan";
const FIRESTORE_REST_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/products`;

// Helper to convert Firestore REST API typed values into plain JavaScript values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFirestoreValue(val: any): any {
  if (!val || typeof val !== "object") return val;
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return parseInt(val.integerValue, 10);
  if ("doubleValue" in val) return parseFloat(val.doubleValue);
  if ("booleanValue" in val) return val.booleanValue;
  if ("nullValue" in val) return null;
  if ("arrayValue" in val) {
    return (val.arrayValue.values || []).map(parseFirestoreValue);
  }
  if ("mapValue" in val) {
    const res: Record<string, unknown> = {};
    const fields = val.mapValue.fields || {};
    for (const key of Object.keys(fields)) {
      res[key] = parseFirestoreValue(fields[key]);
    }
    return res;
  }
  return null;
}

// Helper to parse Firestore REST documents
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFirestoreDoc(doc: any): Product | null {
  if (!doc?.name || !doc?.fields) return null;
  const id = doc.name.split("/").pop() || "";
  const data: Record<string, unknown> = { id };
  for (const [key, value] of Object.entries(doc.fields)) {
    data[key] = parseFirestoreValue(value);
  }
  return data as unknown as Product;
}

/**
 * Fetch all published products from Cloud Firestore at build-time.
 * Tries REST API first (lightweight, zero grpc overhead), then falls back to Firebase SDK,
 * and finally merges with defaultProducts deduplicating by slug/id.
 */
export async function getAllProductsForBuild(): Promise<Product[]> {
  const liveMap = new Map<string, Product>();

  // 1. Try REST API with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(FIRESTORE_REST_URL, {
      signal: controller.signal,
      next: { revalidate: 0 },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.documents)) {
        for (const doc of data.documents) {
          const parsed = parseFirestoreDoc(doc);
          if (parsed && parsed.id) {
            liveMap.set(parsed.id, parsed);
          }
        }
      }
    }
  } catch {
    // REST API failed or offline - fall through to SDK
  }

  // 2. If REST didn't populate liveMap, try Firebase SDK
  if (liveMap.size === 0) {
    try {
      const sdkProducts = await getFirestoreProducts();
      if (Array.isArray(sdkProducts)) {
        for (const p of sdkProducts) {
          if (p && p.id) {
            liveMap.set(p.id, p);
          }
        }
      }
    } catch {
      // Offline fallback
    }
  }

  // 3. Merge with defaultProducts, deduplicating by ID/slug.
  // Live Firestore products take precedence over seed items.
  const combined = new Map<string, Product>();

  for (const def of defaultProducts) {
    combined.set(def.id, def);
  }

  for (const [id, liveProduct] of liveMap.entries()) {
    const existing = combined.get(id);
    combined.set(id, {
      ...(existing || {}),
      ...liveProduct,
    });
  }

  return Array.from(combined.values());
}

/**
 * Fetch a single product by slug at build-time.
 */
export async function getProductBySlugForBuild(slug: string): Promise<Product | null> {
  const all = await getAllProductsForBuild();
  return all.find((p) => p.id === slug) || null;
}
