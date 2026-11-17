import { defaultProducts } from "../../lib/defaultData";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return defaultProducts.map((p) => ({
    slug: p.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
