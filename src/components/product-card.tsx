
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Bolt } from "lucide-react";
import type { Product } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, buyNow } = useAppContext();

  return (
    <Card className={cn("flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1", className)}>
      <CardHeader className="p-0 border-b">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-video relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.aiHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={`/products/${product.id}`} className="block flex-grow">
          <CardTitle className="text-lg font-semibold leading-snug hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
         <div className="mt-2 flex items-center justify-between">
          <p className="text-2xl font-bold text-foreground">₹{product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-muted-foreground">{product.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full" onClick={() => addToCart(product.id)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button className="w-full" onClick={() => buyNow(product.id)}>
          <Bolt className="mr-2 h-4 w-4" />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
