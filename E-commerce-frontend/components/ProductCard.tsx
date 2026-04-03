import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
// import { useCart } from "@/contexts/CartContext";


const ProductCard = ({ product }: { product: Product }) => {
//   const { addToCart } = useCart();

  return (
    <div className="group animate-fade-in-up">
     <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-secondary aspect-[3/4]">
          <img
            src={product.mainImage.url}
            alt={product.productName}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.price && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {product.productName}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-foreground">${Number(product.price)}</span>
          
          </div>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="shrink-0 mt-1 h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
          onClick={(e) => {
            e.preventDefault();
            // addToCart(product);
          }}
        >
          <ShoppingBag size={14} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
