
"use client";

import { useMemo, useState, useEffect } from "react";
import { useAppContext } from "@/context/app-context";
import { products } from "@/lib/data";
import ProductCard from "./product-card";
import { Separator } from "./ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function RecentlyViewed() {
  const { viewedProducts } = useAppContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const recentlyViewedProducts = useMemo(() => {
    return products
      .filter((p) => viewedProducts.includes(p.id))
      .sort((a, b) => viewedProducts.indexOf(a.id) - viewedProducts.indexOf(b.id));
  }, [viewedProducts]);

  if (!isMounted || recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold tracking-tight">Recently Viewed</h2>
      <Separator className="my-4" />
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {recentlyViewedProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4 pl-4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
