
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Recommendations from "@/components/recommendations";
import { useAppContext } from "@/context/app-context";
import type { Product } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductReviews from "./product-reviews";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart, addToViewed, buyNow } = useAppContext();

  useEffect(() => {
    addToViewed(product.id);
  }, [product.id, addToViewed]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square relative bg-card rounded-lg overflow-hidden border">
           <Carousel className="w-full h-full">
            <CarouselContent>
              {product.images.map((imgSrc, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-full aspect-square">
                    <Image
                      src={imgSrc}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint={product.aiHint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {product.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>
        </div>
        <div className="flex flex-col h-full">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <Separator className="my-4" />
          <p className="text-3xl font-bold text-foreground">₹{product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
            <Button size="lg" variant="outline" className="w-full" onClick={() => addToCart(product.id)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" className="w-full" onClick={() => buyNow(product.id)}>
              <Bolt className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <ProductReviews reviews={product.reviews || []} />
      <Recommendations currentProductId={product.id} />
    </div>
  );
}
