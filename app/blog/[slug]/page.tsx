import { defaultBlogs } from "../../lib/defaultData";
import { getBlogs } from "../../lib/firestoreService";
import BlogDetailClient from "./BlogDetailClient";

export async function generateStaticParams() {
  try {
    const live = await getBlogs();
    const all = [...defaultBlogs, ...(live || [])];
    const uniqueSlugs = Array.from(new Set(all.map((b) => b.id)));
    return uniqueSlugs.map((slug) => ({ slug }));
  } catch {
    return defaultBlogs.map((b) => ({ slug: b.id }));
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
