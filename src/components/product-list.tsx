
"use client";

import { useMemo, useState, useEffect } from "react";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/product-card";

interface ProductListProps {
    searchTerm: string;
    selectedCategory: string;
    sortOrder: string;
}

export default function ProductList({ searchTerm, selectedCategory, sortOrder }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Dynamically import the large products data file
    import('@/lib/data').then(module => {
      setProducts(module.products);
    }).catch(error => console.error("Failed to load products", error));
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    if (products.length === 0) {
      return [];
    }
    
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return b.rating - a.rating;
      }
    });
  }, [searchTerm, selectedCategory, sortOrder, products]);

  if (products.length === 0) {
    // This can act as a loading state until the dynamic import is complete
    return null; 
  }

  return (
    <>
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No products found.</p>
        </div>
      )}
    </>
  );
}
