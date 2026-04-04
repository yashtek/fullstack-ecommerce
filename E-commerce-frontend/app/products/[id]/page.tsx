"use client"
// import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getProductbyId } from "@/lib/products";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductDetail = () => {
    const{id} = useParams();
    const [quantity,setQuantity] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey:["product",id],
        queryFn:()=>getProductbyId(id as string),
        enabled:!!id,
    });
      if (isLoading) return <p><Spinner/></p>;
  if (error) return <p>Error loading product</p>;
  const product = data?.data;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-secondary aspect-[3/4]">
          <img src={product.mainImage.url} alt={product.productName} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{product.category}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">{product.productName}</h1>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-foreground">${product.price}</span>
          
          </div>

          <p className="text-muted-foreground mt-6 leading-relaxed">{product.about}</p>

          {product.details && product.details.length > 0 && (
            <ul className="mt-6 space-y-2">
              {product.details.map((d, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary" /> {d}
                </li>
              ))}
            </ul>
          )}

          {/* Quantity */}
          <div className="mt-8">
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1,quantity-1))}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            {/* <Button
              className="flex-1 h-12 rounded-full font-semibold"
              
            >
              <ShoppingBag size={16} className="mr-2" /> Add to Bag
            </Button> */}
            <Link href={`/checkout?productId=${id}&qty=${quantity}`} className="flex-1">
              <Button
                
                className="w-full h-12 rounded-full font-semibold hover:cursor-pointer transition-all duration-200 hover:scale-102 shadow-lg ease-in-out"
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {/* {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )} */}
    </div>
  );
};

export default ProductDetail;