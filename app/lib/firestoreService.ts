import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  Unsubscribe
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { Product, BlogPost } from "./types";
import { defaultProducts, defaultBlogs } from "./defaultData";

const PRODUCTS_COLLECTION = "products";
const BLOGS_COLLECTION = "blogs";

function sortProducts(list: Product[]): Product[] {
  return [...list].sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : 9999;
    const orderB = typeof b.order === "number" ? b.order : 9999;
    if (orderA !== orderB) return orderA - orderB;
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
}

function sortBlogs(list: BlogPost[]): BlogPost[] {
  return [...list].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

// ---------------------- PRODUCTS ----------------------

export async function getProducts(): Promise<Product[]> {
  if (!db) return defaultProducts;
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (snapshot.empty) {
      return defaultProducts;
    }
    const products: Product[] = [];
    snapshot.forEach((d) => {
      products.push({ id: d.id, ...d.data() } as Product);
    });
    return sortProducts(products);
  } catch (error) {
    console.warn("Failed to fetch products from Firestore, using fallback defaults:", error);
    return defaultProducts;
  }
}

export function subscribeToProducts(
  onData: (products: Product[], isLive: boolean) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    onData(defaultProducts, false);
    return () => {};
  }

  return onSnapshot(
    collection(db, PRODUCTS_COLLECTION),
    (snapshot) => {
      if (snapshot.empty) {
        onData(defaultProducts, false);
        return;
      }
      const products: Product[] = [];
      snapshot.forEach((d) => {
        products.push({ id: d.id, ...d.data() } as Product);
      });
      onData(sortProducts(products), true);
    },
    (error) => {
      console.warn("Firestore products subscription error:", error);
      onData(defaultProducts, false);
      if (onError) onError(error);
    }
  );
}

export async function saveProduct(product: Partial<Product>, customId?: string): Promise<string> {
  if (!db) throw new Error("Firebase Firestore is not configured yet. Check environment variables.");
  const id = customId || product.id || `prod_${Date.now()}`;
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const data = {
    ...product,
    id,
    updatedAt: Date.now(),
    createdAt: product.createdAt || Date.now(),
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteProduct(id: string): Promise<void> {
  if (!db) throw new Error("Firebase Firestore is not configured yet.");
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// ---------------------- BLOGS ----------------------

export async function getBlogs(): Promise<BlogPost[]> {
  if (!db) return defaultBlogs;
  try {
    const snapshot = await getDocs(collection(db, BLOGS_COLLECTION));
    if (snapshot.empty) {
      return defaultBlogs;
    }
    const blogs: BlogPost[] = [];
    snapshot.forEach((d) => {
      blogs.push({ id: d.id, ...d.data() } as BlogPost);
    });
    return sortBlogs(blogs);
  } catch (error) {
    console.warn("Failed to fetch blogs from Firestore, using fallback defaults:", error);
    return defaultBlogs;
  }
}

export function subscribeToBlogs(
  onData: (blogs: BlogPost[], isLive: boolean) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    onData(defaultBlogs, false);
    return () => {};
  }

  return onSnapshot(
    collection(db, BLOGS_COLLECTION),
    (snapshot) => {
      if (snapshot.empty) {
        onData(defaultBlogs, false);
        return;
      }
      const blogs: BlogPost[] = [];
      snapshot.forEach((d) => {
        blogs.push({ id: d.id, ...d.data() } as BlogPost);
      });
      onData(sortBlogs(blogs), true);
    },
    (error) => {
      console.warn("Firestore blogs subscription error:", error);
      onData(defaultBlogs, false);
      if (onError) onError(error);
    }
  );
}

export async function saveBlog(blog: Partial<BlogPost>, customId?: string): Promise<string> {
  if (!db) throw new Error("Firebase Firestore is not configured yet.");
  const id = customId || blog.id || `blog_${Date.now()}`;
  const docRef = doc(db, BLOGS_COLLECTION, id);
  const data = {
    ...blog,
    id,
    updatedAt: Date.now(),
    createdAt: blog.createdAt || Date.now(),
  };
  await setDoc(docRef, data, { merge: true });
  return id;
}

export async function deleteBlog(id: string): Promise<void> {
  if (!db) throw new Error("Firebase Firestore is not configured yet.");
  const docRef = doc(db, BLOGS_COLLECTION, id);
  await deleteDoc(docRef);
}

// ---------------------- STORAGE (IMAGES) ----------------------

export async function uploadImage(file: File, folder: "products" | "blogs"): Promise<string> {
  if (!storage) throw new Error("Firebase Storage is not configured yet.");
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `${folder}/${Date.now()}_${sanitizedName}`;
  const storageRef = ref(storage, fileName);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

// ---------------------- SEEDING ----------------------

export async function seedInitialData(): Promise<{ productsCount: number; blogsCount: number }> {
  if (!db) throw new Error("Firebase Firestore is not configured yet.");
  
  for (const p of defaultProducts) {
    await saveProduct(p, p.id);
  }
  for (const b of defaultBlogs) {
    await saveBlog(b, b.id);
  }
  return { productsCount: defaultProducts.length, blogsCount: defaultBlogs.length };
}
