"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/public/products";
import heroBanner from "@/public/hero-banner.jpg";
import promoBanner from "@/public/promo-banner.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <Image
          src={heroBanner}
          alt="New Season Collection"
          className="w-full h-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg animate-fade-in-up">
              <p className="text-sm uppercase tracking-[0.2em] text-background/80 font-medium mb-3">New Collection</p>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-background leading-tight">
                The Art of Everyday Elegance
              </h1>
              <p className="mt-4 text-background/80 text-base md:text-lg">
                Timeless pieces crafted with intention. Discover our Spring 2026 collection.
              </p>
              <Button size="lg" className="mt-8 h-12 px-8 text-sm font-semibold rounded-full">
                Shop Now <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Curated</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">Featured Products</h2>
          </div>
          <Link href="/" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Browse</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href="/" className="group relative overflow-hidden rounded-lg aspect-[4/5]">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-display text-lg font-semibold text-background">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-xl h-48 md:h-64">
          <Image
            src={promoBanner}
            alt="Seasonal Sale"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-background">Up to 40% Off</h2>
              <p className="text-background/80 mt-2">Limited time seasonal sale</p>
              <Button variant="outline" className="mt-4 border-background text-background hover:bg-background hover:text-foreground rounded-full">
                Shop Sale
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
