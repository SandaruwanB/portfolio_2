import { defaultBlogs } from "../../lib/defaultData";
import BlogDetailClient from "./BlogDetailClient";

export function generateStaticParams() {
  return defaultBlogs.map((b) => ({
    slug: b.id,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
