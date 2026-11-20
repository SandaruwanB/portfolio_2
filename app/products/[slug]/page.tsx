import { defaultProducts } from "../../lib/defaultData";
import { getProducts } from "../../lib/firestoreService";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  try {
    const live = await getProducts();
    const all = [...defaultProducts, ...(live || [])];
    const uniqueSlugs = Array.from(new Set(all.map((p) => p.id)));
    return uniqueSlugs.map((slug) => ({ slug }));
  } catch {
    return defaultProducts.map((p) => ({ slug: p.id }));
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
