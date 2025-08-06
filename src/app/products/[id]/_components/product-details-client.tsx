"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Recommendations from "@/components/recommendations";
import { useAppContext } from "@/context/app-context";
import type { Product } from "@/lib/data";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart, addToViewed } = useAppContext();

  useEffect(() => {
    addToViewed(product.id);
  }, [product.id, addToViewed]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square relative bg-card rounded-lg overflow-hidden border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.aiHint}
          />
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
          <p className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          <div className="mt-auto pt-6">
            <Button size="lg" className="w-full" onClick={() => addToCart(product.id)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <Recommendations currentProductId={product.id} />
    </div>
  );
}
