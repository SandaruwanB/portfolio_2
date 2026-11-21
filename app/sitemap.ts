import { MetadataRoute } from "next";
import { getAllProductsForBuild } from "./lib/products-build";
import { defaultBlogs } from "./lib/defaultData";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sandaruwanbandara.dev";
  const now = new Date();

  // Static top-level pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/architecture`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/stack`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/focus`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic products from build-time fetcher (combines seed + live Firestore)
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProductsForBuild();
    productEntries = products.map((p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : p.createdAt ? new Date(p.createdAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // If fetching fails, productEntries remains empty
  }

  // Articles & Blog posts
  const blogEntries: MetadataRoute.Sitemap = defaultBlogs.map((b) => ({
    url: `${baseUrl}/blog/${b.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productEntries, ...blogEntries];
}
