"use client"

import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"
import { Spinner } from "@/components/ui/spinner"

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products", { page: 1, limit: 100 }],
    queryFn: () => getProducts(1, 100),
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-2xl font-bold">All Products</h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {isLoading && (
          <p>
            <Spinner />
          </p>
        )}
        {data?.data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
