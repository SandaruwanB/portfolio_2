import type { Metadata } from "next";
import { defaultProducts } from "../../lib/defaultData";
import { getAllProductsForBuild, getProductBySlugForBuild } from "../../lib/products-build";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  try {
    const products = await getAllProductsForBuild();
    const uniqueSlugs = Array.from(new Set(products.map((p) => p.id)));
    return uniqueSlugs.map((slug) => ({ slug }));
  } catch {
    return defaultProducts.map((p) => ({ slug: p.id }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugForBuild(slug);

  if (!product) {
    return {
      title: "System Architecture Not Found — Sandaruwan Bandara",
      description: "The requested software architecture blueprint or product specification could not be located.",
    };
  }

  const title = `${product.title} — Systems Architecture & Deep Dive | Sandaruwan Bandara`;
  const description =
    product.summary ||
    `Production architecture blueprint, technical specifications, and case study for ${product.title}.`;
  const canonicalUrl = `https://sandaruwanbandara.dev/products/${slug}`;
  const images = product.imageUrl ? [{ url: product.imageUrl }] : [];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} — Systems Architecture Blueprint`,
      description,
      url: canonicalUrl,
      siteName: "Sandaruwan Bandara — Software Architect & Principal Systems Engineer",
      images,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const initialProduct = await getProductBySlugForBuild(slug);

  const jsonLd = initialProduct
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: initialProduct.title,
        description: initialProduct.summary,
        applicationCategory: initialProduct.category || "BusinessApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          name: "Sandaruwan Bandara",
          url: "https://sandaruwanbandara.dev",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient slug={slug} initialProduct={initialProduct} />
    </>
  );
}
