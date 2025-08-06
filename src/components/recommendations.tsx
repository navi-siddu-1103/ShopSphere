"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/app-context";
import { getPersonalizedRecommendations as fetchRecommendations } from "@/actions/recommendations";
import { products, type Product } from "@/lib/data";
import ProductCard from "./product-card";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";

interface RecommendationsProps {
  currentProductId: string;
}

export default function Recommendations({
  currentProductId,
}: RecommendationsProps) {
  const { viewedProducts } = useAppContext();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      if (viewedProducts.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const result = await fetchRecommendations({ viewedProductIds: viewedProducts });
        if (result && result.recommendedProductIds) {
          const recommended = products.filter(
            (p) => result.recommendedProductIds.includes(p.id) && p.id !== currentProductId
          );
          setRecommendations(recommended.slice(0, 4)); // Limit to 4 recommendations
          setReason(result.reason);
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecommendations();
  }, [viewedProducts, currentProductId]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">You Might Also Like</h2>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
             <Skeleton className="h-[125px] w-full rounded-xl" />
             <div className="space-y-2">
               <Skeleton className="h-4 w-3/4" />
               <Skeleton className="h-4 w-1/2" />
             </div>
           </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the section if there's nothing to recommend
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight">You Might Also Like</h2>
       <p className="mt-2 text-muted-foreground italic">{reason}</p>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
