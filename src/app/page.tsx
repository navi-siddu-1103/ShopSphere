
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { products, categories } from "@/lib/data";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Mic, MicOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import RecentlyViewed from "@/components/recently-viewed";
import Link from "next/link";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("rating-desc");
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for browser support for SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsListening(false);
        toast({
          title: "Search updated",
          description: `Searching for: "${transcript}"`,
        });
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error("Speech recognition error", event.error);
          toast({
            title: "Voice search error",
            description: "Sorry, I couldn't understand that. Please try again.",
            variant: "destructive",
          });
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  const handleToggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
       toast({
          title: "Feature not supported",
          description: "Your browser does not support voice search.",
          variant: "destructive",
        });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Please speak into your microphone.",
      });
    }
  };


  const filteredAndSortedProducts = useMemo(() => {
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
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative overflow-hidden text-center py-16 md:py-24 rounded-lg bg-card border shadow-sm">
        <div
            className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div className="relative">
             <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Find Your Next Favorite Thing
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
                Explore a curated selection of high-quality products, from the latest tech to timeless apparel.
            </p>
             <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                    <Link href="#products-section">
                        Start Shopping
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    </section>

      <RecentlyViewed />

      <div id="products-section" className="mb-8 mt-16 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products..."
            className="pl-10 pr-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={handleToggleListening}
                  >
                    {isListening ? (
                       <Mic className="h-5 w-5 text-primary" />
                    ) : (
                       <Mic className="h-5 w-5" />
                    )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search with your voice</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
    </div>
  );
}
