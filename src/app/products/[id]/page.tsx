import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./_components/product-details-client";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: `${product.name} | ShopSphere`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}
